import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import validate from 'validate.js';
import ReCAPTCHA from "react-google-recaptcha";
import clsx from 'clsx';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {ChangePassword, Resend} from '../../redux/actions/auth';

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

  }
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 300,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
    },
  },
};

const Form = (props) => {
  const classes = useStyles();

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {
      email: props.location.state,
      key: '',
      password: ''
    },
    touched: {},
    errors: {},
  });

  const [captcha, setCaptcha] = React.useState(false);

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  React.useEffect(() => {
    if(props.error) {
      setFormState({
        ...formState,
        errors: {
          email: [props.error.message],
          key: [props.error.message]
        }
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

    // if (formState.isValid) {
      // window.location.replace('/');
      // alert()
      props.ChangePassword(formState.values, props.history);
    // }

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const reSend = () => {
    if(document.getElementById('email').value == ''){
      alert("please enter email");
      document.getElementById('email').focus();
    }
    props.Resend(formState.values, props.history);
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={2}>          
          <Grid item xs={12}>
            <TextField
              placeholder="E-mail"
              // label="E-mail *"
              variant="outlined"
              size="small"
              name="email"
              id="email"
              fullWidth
              // helperText={hasError('email') ? formState.errors.email[0] : null}
              error={hasError('email')}
              onChange={handleChange}
              type="email"
              value={formState.values.email || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Key"
              // label="Password *"
              variant="outlined"
              size="small"
              name="key"
              fullWidth
              // helperText={
              //   hasError('password') ? formState.errors.password[0] : null
              // }
              error={hasError('key')}
              onChange={handleChange}
              type="text"
              value={formState.values.key || ''}
            />
          </Grid>
          <Grid item xs={12} className={classes.right}>
            <div onClick={()=>{reSend()}} className={clsx(classes.font13, classes.nonDecoration)} style={{cursor:'pointer'}}>Re-send email</div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="New Password"
              // label="Password *"
              className={classes.font13}
              variant="outlined"
              size="small"
              name="password"
              fullWidth
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              error={hasError('password')}
              onChange={handleChange}
              type="password"
              value={formState.values.password || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Confirm Password"
              // label="Confirm Password *"
              className={classes.font13}
              variant="outlined"
              size="small"
              name="password_confirmation"
              fullWidth
              helperText={
                hasError('password_confirmation') ? formState.errors.password_confirmation[0] : null
              }
              error={hasError('password_confirmation')}
              onChange={handleChange}
              type="password"
              value={formState.values.password_confirmation || ''}
            />
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
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              // disabled={!captcha}
            >
              Change
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
  ChangePassword,
  Resend
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));
