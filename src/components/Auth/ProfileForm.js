import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, FormGroup, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import validate from 'validate.js';
import ReCAPTCHA from "react-google-recaptcha";
import clsx from 'clsx';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { UserProfile, ResendConfirm } from '../../redux/actions/auth';

// import firebaseConfig from '../../static/firebaseConfig';
// import * as firebaseui from 'firebaseui';
// import firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '30px 20px',
    boxShadow: '1px 1px 8px 4px #5855551e'
  },
  font13: {
    fontSize: 13,
    color: theme.palette.primary.main
  },
  right: {
    textAlign: 'right',
  },
  nonDecoration: {
    textDecoration: 'none'
  },
  center: {
    textAlign: 'center'
  },
  robot: {

  },
  formControl: {
    height: 38,
    flexDirection: "unset",
    width: "100%"
  },
  listItemText: {
    color: 'white',
    text: 'center',
    textDecoration: 'none',
    lineHeight: '1'
  },
}));
const schema = {
  first_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  last_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  country: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  city: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  street: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  // phone: {
  //   presence: { allowEmpty: false, message: 'is required' },
  //   length: {
  //     maximum: 300,
  //   },

  // },
  //   ip_address: {
  //     presence: { allowEmpty: false, message: 'is required' },
  //     length: {
  //       maximum: 300,
  //     },
  //   },
  language: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  postal_code: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
};

const schema1 = {
  hobby: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  mother_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  father_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  nick_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  best_friend: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
}



const Form = (props) => {
  const classes = useStyles();



  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  // useEffect(() => {
  //   if (formState.values.api_enabled) {



  //     schema.nick_name.presence.allowEmpty = false;
  //     schema.mother_name.presence.allowEmpty = false;
  //     schema.father_name.presence.allowEmpty = false;
  //     schema.hobby.presence.allowEmpty = false;
  //     schema.best_friend.presence.allowEmpty = false;
  //   } else {
  //     schema.nick_name.presence.allowEmpty = true;
  //     schema.mother_name.presence.allowEmpty = true;
  //     schema.father_name.presence.allowEmpty = true;
  //     schema.hobby.presence.allowEmpty = true;
  //     schema.best_friend.presence.allowEmpty = true;
  //   }
  // }, [formState.values.api_enabled]);
  const [captcha, setCaptcha] = React.useState(false);
  //   const [verified, setVerified] = React.useState(false);

  //   if (!firebase.apps.length) {
  //     const fbase = firebase.initializeApp(firebaseConfig);
  //   }

  //   const uiConfig = {
  //     signInSuccessUrl: "https://netflix-clone-ankur.herokuapp.com/", //This URL is used to return to that page when we got success response for phone authentication.
  //     signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
  //     tosUrl: "https://netflix-clone-ankur.herokuapp.com/",
  //     signInSuccessWithAuthResult: function(authResult, resultUrl){
  //       setVerified(true);
  //     }
  //   };


  //   useEffect(()=>{
  //     var ui = new firebaseui.auth.AuthUI(firebase.auth());
  //     ui.start("#firebaseui-auth-container", uiConfig);
  //   }, [])

  //   useEffect(()=>{
  //     return () => {
  //       if(this && this.hasOwnProperty('ui'))
  //         this.ui.delete();
  //     }
  //   }, []);

  React.useEffect(() => {
    let newSchema = schema;
    if (formState.values.api_enabled) {
      newSchema = {
        ...schema,
        ...schema1
      }
    }

    var errors = validate(formState.values, newSchema);



    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  React.useEffect(() => {
    if (props.error) {
      setFormState({
        ...formState,
        errors: props.error
      });
    }
  }, [props.error])

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? (event.target.checked ? 1 : 0)
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const onHandleRecaptcha = (value) => {
    console.log('captcha', value);
    setCaptcha(value);
  };



  const handleSubmit = event => {
    event.preventDefault();


    if (formState.isValid) {
      // window.location.replace('/');
      // alert()

      props.onSubmit(formState.values, props.location.state, props.history);
    }

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>First name</Typography>
            <TextField
              placeholder="First name"
              // label="E-mail *"
              variant="outlined"
              size="small"
              name="first_name"
              id="first_name"
              fullWidth
              helperText={hasError('first_name') ? formState.errors.first_name[0] : null}
              error={hasError('first_name')}
              onChange={handleChange}
              type="text"
              value={formState.values.first_name || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Last name</Typography>
            <TextField
              placeholder="Last name"
              // label="Password *"
              variant="outlined"
              size="small"
              name="last_name"
              fullWidth
              helperText={
                hasError('last_name') ? formState.errors.last_name[0] : null
              }
              error={hasError('last_name')}
              onChange={handleChange}
              type="text"
              value={formState.values.last_name || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Country</Typography>
            <FormControl variant="outlined" className={classes.formControl} >
              <Select
                native
                value={formState.values.country}
                onChange={handleChange}
                helperText={
                  hasError('country') ? formState.errors.country[0] : null
                }
                error={hasError('country')}
                name="country"
              // inputProps={{
              //     name: 'age',
              //     id: 'filled-age-native-simple',
              // }}
              >
                <option aria-label="" value="" />
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antartica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo">Congo, the Democratic Republic of the</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                <option value="Croatia">Croatia (Hrvatska)</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="East Timor">East Timor</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="France Metropolitan">France, Metropolitan</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">French Southern Territories</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                <option value="Holy See">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran (Islamic Republic of)</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                <option value="Korea">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao">Lao People's Democratic Republic</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macau">Macau</option>
                <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia">Micronesia, Federated States of</option>
                <option value="Moldova">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">Netherlands Antilles</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint LUCIA">Saint LUCIA</option>
                <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia (Slovak Republic)</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                <option value="Span">Spain</option>
                <option value="SriLanka">Sri Lanka</option>
                <option value="St. Helena">St. Helena</option>
                <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syrian Arab Republic</option>
                <option value="Taiwan">Taiwan, Province of China</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos">Turks and Caicos Islands</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Viet Nam</option>
                <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Serbia">Serbia</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Typography>City</Typography>
            <TextField
              placeholder="City"
              // label="Password *"
              variant="outlined"
              size="small"
              name="city"
              fullWidth
              helperText={
                hasError('city') ? formState.errors.city[0] : null
              }
              error={hasError('city')}
              onChange={handleChange}
              type="text"
              value={formState.values.city || ''}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography>Street</Typography>
            <TextField
              placeholder="Street"
              // label="Password *"
              variant="outlined"
              size="small"
              name="street"
              fullWidth
              helperText={
                hasError('street') ? formState.errors.street[0] : null
              }
              error={hasError('street')}
              onChange={handleChange}
              type="text"
              value={formState.values.street || ''}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography>Postal Code</Typography>
            <TextField
              placeholder="Postal code"
              // label="Password *"
              variant="outlined"
              size="small"
              name="postal_code"
              fullWidth
              helperText={
                hasError('postal_code') ? formState.errors.postal_code[0] : null
              }
              error={hasError('postal_code')}
              onChange={handleChange}
              type="text"
              value={formState.values.postal_code || ''}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography>Birthday</Typography>
            <TextField
              placeholder="Birthday"
              // label="Password *"
              variant="outlined"
              size="small"
              name="birthday"
              fullWidth
              helperText={
                hasError('birthday') ? formState.errors.birthday[0] : null
              }
              error={hasError('birthday')}
              onChange={handleChange}
              type="date"
              value={formState.values.birthday || ''}
            />
          </Grid>

          {/* <Grid item xs={6}>
              <Typography>Phone Number</Typography>
              <TextField
                placeholder="Phone Number"
                // label="Password *"
                variant="outlined"
                size="small"
                name="phone"
                fullWidth
                helperText={
                  hasError('phone') ? formState.errors.phone[0] : null
                }
                error={hasError('phone')}
                onChange={handleChange}
                type="number"
                value={formState.values.phone || ''}
              />
            </Grid> */}

          {/* <Grid item xs={6}>
              <Typography>IP address</Typography>
              <TextField
                placeholder="IP address"
                // label="Password *"
                variant="outlined"
                size="small"
                name="ip_address"
                fullWidth
                helperText={
                  hasError('ip_address') ? formState.errors.ip_address[0] : null
                }
                error={hasError('ip_address')}
                onChange={handleChange}
                type="number"
                value={formState.values.ip_address || ''}
              />
            </Grid> */}
          <Grid item xs={6}>
            <Typography>Language</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                native
                fullWidth
                name="language"
                value={formState.values.language}
                onChange={handleChange}
                error={hasError('language')}
              >
                <option aria-label="" value="" />
                <option value="Afrikaans">Afrikaans</option>
                <option value="Albanian">Albanian</option>
                <option value="Arabic">Arabic</option>
                <option value="Armenian">Armenian</option>
                <option value="Basque">Basque</option>
                <option value="Bengali">Bengali</option>
                <option value="Bulgarian">Bulgarian</option>
                <option value="Catalan">Catalan</option>
                <option value="Cambodian">Cambodian</option>
                <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                <option value="Croatian">Croatian</option>
                <option value="Czech">Czech</option>
                <option value="Danish">Danish</option>
                <option value="Dutch">Dutch</option>
                <option value="English">English</option>
                <option value="Estonian">Estonian</option>
                <option value="Fiji">Fiji</option>
                <option value="Finnish">Finnish</option>
                <option value="French">French</option>
                <option value="Georgian">Georgian</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Hindi">Hindi</option>
                <option value="Hungarian">Hungarian</option>
                <option value="Icelandic">Icelandic</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Irish">Irish</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Javanese">Javanese</option>
                <option value="Korean">Korean</option>
                <option value="Latin">Latin</option>
                <option value="Latvian">Latvian</option>
                <option value="Lithuanian">Lithuanian</option>
                <option value="Macedonian">Macedonian</option>
                <option value="Malay">Malay</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Maltese">Maltese</option>
                <option value="Maori">Maori</option>
                <option value="Marathi">Marathi</option>
                <option value="Mongolian">Mongolian</option>
                <option value="Nepali">Nepali</option>
                <option value="Norwegian">Norwegian</option>
                <option value="Persian">Persian</option>
                <option value="Polish">Polish</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Quechua">Quechua</option>
                <option value="Romanian">Romanian</option>
                <option value="Russian">Russian</option>
                <option value="Samoan">Samoan</option>
                <option value="Serbian">Serbian</option>
                <option value="Slovak">Slovak</option>
                <option value="Slovenian">Slovenian</option>
                <option value="Spanish">Spanish</option>
                <option value="Swahili">Swahili</option>
                <option value="Swedish ">Swedish </option>
                <option value="Tamil">Tamil</option>
                <option value="Tatar">Tatar</option>
                <option value="Telugu">Telugu</option>
                <option value="Thai">Thai</option>
                <option value="Tibetan">Tibetan</option>
                <option value="Tonga">Tonga</option>
                <option value="Turkish">Turkish</option>
                <option value="Ukrainian">Ukrainian</option>
                <option value="Urdu">Urdu</option>
                <option value="Uzbek">Uzbek</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Welsh">Welsh</option>
                <option value="Xhosa">Xhosa</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {/* <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  className={classes.login}
                  id="PhoneVerifyButton"
                  onClick={()=>{
                    document.getElementById("#PhoneVerifyButton").style.visibility = "hidden"
                    document.getElementById("#firebaseui-auth-container").style.visibility = "visible";
                  }}
              >
                  Phone Verify
              </Button> */}
            {/* <div id="firebaseui-auth-container" style={{marginTop:10}}>
  
              </div> */}
          </Grid>
          <Grid item xs={12}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formState.values.api_enabled === 1 ? true : false}
                    onChange={handleChange}
                    name="api_enabled"
                    color="primary"
                  />
                }
                label={<span className={classes.font13}>Enable 2FA authentication</span>}
              />
            </FormGroup>
          </Grid>
          {formState.values.api_enabled == true && <Grid item xs={6}>
            <Typography>Nick name</Typography>
            <TextField
              placeholder="Nick name"
              // label="Password *"
              variant="outlined"
              size="small"
              name="nick_name"
              fullWidth
              helperText={
                hasError('nick_name') ? formState.errors.nick_name[0] : null
              }
              error={hasError('nick_name')}
              onChange={handleChange}
              type="text"
              value={formState.values.nick_name || ''}
            />
          </Grid>}
          {formState.values.api_enabled == true && <Grid item xs={6}>
            <Typography>Mother name</Typography>
            <TextField
              placeholder="Mother name"
              // label="Password *"
              variant="outlined"
              size="small"
              name="mother_name"
              fullWidth
              helperText={
                hasError('mother_name') ? formState.errors.mother_name[0] : null
              }
              error={hasError('mother_name')}
              onChange={handleChange}
              type="text"
              value={formState.values.mother_name || ''}
            />
          </Grid>}
          {formState.values.api_enabled == true && <Grid item xs={6}>
            <Typography>Father name</Typography>
            <TextField
              placeholder="Father name"
              // label="Password *"
              variant="outlined"
              size="small"
              name="father_name"
              fullWidth
              helperText={
                hasError('father_name') ? formState.errors.father_name[0] : null
              }
              error={hasError('father_name')}
              onChange={handleChange}
              type="text"
              value={formState.values.father_name || ''}
            />
          </Grid>}
          {formState.values.api_enabled == true && <Grid item xs={6}>
            <Typography>Hobby</Typography>
            <TextField
              placeholder="Hobby"
              // label="Password *"
              variant="outlined"
              size="small"
              name="hobby"
              fullWidth
              helperText={
                hasError('hobby') ? formState.errors.hobby[0] : null
              }
              error={hasError('hobby')}
              onChange={handleChange}
              type="text"
              value={formState.values.hobby || ''}
            />
          </Grid>}
          {formState.values.api_enabled == true && <Grid item xs={6}>
            <Typography>Best friend</Typography>
            <TextField
              placeholder="Best friend"
              // label="Password *"
              variant="outlined"
              size="small"
              name="best_friend"
              fullWidth
              helperText={
                hasError('best_friend') ? formState.errors.best_friend[0] : null
              }
              error={hasError('best_friend')}
              onChange={handleChange}
              type="text"
              value={formState.values.best_friend || ''}
            />
          </Grid>}
          <Grid item xs={12}>
            <FormGroup row>
              <ReCAPTCHA
                // ref={recaptchaRef}
                // size="invisible"
                sitekey="6LeKxQwaAAAAAGPOpMltsXMf5Jv5s8_iuIPgn7jA"
                onChange={onHandleRecaptcha}
              />
            </FormGroup>
          </Grid>

          {/* <Grid item xs={6}>
              <Link to="/login" className={classes.listItemText}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                  className={classes.login}
                >
                  Skip
                </Button>
              </Link>
            </Grid> */}

          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={!captcha}
            >
              Save
            </Button>
          </Grid>

        </Grid>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_id: state.auth.user_id,
  access_token: state.auth.access_token,
  error: state.auth.error
});

const mapDispatchToProps = {
  UserProfile,
  ResendConfirm
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));