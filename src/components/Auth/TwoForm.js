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
import { UserTwo, UserPhone, UserProfile, ResendConfirm, } from '../../redux/actions/auth';
import { useLocation } from "react-router-dom";

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
};


const Form = (props) => {
  const classes = useStyles();



  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

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
  const search = useLocation().search;
  var key = new URLSearchParams(search).get('key');
  if (key != null) {
    console.log(key)
    var id = Math.sqrt(key);
    props.UserPhone(id);
  }

  React.useEffect(() => {
    var errors = validate(formState.values, schema);
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
            ? event.target.checked
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
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
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

          <Grid item xs={6}>
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
          </Grid>

          <Grid item xs={6}>
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
  UserPhone,
  UserProfile,
  UserTwo,
  ResendConfirm
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));
