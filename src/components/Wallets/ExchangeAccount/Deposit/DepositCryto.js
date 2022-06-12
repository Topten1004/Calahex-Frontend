import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
    withStyles,
    withWidth,
    Button, TextField, InputLabel, Select, MenuItem, FormControl,
    CircularProgress
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import { DialogTitle, DialogActions, DialogContent } from "../../Dialog";
import { connect } from 'react-redux';
import { LanguageContext } from '../../../../utils/Language';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import CryptoSubmit from "../Withdraw/CryptoSubmit";
import Box from "@material-ui/core/Box";
import CryptoBalance from "../Withdraw/CryptoBalance";
import HistoryTable from "../HistoryTable";
import jsonData from "../../../../resources/depositcrypto.json";
import BtcImage from "../../../../assets/btc.png";
import Lamp from "../../../../assets/lamp.png";
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { AccountInfo, GetOrder, ExchangeDepositHistory, CreatePayment, GetPaymentResult, GetLimit, ExchangeWalletInfo, GetPaymentResultMail, ExchangeDepositCancelHistory } from "../../../../redux/actions/wallet"

const styles = theme => ({
    root: {
        margin: 0,
    },
    balanceTextBody: {
        float: 'right',
        display: 'flex'
    },
    textBody: {
        color: theme.palette.primary.footer,
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
    },
    btcImage: {
        width: 15,
        height: 15
    },
    btcPrefix: {
        display: 'flex',
        alignItems: 'center'
    },
    coinPrefix: {
        marginLeft: 5,
        fontWeight: 600
    },
    tradeList: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        fontSize: '14px'
    },
    tips: {
        display: 'flex'
    },
    tipsLetter: {
        margin: '7px'
    },
    BtcAddressBox: {
        // width: 'fit-content',
        border: 'solid 0px gray',
        boxShadow: '0px 0px 16px 0px #888888',
        marginTop: '20px',
        borderRadius: '8px'
    },
    BtcAddress: {
        padding: '1%'
    },
    selectMarginBottom: {
        marginBottom: 10
    },
    BtcAddressTop: {
        padding: '3%'
    },
    BtcAddressHeader: {
        backgroundColor: '#c6c6c6',
        padding: '2.5%',
        display: 'flex'
    },
    BtcAddressHeaderTitleLeft: {
        margin: "3px 9px",
        borderBottom: 'solid #055da6'
    },
    BtcAddressHeaderTitle: {
        margin: "3px 9px"
    },
    BtcAddressFooter: {
        backgroundColor: '#ccf2ff',
        padding: '2.5%',
    },
    BtcAddressBottom: {
        height: "10px"
    },
    BtcAddressBody: {
        height: '170px'
    },
    BtcAddressBodyCenter: {
        textAlign: 'center'
    },
    BtcAddressHeaderTitleFirst: {
        textAlign: 'center'
    },
    BtcAddressHeaderTitleSecond: {
        margin: "10% 0 3% 0",
        fontSize: '13px',
        textAlign: 'center'
    },
    iconName: {
        width: '5%',
        marginLeft: '10px'
    }


});
const defaultProps = {
    bgcolor: 'gray',
    borderColor: '#055da6',
    m: 0.5,
    border: 2,
    style: { width: 10, height: 10, marginTop: 7 },
};


function outFunc() {
    var tooltip = document.getElementById("myTooltip");

}

let myInterval, myInterval1;
let pay_id;

function DepositCryto(props) {
    const {
        classes, user_id, orderId, exchangeDepositHistory, paymentInfo, paymentResult, limit, exchangeWalletInfo
    } = props;

    const search = useLocation().search;

    const { dictionary } = useContext(LanguageContext);
    const [selected, setSelected] = React.useState(0);
    const [coinValue, setCoin] = React.useState(props.coin[selected].key);
    const [coinAddress, setCoinAddress] = React.useState(props.coin[selected].address);
    const [coinAddressTitle, setCoinAddressTitle] = React.useState(props.coin[selected].title);
    const [coinAddressContent, setCoinAddressContent] = React.useState(props.coin[selected].content);
    const [transferValue, setTransfer] = React.useState(props.coin[selected].key);
    const [currentPaymentId, setCurrentPaymentId] = React.useState(0);
    const [activeModalOpen, setActiveModalOpen] = React.useState(false);

    const [totalBalance, setTotalBalance] = React.useState(0);
    const [orderBalance, setOrderBalance] = React.useState(0);
    const [availBalance, setAvailBalance] = React.useState(0);

    const history = useHistory();

    const handleActiveModalOpen = () => {
        setActiveModalOpen(true);
    };
    const handleActiveModalClose = () => {
        if (!window.confirm("Please click ok to cancel this deposit request.")) return;
        props.ExchangeDepositCancelHistory(user_id, currentPaymentId);
        clearInterval(myInterval);
        setActiveModalOpen(false);
    };

    const closeDeposit = () => {
        if (!window.confirm("Please click ok to cancel this deposit request.")) return;
        props.ExchangeDepositCancelHistory(user_id, currentPaymentId);
        clearInterval(myInterval);
        setActiveModalOpen(false);
    }

    useEffect(() => {
        var token = new URLSearchParams(search).get('token');
        var selected1 = 0, index = 0;

        console.log("token=" + token)
        jsonData.coin.forEach(item => {
            // console.log(item.key)
            if (item.key == token)
                selected1 = index
            index++;
        })
        console.log(selected1)
        setSelected(selected1);
        setCoin(props.coin[selected1].key)
        setCoinAddress(props.coin[selected1].address)
        setCoinAddressTitle(props.coin[selected1].title)
        setCoinAddressContent(props.coin[selected1].content)
        setTransfer(props.coin[selected1].key)

        props.GetOrder();
        props.ExchangeWalletInfo(user_id)
        props.ExchangeDepositHistory(user_id, 'crypto');
        getResult1();

        return () => {
            console.log("Unmount - deposit")
            clearInterval(myInterval);
            clearTimeout(myInterval1);
        }

    }, []);

    function getResult1() {
        myInterval1 = setTimeout(() => {
            props.ExchangeWalletInfo(user_id)
            props.ExchangeDepositHistory(user_id, 'crypto');
            getResult1();
        }, 5000);
    }

    const deposit = async () => {
        var copyText = document.getElementById("myInput").value;
        if (parseFloat(copyText) > 0) {
            var limit = await props.GetLimit(coinValue);
            if (parseFloat(copyText) < parseFloat(limit)) {
                alert("Please input at least " + limit + coinValue + ".");
                return;
            }
            handleActiveModalOpen();
            var res = await props.CreatePayment(user_id, 'deposit_crypto_' + orderId, coinValue != 'USDT' ? coinValue : 'USDTERC20', copyText);
            await props.ExchangeWalletInfo(user_id);
            props.ExchangeDepositHistory(user_id, 'crypto');
            setCurrentPaymentId(res.payment_id);
            pay_id = res.payment_id;
            console.log("--##--" + res.payment_id)
            // await props.GetPaymentResultMail(pay_id, copyText, coinValue);
            // getResult(res.payment_id);
            myInterval = setInterval(async () => {
                console.log("---" + pay_id)
                var res = await props.GetPaymentResult(pay_id);
                if (res == 'done') {
                    await props.GetPaymentResultMail(pay_id, copyText, coinValue);
                    alert(coinValue + ' payment is done!');
                    clearInterval(myInterval);
                    history.push('/wallet/exchange-account/wallet');
                }
            }, 3000)
        }
        else
            alert("Please input the amount correctly!");
    }

    // function getResult(payment_id){
    //     if(paymentInfo){
    //         myInterval = setTimeout(async()=>{
    //             var res = await props.GetPaymentResult(payment_id);
    //             if(res == 'pending')
    //                 getResult(payment_id);
    //             if(res == 'done'){
    //                 alert(coinValue+' payment is done!');
    //                 history.push('/wallet/exchange-account/wallet');
    //             }
    //         }, 2000)
    //     }
    // }


    const coinHandleChange = async (event) => {
        await props.ExchangeWalletInfo(user_id)
        if (exchangeWalletInfo) {
            console.log("here")
            exchangeWalletInfo.forEach(info => {
                if (info.coin == coinValue) {
                    setTotalBalance(Number(parseFloat(info.available) + parseFloat(info.locked_deposit)).toFixed(3));
                    setAvailBalance(Number(info.available).toFixed(3));
                    setOrderBalance(Number(info.locked_deposit).toFixed(3));
                }
            })
        }

        setCoin(event.target.value);
        var index = 0, selected1 = 0;
        jsonData.coin.forEach(item => {
            // console.log(item.key)
            if (item.key == event.target.value)
                selected1 = index
            index++;
        })
        setCoin(props.coin[selected1].key)
        setCoinAddress(props.coin[selected1].address);
        setCoinAddressTitle(props.coin[selected1].title);
        setCoinAddressContent(props.coin[selected1].content);
    };
    const transferHandleChange = (event) => {
        setTransfer(event.target.value);
    };

    const historyCancel = async (payment_id) => {
        await props.ExchangeDepositCancelHistory(user_id, payment_id);
        if (currentPaymentId == payment_id) {
            clearInterval(myInterval);
            setActiveModalOpen(false);
        }
    }

    useEffect(() => {
        setActiveModalOpen(false);
    }, [props.exchangeDepositHistory])
    useEffect(() => {
        if (exchangeWalletInfo) {
            console.log("here")
            exchangeWalletInfo.forEach(info => {
                if (info.coin == coinValue) {
                    setTotalBalance(Number(parseFloat(info.available) + parseFloat(info.locked_deposit)).toFixed(3));
                    setAvailBalance(Number(info.available).toFixed(3));
                    setOrderBalance(Number(info.locked_deposit).toFixed(3));
                }
            })
        }
    }, [exchangeWalletInfo])

    return (
        <div className={classes.root}>

            <Grid container >
                <Grid item xs={12} sm={6} className={classes.BtcAddress}>
                    <Grid container className={classes.selectMarginBottom} item xs={12} sm={6}>
                        <Typography className={classes.topTextBody}>Coin</Typography>
                        <FormControl variant="outlined" size="small" fullWidth className={classes.submitTextField}>
                            <InputLabel id="coin-select-outlined-label" size="small" />
                            <Select
                                labelId="coin-select-outlined-label"
                                id="coin-simple-select-outlined"
                                size="small"
                                onChange={coinHandleChange}
                                value={coinValue}
                                // startAdornment = {<InputAdornment position="start"><div className={classes.btcPrefix}>
                                //     <Typography className={classes.coinPrefix}>{coinValue}</Typography>
                                // </div>
                                // </InputAdornment>}
                                fullWidth>
                                {
                                    props.coin.map((coincell, index) => (
                                        <MenuItem value={coincell.key} key={index}>{coincell.key}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <CryptoBalance total={totalBalance} order={orderBalance} available={availBalance} coin={coinValue} />
                    <div className={classes.description}>
                        <div className={classes.tips}>
                            <img src={Lamp} height={30} width={30} />
                            <h3 className={classes.tipsLetter}>Tips:</h3>
                        </div>
                        <div className={classes.bottomSubmit}>
                            <div><Box borderRadius="50%" {...defaultProps} /></div>
                            <Typography className={classes.descriptionText}>If you have deposited, please pay attention to the text messages, site letters and emails we send to you.</Typography>
                        </div>
                        <div className={classes.bottomSubmit}>
                            <div><Box borderRadius="50%" {...defaultProps} /></div>
                            <Typography className={classes.descriptionText}>Coins will be deposited after 1 network confirmations</Typography>
                        </div>
                        <div className={classes.bottomSubmit}>
                            <div><Box borderRadius="50%" {...defaultProps} /></div>
                            <Typography className={classes.descriptionText}>Until 2 confirmations are made, an equivalent amount of your assets will be temporarily unavailable for withdrawals.</Typography>
                        </div>
                    </div>
                    {/*<h3>Go to Trade:</h3>*/}
                    {/*<div>*/}
                    {/*    <div className={classes.tradeList}>*/}
                    {/*        <a href={""}><span>BTC/AUD</span></a>*/}
                    {/*        <a href={""}><span>BTC/BIDR</span></a>*/}
                    {/*        <a href={""}><span>BTC/BKRW</span></a>*/}
                    {/*        <a href={""}><span>BTC/BUSD</span></a>*/}
                    {/*        <a href={""}><span>BTC/EUR</span></a>*/}
                    {/*        <a href={""}><span>BTC/GBP</span></a>*/}
                    {/*        <a href={""}><span>BTC/IDRT</span></a>*/}
                    {/*        <a href={""}><span>BTC/NGN</span></a>*/}
                    {/*    </div>*/}
                    {/*    <div className={classes.tradeList}>*/}
                    {/*        <a href={""}><span>BTC/PAX</span></a>*/}
                    {/*        <a href={""}><span>BTC/RUB</span></a>*/}
                    {/*        <a href={""}><span>BTC/TRY</span></a>*/}
                    {/*        <a href={""}><span>BTC/TUSD</span></a>*/}
                    {/*        <a href={""}><span>BTC/UAH</span></a>*/}
                    {/*        <a href={""}><span>BTC/USDC</span></a>*/}
                    {/*        <a href={""}><span>BTC/USDT</span></a>*/}
                    {/*        <a href={""}><span>BTC/ZAR</span></a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </Grid>
                <Grid item xs={12} sm={6} className={classes.BtcAddress} style={{ paddingTop: 73 }}>
                    <Grid item={12} className={classes.BtcAddressBox}>
                        <Grid item={12} className={classes.BtcAddressTop}>
                            <typograph> Desposit network</typograph>
                        </Grid>
                        <Grid item={12} className={classes.BtcAddressHeader}>
                            <h3 className={classes.BtcAddressHeaderTitleLeft}>{coinValue}</h3>
                        </Grid>
                        <Grid item={12} className={classes.BtcAddressBody}>
                            <Grid className={classes.BtcAddressBodyCenter}>
                                <input type="number" step="0.0001" placeholder="Please input amount" id="myInput" className={classes.BtcAddressHeaderTitleSecond} />
                                <br />
                                <Button
                                    variant="contained"
                                    color="default"
                                    onClick={deposit}
                                    className={classes.center}
                                    style={{ backgroundColor: '#337ab7', color: 'white' }}
                                >Deposit</Button>
                                {/* <a onClick={myFunction} onMouseOut={outFunc}>
                                    <FileCopyIcon id="myTooltip" className={classes.iconName}/>
                                </a> */}
                            </Grid>
                        </Grid>
                        {/* <Grid item={12} className={classes.BtcAddressFooter}>
                            <h3>{coinAddressTitle}</h3>
                            <typograph>{coinAddressContent}</typograph>
                        </Grid>
                        <Grid item={12} className={classes.BtcAddressBottom}>
                            <typograph> </typograph>
                        </Grid> */}
                        <Dialog fullWidth={true} onClose={handleActiveModalClose} aria-labelledby="customized-dialog-title" open={activeModalOpen} >
                            <DialogTitle id="customized-dialog-title" onClose={handleActiveModalClose}>
                                Deposit
                            </DialogTitle>
                            <DialogContent dividers>
                                <Typography gutterBottom>
                                    Amount : <strong>{paymentInfo.pay_amount ? paymentInfo.pay_amount : ''}</strong> {paymentInfo.pay_currency}
                                    <br /><br />
                                    <div style={{ textAlign: 'center' }}>
                                        {paymentInfo.pay_address ? <img src={"https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" + paymentInfo.pay_address} alt="Bitcoin QR Code Generator" border="0" /> : <img src="https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" border="0" />}
                                    </div>
                                    <br />
                                    Address : <strong>{paymentInfo.pay_address ? paymentInfo.pay_address : ''}</strong>
                                    <br /><br />
                                    Please send crypto into above address carefully.<br />
                                    {paymentInfo.pay_currency == 'USDT' && <strong>Send USDT on omni network.<br /></strong>}
                                    If you send incorrect amount or incorrect address, then you will lose your money!
                                    <br /><br />
                                    <strong>You need to wait until the payment is done.</strong>
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={closeDeposit} color="primary">
                                    Close Deposit
                                </Button>
                                <Button autoFocus onClick={handleActiveModalClose} color="primary">
                                    <CircularProgress
                                        className={props.classes.spinner}
                                        size={20}
                                        style={{ marginRight: 10 }}
                                    />
                                    Waiting
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
            </Grid>
            <HistoryTable rows={exchangeDepositHistory} name='Recent Deposit Crypto History' historyCancel={historyCancel} />

        </div>
    );
}

DepositCryto.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user_id: state.auth.user_id,
    orderId: state.wallet.orderId,
    paymentInfo: state.wallet.paymentInfo,
    paymentResult: state.wallet.paymentResult,
    exchangeDepositHistory: state.wallet.exchangeDepositHistory,
    exchangeWalletInfo: state.wallet.exchangeWalletInfo,
    limit: state.wallet.limit,
});

const mapDispatchToProps = {
    AccountInfo,
    GetOrder,
    ExchangeDepositHistory,
    CreatePayment,
    GetPaymentResult,
    GetLimit,
    ExchangeWalletInfo,
    ExchangeDepositCancelHistory,
    GetPaymentResultMail
};

export default withWidth()(
    withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(DepositCryto))
);
