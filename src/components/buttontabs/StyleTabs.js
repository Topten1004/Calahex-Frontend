import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const ButtonTabs = withStyles({
  root: {
    // marginTop
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 0,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },

})((props) => <Tabs {...props} centered TabIndicatorProps={{ children: <span /> }} />);


// const isXs = useMediaQuery('(max-width:300px)');
const ButtonTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 50,
    border: '1px solid #ddd',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    borderRadius: 5,
    fontSize: '14px !important',
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
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      opacity: 1,
    },
    '&$selected': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      // fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'white',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export { ButtonTab, ButtonTabs };