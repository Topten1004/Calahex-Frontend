import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Grid, makeStyles, MenuItem, Select } from '@material-ui/core';
import validate from 'validate.js';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '30px 20px',
    boxShadow: '1px 1px 8px 4px #5855551e'
  },
  font13: {
    fontSize: 12
  },
  label: {
    textAlign: 'right',
    marginTop: 10
  },
  formControl: {
    minWidth: 150
  },
  fileInput: {
    marginTop: 10
  }
}));

const schema = {
  answer_symbol: {
    presence: { allowEmpty: false, message: 'is required' },
  },
};

const Check2FAModal = (props) => {
  const { isVisible, onClose, fullWidth, maxWidth } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isVisible);
  }, [isVisible])


  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  // const []

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);


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
      props.createToken(formState.values.answer_symbol);
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
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="form-dialog-title">Two-factor authentication</DialogTitle>
        <DialogContent>
          {props.showError && <Alert severity="error">This answer is invalid!</Alert>}
          <br />
          <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} className={classes.label}>
                <label htmlFor="answer_symbol">Your {props.check2FaEnable.question}</label>
              </Grid>
              <Grid item xs={12} sm={8} >
                <TextField
                  placeholder="Answer the Question"
                  className={classes.font13}
                  variant="outlined"
                  size="small"
                  name="answer_symbol"
                  fullWidth
                  helperText={
                    hasError('answer_symbol') ? formState.errors.answer_symbol[0] : null
                  }
                  error={hasError('answer_symbol')}
                  onChange={handleChange}
                  type="text"
                  value={formState.values.answer_symbol || ''}
                />
              </Grid>
              <Grid item xs={6} />
              <Grid item xs={3}>
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={onClose} size="small"
                  variant="contained"
                  fullWidth
                  color="secondary">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_id: state.auth.user_id,
  check2FaEnable: state.auth.check2FaEnable,
});

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Check2FAModal);