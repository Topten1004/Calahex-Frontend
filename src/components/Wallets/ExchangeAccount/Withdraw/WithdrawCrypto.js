import React, { useContext, useEffect} from "react";
import PropTypes from "prop-types";
import {
    withStyles,
    withWidth,
    Button, TextField, InputLabel, Select, MenuItem, FormControl,
} from "@material-ui/core";
import { LanguageContext } from '../../../../utils/Language';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import CryptoSubmit from "./CryptoSubmit";
import Box from "@material-ui/core/Box";
import CryptoBalance from "./CryptoBalance";
import HistoryTable from "../HistoryTable";
import {connect} from 'react-redux';
import jsonData from "../../../../resources/withdrawcrypto.json";
import {ExchangeWithdrawHistory, ExchangeWithdrawCancelHistory} from "../../../../redux/actions/wallet"
const styles = theme => ({
    root: {
        margin: 0,
    },
    balanceTextBody: {
        float: 'right',
        display: 'flex'
    },
    textBody: {
        color:  theme.palette.primary.footer,
        fontSize: 14,
        paddingLeft: 20
    },
    bottomSubmit: {
        display: 'flex',

    },
    description: {
        backgroundColor: '#ccf2ff',
        borderRadius: 10,
        marginTop: 30,
        padding: 20
    }
});

var myInterval;

function WithdrawCrypto(props) {
    const {
        classes,
        user_id,
        exchangeWithdrawHistory,
        balance
    } = props;

    const { dictionary } = useContext(LanguageContext);
    const [loading, setLoading] = React.useState(false);
    const [coin, setCoin] = React.useState('ETH');

    // var currentCoin = 'ETH';



    const setCoinValue = (coin) => {
        setCoin(coin);
        // currentCoin = coin;
    }

    const historyCancel = async (id) => {
        await props.ExchangeWithdrawCancelHistory(user_id, id, coin);
    }
    


    const pending = (value) => {
        setLoading(value);
    }

    return (
        <>
            {!loading &&
            <div className={classes.root}>
                <Grid container>
                    <CryptoSubmit coin = {jsonData.coin} btcaddress = {jsonData.btcaddress} pending={pending} setCoinValue = {setCoinValue} coinValue = {coin} balance={balance}/>
                </Grid>
                <HistoryTable rows ={exchangeWithdrawHistory} historyCancel = {historyCancel} name = 'Recent Withdrawal History'/>
            </div>}
            {loading &&
            <div style={{textAlign:'center', marginTop:150, marginLeft:'15vw'}}>
                <img src={require('../../../../assets/loading.gif')} style={{width:200}}/>
            </div>
            }
        </>
    );
}
const mapStateToProps = state => ({
    user_id: state.auth.user_id,
    exchangeWithdrawHistory: state.wallet.exchangeWithdrawHistory,
    balance:  state.wallet.balance
});

const mapDispatchToProps = {
    ExchangeWithdrawHistory,ExchangeWithdrawCancelHistory
};

WithdrawCrypto.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withWidth()(
    withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(WithdrawCrypto))
);
