import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const WalletTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 50,
            width: '100%',
            backgroundColor: '#0045f8',
        },
    },

})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const WalletTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 30,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(3),
        fontSize: '14px !important',
        '&:hover': {
            color: '#000',
            opacity: 1,
        },
        '&$selected': {
            color: '#000',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#000',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

export { WalletTabs, WalletTab };