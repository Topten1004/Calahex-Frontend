import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import validate from 'validate.js';
import ReCAPTCHA from "react-google-recaptcha";
import clsx from 'clsx';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Check2FAModal from "../../components/Check2FAModal";
import { getItem } from '../../utils/helper';
import * as config from '../../static/constants';
import axios from 'axios';
import { Check2FAEnable, Check2FAAnswer, SignOut, Check2FACountPlus, SigninUsers, SetApiEnable } from "../../redux/actions/auth";

import { SigninUser } from '../../redux/actions/auth';

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

  const [openAdd, setOpenAdd] = useState(false);
  const [showError, setShowError] = useState(false);

  let click_flag = 0;

  const onClose = () => {
    setOpenAdd(false);
  }

  const checkanswer = (new_token) => {
    if (props.check2FaEnable.answer === new_token) {
      click_flag = 0;
      setShowError(false);

      props.SigninUsers(props.userdata);
      props.history.push('');
      setOpenAdd(false);
    } else {
      setShowError(true);
      click_flag++;
      if (click_flag > 2) {
        setOpenAdd(false);
        click_flag = 0;
        props.SignOut(props.history);
      }
    }
  }
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
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
    if (props.error) {
      setFormState({
        ...formState,
        errors: {
          email: [props.error.message],
          password: [props.error.message]
        }
      });
    }
  }, [props.error])
  React.useEffect(() => {
    if (props.is_apienable) {
      try {
        const header = {
          headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        axios.post(`${config.BACKEND_URL}auth/check2faenables`, { email: formState.values.email }, header).then(res => {
          props.Check2FAAnswer(res.data);
          if (res.data.status === 1) {
            setOpenAdd(true);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

  }, [props.is_apienable])

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
      props.SetApiEnable();
      props.SigninUser(formState.values, props.history);
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

          <Grid item xs={12}>
            <TextField
              placeholder="E-mail"
              // label="E-mail *"
              variant="outlined"
              size="small"
              name="email"
              fullWidth
              helperText={hasError('email') ? formState.errors.email[0] : null}
              error={hasError('email')}
              onChange={handleChange}
              type="email"
              value={formState.values.email || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Password"
              // label="Password *"
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
          <Grid item xs={12} className={classes.right}>
            <Link to="/forget" className={clsx(classes.font13, classes.nonDecoration)}>Forgot password?</Link>
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
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={!captcha}
            >
              Log In
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            Don't you have an account? <Link to="sign-up" className={clsx(classes.font13, classes.nonDecoration)}>Sign Up</Link>
          </Grid>
        </Grid>
      </form>
      <Check2FAModal isVisible={openAdd} onClose={onClose} fullWidth={true} maxWidth={'sm'} createToken={checkanswer} showError={showError} />
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_id: state.auth.user_id,
  access_token: state.auth.access_token,
  error: state.auth.error,
  is_apienable: state.auth.is_apienable,
  check2FaEnable: state.auth.check2FaEnable,
  check2FaAnswer: state.auth.check2FaAnswer,
  userdata: state.auth.userdata,
});

const mapDispatchToProps = {
  SigninUser,
  SigninUsers,
  SetApiEnable,
  Check2FAAnswer, SignOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));
