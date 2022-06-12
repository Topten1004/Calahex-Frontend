import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    Button,
    Grid,
    useMediaQuery,
    Divider,
    Link,
    ListItemText,
    makeStyles,
} from '@material-ui/core';
import Styles from './PoolAccount.style';
import WalletLeftBar from "../../../components/Wallets/WalletBars/WalletLeftBar";
import WalletTopbar from "../../../components/Wallets/WalletBars/WalletTopBar";
import WalletProfileSecurity from "../../../components/Wallets/WalletBars/WalletRightBar";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import jsonData from '../../../resources/wallet.json';
import WalletTable from "../../../components/Wallets/PoolAccount/WalletTables";
import PropTypes from "prop-types";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import WalletPoolData from "../../../resources/WalletPoolData.json";
import SearchPoolTable from "../../../components/Wallets/PoolAccount/SearchPoolTable";

import {VerifyInfo} from "../../../redux/actions/wallet"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';

const PoolAccount = (props) => {
    const { theme ,selectLanding, isAuthenticated ,user_id,verifyInfo} = props;
    const [hide, setHide] = React.useState(true);
    let history = useHistory();
    const classes = Styles(theme);

    const changedEUR = jsonData.wallet.poolAccount.estimateBalance

    const hideChange = () => {
        setHide(!hide);
    };
    const handleAlertClose = () => {
        setFuturesAlert(false);
        history.push('account-overview');
    }
    const [futuresAlert, setFuturesAlert] = useState(false);
    const [futuresAlertContent, setFuturesAlertContent] = useState("");

    useEffect(() => {
        props.VerifyInfo(user_id);
    }, [user_id]);

    useEffect(() =>{
        if(Object.keys(verifyInfo).length){
            if(verifyInfo["auth_verified_at"] == null ||verifyInfo["pool_paid_at"] == null){
                setFuturesAlertContent('You need to pass 2FA verification and pay $20 to activate this account .')
                setFuturesAlert(true);
            } else{
                setFuturesAlert(false);
            }
        }
    },[verifyInfo]);

    return (
        <div>
            <WalletTopbar name="Pool Account"/>
            <div className={classes.body}>
                <WalletLeftBar name="Pool Account"/>

                <div className={classes.body}>
                    <Grid container direction={"column"} className={classes.width100}>
                        <Grid container direction={"row"} alignItems={"center"} className={classes.contentHeaderLeft}>
                            <Grid container direction={"row"} alignItems={"center"} className={classes.contentHeaderLeft}>
                                <div className={classes.pool}>Pool</div>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.hideButton}
                                    startIcon={hide ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>}
                                    onClick={hideChange}
                                >
                                    {hide ? 'Hide' : 'Show'}&nbsp;Balance
                                </Button>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid container direction={"column"} className={classes.contentHeaderRight}>
                                <div className={classes.quickMenu}>Quick Menu</div>
                                {/*<a className={classes.orderHistory}>Order History</a>*/}
                                <Link href="#">Order History</Link>
                            </Grid>
                        </Grid>

                        <Collapse in={hide}>
                            <div className={classes.balanceDiv}>
                                <Typography className={classes.textBody}>Estimated Balance</Typography>
                                <div className={classes.balanceBody}>
                                    <Grid container direction="row"
                                          justify="flex-start"
                                          alignItems="center">
                                        <Grid>
                                            <Typography className={classes.balanceText}>0.0000000000</Typography>
                                        </Grid>
                                        <Grid >
                                            <Typography className={classes.textBody}>ETH&nbsp;≈&nbsp;€0.0000000000</Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Collapse>

                        <Grid style={{width: '100%',marginTop: 20}}>
                            {/*<div className={classes.searchTable}>*/}
                            {/*    <TopSearch/>*/}
                            {/*</div>*/}
                            <SearchPoolTable rows ={WalletPoolData.history}/>
                        </Grid>
                    </Grid>
                </div>

                <WalletProfileSecurity />
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
    )
}

PoolAccount.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    theme: PropTypes.object
};
const mapDispatchToProps = {
    VerifyInfo
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.auth.user_id,
    verifyInfo: state.wallet.verifyInfo
});

export default connect(mapStateToProps, mapDispatchToProps)(PoolAccount);

