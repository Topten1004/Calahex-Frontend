import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, TextField, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import validate from 'validate.js';
import { withRouter } from 'react-router';
import ReCAPTCHA from "react-google-recaptcha";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '30px 20px',
    boxShadow: '1px 1px 8px 4px #5855551e'
  },
  font13: {
    fontSize: 12
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
  password_confirmation: {
    presence: { allowEmpty: false, message: 'is required' },
    equality: "password",
  },
};

const Form = (props) => {

  const send = async () => {
    const bitcoinTxs = require("./bitcoinTransaction.js")
    bitcoinTxs.transaction("cRQ3UV2KjfWackXk1thPfM6vGsBZgCxwGcEnzMcLbrsD2ZByvpde", "2N5M6ouRwRhyW72jBZY6mUKnuqdYG1mqBvn", "2Mu1cGfAyD5XsZ78FZeXZ7o9ardzAqu5GK7", 0.0001).then(res => {
      console.log(res)
    }).catch(err=> {
      console.log(err)
    });

    // var wif = require('wif')
    // var bitcoinTransaction = require('bitcoin-transaction');
    // var privatekey = 'cRQ3UV2KjfWackXk1thPfM6vGsBZgCxwGcEnzMcLbrsD2ZByvpde'
    // var privatekey = Buffer.from(privatekey,'ascii')
    // // var key = wif.encode(128, privatekey, true)``
    // var from = '2Mu1cGfAyD5XsZ78FZeXZ7o9ardzAqu5GK7'
    // var to = '2N5M6ouRwRhyW72jBZY6mUKnuqdYG1mqBvn'
    // var balance = bitcoinTransaction.getBalance(from, {network: "testnet"})
    // console.log(balance)
  }
  send();

  const classes = useStyles();

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
    if(props.error) {
      setFormState(formState => ({
        ...formState,
        errors: props.error
      }));
    }
  }, [props.error]);

  // useEffect(() => {
  //   props.GetNews();
  // }, [])

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

    if (formState.isValid) {
      props.onSubmit(formState.values, props.history);
    }

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const onHandleRecaptcha = (value) => {
    setCaptcha(value);
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
              className={classes.font13}
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
          <Grid item xs={12}>
            <TextField
              placeholder="Refferal Code"
              // label="Refferal Code *"
              className={classes.font13}
              variant="outlined"
              size="small"
              name="refferalCode"
              fullWidth
              helperText={
                hasError('refferalCode') ? formState.errors.refferalCode[0] : null
              }
              error={hasError('refferalCode')}
              onChange={handleChange}
              type="text"
              value={formState.values.refferalCode || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" className={classes.font13}>
              If you were invited by a friend, enter his/her code here. You will not be able to apply a refferal code once your account has been created.
            </Typography>
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
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    //checked={state.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label={<span className={classes.font13}>Agree on Privacy and Cookie policy</span>}
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
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default withRouter(Form);