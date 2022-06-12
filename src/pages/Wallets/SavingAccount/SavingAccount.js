import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Button,
    Grid,
    useMediaQuery,
    Divider,
    Link,
    makeStyles,
    Tabs,
    Tab,
    Typography,
    Box
} from '@material-ui/core';
import SavingAccountDiv from './SavingAccount.style';
import WalletLeftBar from "../../../components/Wallets/WalletBars/WalletLeftBar";
import WalletTopbar from "../../../components/Wallets/WalletBars/WalletTopBar";
import WalletProfileSecurity from "../../../components/Wallets/WalletBars/WalletRightBar";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import jsonData from '../../../resources/wallet.json';
import PropTypes from 'prop-types';
import TabSaving from "./TabSaving";
import { WalletTabs , WalletTab } from "../../../components/Wallets/SavingAccount/WalletTabs";
import TradingViewWidget from "react-tradingview-widget";
import TabPanel from "../../../components/Wallets/ExchangeAccount/Withdraw/TabPanel";
import styles from './SavingAccount.style';
import PoolAccount from "../PoolAccount/PoolAccount";
import SearchPoolTable from "../../../components/Wallets/PoolAccount/SearchPoolTable";
import WalletPoolData from "../../../resources/WalletPoolData.json";
import {VerifyInfo} from "../../../redux/actions/wallet"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';


const SavingAccount = (props) => {
    const { theme,selectLanding, isAuthenticated ,user_id,verifyInfo } = props;
    const [value, setValue] = React.useState(0);
    let history = useHistory();
    const classes = styles(theme);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
            if(verifyInfo["phone_verified_at"] == null ||verifyInfo["saving_paid_at"] == null){
                setFuturesAlertContent('You need to pass Phone verification and pay $20 to activate this account .')
                setFuturesAlert(true);
            } else{
                setFuturesAlert(false);
            }
        }
    },[verifyInfo]);

    return (
        <div>
            <WalletTopbar name="Savings Account"/>
            <div className={classes.body}>
                <WalletLeftBar name="Savings Account" />

                <div className={classes.body}>
                    <Grid direction={"column"} className={classes.width100}>
                        <Grid direction={"row"} alignItems={"center"} className={classes.contentHeaderLeft}>
                            <Grid direction={"row"} alignItems={"center"} className={classes.contentHeaderLeft}>
                                <div className={classes.pool}>Savings</div>
                                <Button size={"small"} className={classes.hideBalance}><VisibilityOffIcon className={classes.hideIcon} />Hide Balance</Button>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid direction={"column"} className={classes.contentHeaderRight}>
                                <div className={classes.quickMenu}>Quick action</div>
                                <Link href="#" className={classes.headerLinks}>Products</Link>
                                <Link href="#" className={classes.headerLinks}>History</Link>
                                <Link href="#" className={classes.headerLinks}>Staking Products</Link>
                                <Link href="#" className={classes.headerLinks}>Staking History</Link>
                            </Grid>
                        </Grid>

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

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

SavingAccount.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
const mapDispatchToProps = {
    VerifyInfo
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.auth.user_id,
    verifyInfo: state.wallet.verifyInfo
});

export default connect(mapStateToProps, mapDispatchToProps)(SavingAccount);