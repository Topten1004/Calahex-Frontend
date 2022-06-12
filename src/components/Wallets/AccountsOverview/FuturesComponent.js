import React, { useContext,useEffect} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ActivateState,ActivateTransferState} from "../../../redux/actions/wallet"
import PropTypes from "prop-types";
import {
    withStyles,
    withWidth,
    Button,
} from "@material-ui/core";
import { LanguageContext } from '../../../utils/Language';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import {DialogTitle, DialogActions, DialogContent} from "../Dialog";
import Collapse from "@material-ui/core/Collapse";
import { useHistory } from "react-router-dom";
function FuturesComponent(props) {
    const {
        classes,hide,amount,activate,user_id,activateState
    } = props;
    let history = useHistory();
    const { dictionary } = useContext(LanguageContext);

    const [futureActivate, setFutureActivate] = React.useState(activate);
    const [activeModalOpen, setActiveModalOpen] = React.useState(false);
    const [inactiveAlertOpen, setInActiveAlertOpen] = React.useState(false);



    const handleActiveModalOpen = () => {
        setActiveModalOpen(true);
    };
    const handleActiveModalClose = () => {
        setActiveModalOpen(false);
    };
    const ActiveSuccessClose = () => {
        // props.ActivateState(user_id,"futures",true);
        // setFutureActivate(!futureActivate);
        // setActiveModalOpen(false);
        
        history.push('../phone',user_id);
    };
    const handleInActiveAlertOpen = () => {
        setInActiveAlertOpen(true);
    };
    const handleInActiveAlertClose = () => {
        setInActiveAlertOpen(false);
    };
    const InActiveSuccessClose = () => {
        props.ActivateState(user_id,"futures",false);
        setFutureActivate(!futureActivate);
        setInActiveAlertOpen(false);
    };

    const handleTransferState = () => {
        props.ActivateTransferState("Futures");
    }
    return (
        <Grid item xs={12} sm={6}>
            <div className={classes.exchangeBody}>
                <Typography className={classes.textBody}>Futures Account</Typography>
                <Collapse in={hide}>
                    <Typography className={classes.textEst}>Estimated Balance</Typography>
                    <div className={classes.balanceBody}>
                        <Typography className={classes.balanceText}>{amount}</Typography>
                        <Typography className={classes.textBody}>USDT</Typography>
                    </div>
                </Collapse>
                <Typography className={classes.descriptionText}>Transfer USDT to your Futures
                    account to trade USDT margined futures with no expiration and up to 125x
                    leverage.</Typography>
                <div className={classes.bottonBody}>
                    {
                        !futureActivate ?
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.defaultButton}
                                onClick={handleActiveModalOpen}>
                                Activate
                            </Button>
                            :
                            <>
                                 <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.defaultButton}
                                    onClick={handleInActiveAlertOpen}
                                >
                                    Inactive
                                </Button>
                                <Link to="/wallet/transfer-balances" className ={classes.transferText}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.defaultButton}
                                    onClick = {handleTransferState}
                                >
                                    Transfer
                                </Button>
                                </Link>
                                </>
                    }
                </div>
            </div>
            <Dialog fullWidth={true} onClose={handleActiveModalClose} aria-labelledby="customized-dialog-title" open={activeModalOpen} >
                <DialogTitle id="customized-dialog-title" onClose={handleActiveModalClose}>
                    Activate
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        You need to pass Phone verification to activate this account.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    {activate == true &&<Button autoFocus color="primary" disabled>
                        Verified
                    </Button>}
                    {activate == false &&<Button autoFocus onClick={ActiveSuccessClose} color="primary">
                        Verify
                    </Button>}
                    <Button autoFocus onClick={handleActiveModalClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            {/* <Dialog
                open={inactiveAlertOpen}
                onClose={handleInActiveAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you want to inactive?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleInActiveAlertClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={InActiveSuccessClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog> */}
        </Grid>
    );
}

FuturesComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    activateState : state.wallet.activateState,
    user_id: state.auth.user_id,
});

const mapDispatchToProps = {
    ActivateState,ActivateTransferState
};
export default connect(mapStateToProps, mapDispatchToProps)(FuturesComponent);
