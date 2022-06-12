import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import validate from 'validate.js';
import ReCAPTCHA from "react-google-recaptcha";
import clsx from 'clsx';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {SendUser} from '../../redux/actions/auth';

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
    values: {},
    touched: {},
    errors: {},
  });

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
          password: [props.error.message]
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

  const handleSubmit = event => {
    event.preventDefault();

    // if (formState.isValid) {
      // window.location.replace('/');
      props.SendUser(formState.values, props.history);
    // }

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
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >
              SEND
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            Please input your email and click SEND button. <br/>And then check your email. <br/> You will receive link to change your password.
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
  SendUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));
