import React, { useEffect,useState} from "react";
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import WalletTopbar from "../../components/Wallets/WalletBars/WalletTopBar";
import WalletLeftBar from "../../components/Wallets/WalletBars/WalletLeftBar";
import WalletProfileSecurity from "../../components/Wallets/WalletBars/WalletRightBar";
import {Button, TextField} from "@material-ui/core";
import FutureImage from '../../assets/future.png';
import Typography from "@material-ui/core/Typography";
import {VerifyInfo} from "../../redux/actions/wallet"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        margin: 0,
        padding: 0,
    },
    futureBody: {
        display: "flex"
    },
    mainBody: {
        padding: 15,
        height: 'calc(100vh - 50px)',
        overflowY: 'auto',
        width: "-webkit-fill-available"
    },
    bodyHeader: {
        padding: '0px 20px 0px 30px',
        borderBottom: '1px solid black'
    },
    futureText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    inputBody: {
        margin: 30
    },
    inputMainBody: {
        borderRadius: 15,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        textAlignLast: "center"
    },
    image: {
        marginTop: 50,
        width: 100,
        height: 100
    },
    textBody: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 20
    },
    underBody: {
        fontSize: 15,
        color: theme.palette.primary.main,
        textDecoration: 'underline'
    },
    fTextBody: {
        fontSize: 14,
        padding: 10
    },
    inputDiv: {
        border: 'solid gray',
        borderRadius: '14px',
        width: '40%',
        margin: "auto",
        padding: 20
    },
    enableButton: {
        borderRadius: 20,
        background: theme.palette.primary.main,
        textTransform: 'none',
        color: 'white',
        fontSize: 12,
        textDecoration: "none !important",
        width: '20%',
        marginTop: 20,
        marginBottom: 50
    },
}));



const WalletFuture = (props) => {
    let history = useHistory();
    const classes = useStyles();
    const { selectLanding, isAuthenticated ,user_id,verifyInfo} = props;

    const [futuresAlert, setFuturesAlert] = useState(false);
    const [futuresAlertContent, setFuturesAlertContent] = useState("");

    const handleAlertClose = () => {
        setFuturesAlert(false);
        history.push('account-overview');
    }

    useEffect(() => {
        selectLanding();
    }, [selectLanding]);

    useEffect(() => {
        props.VerifyInfo(user_id);
    }, [user_id]);

    useEffect(() =>{
        
        if(Object.keys(verifyInfo).length){
            if(verifyInfo["phone_verified_at"] == null){
                setFuturesAlertContent('You need to pass Phone verification to activate this account.')
                setFuturesAlert(true);
            } else{
                setFuturesAlert(false);
            }
        }
    },[verifyInfo]);

    useEffect(() => {
        console.log(isAuthenticated)
    }, [isAuthenticated])



    return (
        <div className={classes.root}>
            <WalletTopbar name="Futures Account"/>
            <div className={classes.futureBody}>
                <WalletLeftBar name="Futures Account" />
                <div className={classes.mainBody}>
                    <div className={classes.bodyHeader}>
                        <p className={classes.futureText}>Futures</p>
                    </div>
                    <div className={classes.inputBody}>
                        <div className={classes.inputMainBody}>
                            <img
                                className={classes.image}
                                src={FutureImage}
                                alt="future"
                            />
                            <Typography  className={classes.textBody}>Open Futures Account</Typography>
                            <Typography  className={classes.underBody}>Click to see Futures Trading Guide</Typography>
                            <Typography  className={classes.fTextBody}>Futures trading is a highly risky endeavor, with the potential for both great profits and significant losses. Please be aware that in the event of extreme price movement, there is a chance that all margin balance in your futures wallet may be liquidated. Futures trading is restricted for users from certain regions.</Typography>
                            <div className={classes.inputDiv}><p id="outlined-basic" >Futures referral code(Optional)</p></div>
                            <Button variant="contained" className={classes.enableButton}>
                                Open Now
                            </Button>
                        </div>
                    </div>s
                </div>
                <WalletProfileSecurity/>
            </div>
            <Dialog
                fullWidth
                open={futuresAlert}
                // onClose={handleTransferAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {futuresAlertContent}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                
                <Button onClick={handleAlertClose} color="primary" autoFocus>
                    Okay
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

WalletFuture.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.auth.user_id,
    verifyInfo: state.wallet.verifyInfo
});

const mapDispatchToProps = {
    VerifyInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletFuture);
