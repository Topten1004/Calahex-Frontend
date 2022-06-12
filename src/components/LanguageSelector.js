import React, { useContext, useEffect, useState } from 'react';
import TranslateIcon from '@material-ui/icons/Translate';
import { InputBase, MenuItem, Select, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

import { languageOptions } from '../static/languages';
import { LanguageContext } from '../utils/Language';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {  
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    fontSize: 14,
      padding: '10px 26px 10px 5px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        border: 'none',
        boxShadow: 'none',
        background: 'transparent'
      },
  },  
}))(InputBase);

const styles = makeStyles(theme => ({
  color: {
    color: theme.palette.primary.main
  },
  font12: {
    fontSize: 12
  },
  font14: {
    fontSize: 14
  },
  languageTitle: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 10
  },
  width100: {
    width: 100
  },
  width100p: {
    width: 120
  },
  lanBorder: {
    borderRight: '2px solid #337ab7'
  },
  hidden: {
    display: 'none'
  },
  opacity: {
    opacity: 0
  },
  isXs: {
    marginRight: '-22px'
  },
  pt5: {
    paddingTop: 6,
    display: 'flex',
    alignItems: 'center'
  }
}));

export default function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);
  const [currentLan, setCurrentLan] = useState('');
  const [ currency, setCurrency] = useState('USD');
  const [open, setOpen] = React.useState(false);
  const currencies = ['USD', 'EUR'];
  const classes = styles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  // set selected language by calling context method
  const handleLanguageClick = lan => { userLanguageChange(lan); };
  const handleCurrencyClick = cur => { setCurrency(cur); };

  useEffect(() => {
    let defaultLanguage = window.localStorage.getItem('rcml-lang');
    if (!defaultLanguage) {
      defaultLanguage = window.navigator.language.substring(0, 2);
    }
    userLanguageChange(defaultLanguage);
    setCurrentLan(defaultLanguage);
  }, [userLanguageChange]);

  return (
      <div className={classes.pt5}><TranslateIcon className={clsx(classes.color, classes.font14, !isXs && classes.isXs)}/><Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={userLanguage + '/' + currency}
        className={clsx(classes.color, !isXs && classes.opacity)}
        input={<BootstrapInput className={clsx(!isXs && classes.opacity)} />}
      >
        {isXs && <MenuItem value={userLanguage + '/' + currency} className={clsx(classes.hidden)}>{currentLan.toUpperCase() + '/' + currency}</MenuItem>}
        <div style={{display: 'flex', position: 'relative' }}>
          <div className={clsx(classes.width100p, classes.lanBorder)}>
            <p className={classes.languageTitle}>languages</p>
            <MenuItem value={currentLan} name='lan' className={clsx(classes.color)}>{languageOptions[currentLan]}</MenuItem>
            {Object.entries(languageOptions).map(([id, name]) => { 
              if(id !== currentLan)
                return <MenuItem value={id} key={id} name='lan' className={clsx(classes.color)} onClick={() => handleLanguageClick(id)}>{name}</MenuItem>
            })}
          </div>
          <div className={classes.width100}>
            <p className={classes.languageTitle}>currency</p>
            <MenuItem value={currency} name="cur" className={clsx(classes.color)}>{currency}</MenuItem>
            {currencies.map(item => {
              if(item !== currency)
              return <MenuItem value={item} key={item} name="cur" className={clsx(classes.color)} onClick={() => handleCurrencyClick(item)}>{item}</MenuItem>
              })}
          </div>
        </div>
      </Select></div>
  );
};