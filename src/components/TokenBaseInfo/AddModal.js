import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Grid, makeStyles, MenuItem, Select } from '@material-ui/core';
import validate from 'validate.js';

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
  token_name: {
    presence: { allowEmpty: false, message: 'is required' },
    // token_logo: true,
    length: {
      maximum: 300,
    },
  },
  // token_name: {
  //   presence: { allowEmpty: false, message: 'is required' },
  //   // length: {
  //   //   minimum: 8,
  //   // },
  // },
  token_symbol: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  // token_logo: {
  //   presence: { allowEmpty: false, message: 'is required' },
  // },
};

export default function AddModal(props) {
  const { isVisible, onClose, fullWidth, maxWidth } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [token_whitepaper, setToken_Whitepaper] = useState(null);
  const [token_logo, setToken_logo] = useState(null);

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
      const formData = new FormData();
      formData.append('token_whitepaper', token_whitepaper);
      formData.append('token_logo', token_logo);
      formData.append('token_name', formState.values.token_name);
      formData.append('token_symbol', formState.values.token_symbol);
      formData.append('token_decimal', formState.values.token_decimal);
      formData.append('token_pair_type', formState.values.token_symbol + '/' + formState.values.token_pair_type);
      props.createToken(formData);
    }

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));

    alert("Please wait until Calahex Support Team check your new token and approve it.");
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleFile = e => {
    if(e.target.name === 'token_whitepaper') {
      setToken_Whitepaper(e.target.files[0]);
    } else {
      setToken_logo(e.target.files[0]);
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="form-dialog-title">Token Listing</DialogTitle>
        <DialogContent>
          <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}  className={classes.label}>
                <label htmlFor="token_name" className="required">Base Token Name</label>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  placeholder="Base Token Name"
                  // label="E-mail *"
                  className={classes.font13}
                  variant="outlined"
                  size="small"
                  name="token_name"
                  fullWidth
                  helperText={hasError('token_name') ? formState.errors.token_name[0] : null}
                  error={hasError('token_name')}
                  onChange={handleChange}
                  type="type"
                  value={formState.values.token_name || ''}
                />
              </Grid>
              {/* <Grid item  xs={12} sm={4} className={classes.label}>
                <label htmlFor="tokenId" className="required">Base Token ID</label>
              </Grid>
              <Grid item xs={12} sm={8} >
                <TextField
                  placeholder="Only support TRC20 token yet"
                  // label="Password *"
                  className={classes.font13}
                  variant="outlined"
                  size="small"
                  name="tokenId"
                  fullWidth
                  helperText={
                    hasError('tokenId') ? formState.errors.tokenId[0] : null
                  }
                  error={hasError('tokenId')}
                  onChange={handleChange}
                  type="text"
                  value={formState.values.tokenId || ''}
                />
              </Grid> */}
              <Grid item  xs={12} sm={4} className={classes.label}>
                <label htmlFor="token_symbol" className="required">Base Token Symbol</label>
              </Grid>
              <Grid item xs={12} sm={8} >
                <TextField
                  placeholder="Base Token Symbol"
                  // label="Confirm Password *"
                  className={classes.font13}
                  variant="outlined"
                  size="small"
                  name="token_symbol"
                  fullWidth
                  helperText={
                    hasError('token_symbol') ? formState.errors.token_symbol[0] : null
                  }
                  error={hasError('token_symbol')}
                  onChange={handleChange}
                  type="text"
                  value={formState.values.token_symbol || ''}
                />
              </Grid>
              <Grid item  xs={12} sm={4} className={classes.label}>
                <label htmlFor="token_decimal">Token Decimal</label>
              </Grid>
              <Grid item xs={12} sm={8} >
                <TextField
                  // label="Confirm Password *"
                  className={classes.font13}
                  variant="outlined"
                  size="small"
                  name="token_decimal"
                  fullWidth
                  InputProps={{inputProps: {min: 0, max: 8}}}
                  helperText={
                    hasError('token_decimal') ? formState.errors.token_decimal[0] : null
                  }
                  error={hasError('token_decimal')}
                  onChange={handleChange}
                  type="number"
                  value={formState.values.token_decimal || 0}
                />
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <label htmlFor="token_whitePaper">Token Whitepaper</label>
              </Grid>
              <Grid item xs={8}>
                <input type="file" className={classes.fileInput} name="token_whitepaper" onChange={handleFile} />
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <label htmlFor="token_pair_type" className="required">Pair Type</label>
              </Grid>
              <Grid item xs={8}>
                <FormControl variant="outlined" size="small" className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="token_pair_type"
                    onChange={handleChange}
                    value={formState.values.token_pair_type || ''}
                  >
                    <MenuItem value='USDT'>USDT</MenuItem>
                    <MenuItem value='BTC'>BTC</MenuItem>
                    <MenuItem value='ETH'>ETH</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} className={classes.label}>
                <label htmlFor="token_logo" className="required">Logo URL</label>
              </Grid>
              <Grid item xs={8}>
                <input type="file" className={classes.fileInput} name="token_logo" onChange={handleFile} />
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