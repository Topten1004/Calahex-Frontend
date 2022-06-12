import {makeStyles} from "@material-ui/core";

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
    headerLinks: {
        textDecoration: 'underline',
        fontWeight: 'bold',
        marginRight: 20
    },

}));

export default Styles;