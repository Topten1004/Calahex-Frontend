import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        justifyContent : "left",
    },
    drawer: {
        maxWidth: 270,
    },
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
    },
    sidebars: {
        minWidth: 270,
        height: 'calc(100vh - 50px)',
        overflowY: 'auto',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: 20,
        paddingTop: 0,
        textAlign: 'right'
    },
    drawerPaper: {
        width: 270,
        height: 'calc(100vh - 50px)',
        overflowY: 'auto',
    },
    closeButton: {

    },
    button: {
        color: colors.blueGrey[800],
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
    },
    btnRoot : {
        paddingLeft : "25px",
        display: 'flex',
        justifyContent : "space-between !important"
    },
    subMenu : {
        paddingLeft : "50px !important",
    },
    active: {
        background: theme.palette.primary.footer,
        padding: '10px 8px',
        borderRadius: 5,
        color: 'white',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        paddingLeft : "25px",
    }
}));
export default useStyles;
