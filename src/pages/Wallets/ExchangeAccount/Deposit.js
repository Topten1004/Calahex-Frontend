import React, {useEffect} from "react";
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import WalletTopbar from "../../../components/Wallets/WalletBars/WalletTopBar";
import WalletLeftBar from "../../../components/Wallets/WalletBars/WalletLeftBar";
import WalletProfileSecurity from "../../../components/Wallets/WalletBars/WalletRightBar";
import Typography from "@material-ui/core/Typography";
import {AntTab, AntTabs} from "../../../components/Wallets/ExchangeAccount/Withdraw/AntTabs";
import TabPanel from "../../../components/TabPanel";
import WithdrawCrypto from "../../../components/Wallets/ExchangeAccount/Withdraw/WithdrawCrypto";
import DepositFiat from "../../../components/Wallets/ExchangeAccount/Deposit/DepositFiat";
import DepositCryto from "../../../components/Wallets/ExchangeAccount/Deposit/DepositCryto";
import jsonData from "../../../resources/depositcrypto.json";
import CryptoSubmit from "../../../components/Wallets/ExchangeAccount/Withdraw/CryptoSubmit";
import {useLocation} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    futureBody: {
        display: "flex"
    },
    bodyHeader: {
        padding: '0px 0px 0px 10px',
        borderBottom: '1px solid black',
    },
    spotName: {
        margin: 0,
        fontSize: 14
    },
    mainBody: {
        padding: 15,
        width: "-webkit-fill-available",
        height: 'calc(100vh - 50px)',
        overflowY: 'auto',
    },
    withdrawText: {
        fontWeight: 'bold',
        fontSize: 16,
        margin: '0px 0px 5px 0px'
    }
}));


const Deposit = (props) => {

    const classes = useStyles();

    const {selectLanding, isAuthenticated} = props;
    // const [value, setValue] = React.useState(0);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const search = useLocation().search;

    useEffect(()=>{
        var tab = new URLSearchParams(search).get('tab');
        console.log(tab)
        if(tab!=null)
            setValue(parseInt(tab))
    })
                

    useEffect(() => {
        selectLanding();
    }, [selectLanding]);

    useEffect(() => {
        console.log(isAuthenticated)
    }, [isAuthenticated])

    return (
        <div className={classes.root}>
            <WalletTopbar name="Deposit"/>
            <div className={classes.futureBody}>
                <WalletLeftBar name="Deposit"/>
                <div className={classes.mainBody}>
                    <div className={classes.bodyHeader}>
                        <div>
                            <Typography className={classes.spotName}>Exchange&nbsp;&nbsp;>&nbsp;&nbsp;Deposit</Typography>
                        </div>
                        <Typography className={classes.withdrawText}>Deposit</Typography>
                    </div>
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                        <AntTab label="Crypto"/>
                        <AntTab label="Fiat"/>
                    </AntTabs>
                    <TabPanel value={value} index={0}>
                        <DepositCryto coin = {jsonData.coin} btcaddress = {jsonData.btcaddress}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <DepositFiat/>
                    </TabPanel>
                </div>
                <WalletProfileSecurity/>
            </div>
        </div>
    );
}

Deposit.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
