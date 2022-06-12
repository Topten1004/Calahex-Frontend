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
import { ResendConfirm } from '../../redux/actions/auth';

import firebaseConfig from '../../static/firebaseConfig';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';

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
  //   first_name: {
  //     presence: { allowEmpty: false, message: 'is required' },
  //     length: {
  //       maximum: 300,
  //     },
  //   },

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
  const [verified, setVerified] = React.useState(false);

  if (!firebase.apps.length) {
    const fbase = firebase.initializeApp(firebaseConfig);
  }

  console.log(props.location.state)

  const uiConfig = {
    signInSuccessUrl: "https://calahex.com/login" + parseInt(props.location.state) * parseInt(props.location.state), //This URL is used to return to that page when we got success response for phone authentication.
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    tosUrl: "https://calahex.com/login"
  };

  useEffect(() => {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }, [])

  useEffect(() => {
    return () => {
      if (this && this.hasOwnProperty('ui'))
        this.ui.delete();
    }
  }, []);

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

    props.onSubmit(formState.values, props.location.state, props.history);

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
          <Grid item xs={12}>
            <div id="firebaseui-auth-container" style={{ marginTop: 10 }}>

            </div>
          </Grid>

          {/* <Grid item xs={12}>
            <FormGroup row>
                <ReCAPTCHA
                // ref={recaptchaRef}
                // size="invisible"
                sitekey="6LeKxQwaAAAAAGPOpMltsXMf5Jv5s8_iuIPgn7jA"
                onChange={onHandleRecaptcha}
                />
            </FormGroup>
          </Grid> */}

          <Grid item xs={12}>
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

          {/* <Grid item xs={6}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={!captcha}
            >
              Next
            </Button>
          </Grid> */}

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
  ResendConfirm
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));
