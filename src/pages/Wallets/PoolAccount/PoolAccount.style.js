import { makeStyles } from '@material-ui/core';

const Styles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    body: {
        width: '100%',
        display: 'flex'
    },
    width100: {
        width: '100%',
        padding: '0 2%'
    },
    content: {
        padding: 20,
        display: 'flex'
    },
    flex: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    pool: {
        fontWeight: 'bold',
        marginRight: 20,
        fontSize: 16
    },
    hideBalance: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #bbb',
        borderRadius: 10,
        fontSize: 10,
        marginRight: 20
    },
    hideIcon: {
        width: 15,
        height: 15,
        marginRight: 10
    },
    contentHeaderLeft: {
        padding: '20px 0',
        display: 'flex'
    },
    contentHeaderRight: {
        marginLeft: 20
    },
    quickMenu: {
        fontWeight: 600,
    },
    orderHistory: {
        color: theme.palette.primary.main
    },
    breadcrumb: {
        width: '100%',
        backgroundColor: '#bbb',
        padding: '5px 20px',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    balance1: {
        fontSize: 20,
        fontWeight: 500
    },
    balanceDiv: {
    borderRadius: 10,
    padding: '1% 2%',
    backgroundColor: '#e8e8e8',
    },
    textBody: {
        fontSize: 14
    },
    balanceBody: {
        display: "flex",
            alignItems: "baseline"
    },
    balanceText: {
        fontSize: 20,
            marginRight: 5
    },
    hideButton: {
        borderRadius: 5,
        textTransform: 'none',
        color: 'black',
        backgroundColor: 'white',
        padding: '0px 10px',
        fontSize: 12,
        textDecoration: "none !important",
        height: 30,
        marginLeft: 30,
        alignSelf: 'center',
        marginRight: 10
    },
}));

export default Styles;