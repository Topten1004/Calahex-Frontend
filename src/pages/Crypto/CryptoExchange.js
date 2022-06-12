import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TradingViewWidget from 'react-tradingview-widget';
import ClipLoader from "react-spinners/ClipLoader";
// import { Link } from "react-router-dom";
import clsx from 'clsx';
import {
    AppBar,
    Button,
    FormControl,
    Grid,
    Hidden,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Tooltip,
    useMediaQuery,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import SearchIcon from '@material-ui/icons/Search';
import { css } from "@emotion/core";
import {
    CryptoExchangePairList,
    CryptoExchangeOrderList,
    CryptoExchangeTradList,
    CryptoExchangePairInfo,
    CryptoExchangeLimitAmount,
    CryptoExchangeFeeAmount,
    CryptoExchangeBuyAmount,
    CryptoExchangeAddOrder,
    CryptoExchangeUserOrderList,
    CryptoExchangeUserTradeList,
    CryptoExchangeOrderClear,
    CryptoExchangeOrderCancel,
    CryptoExchange30Volume
} from '../../redux/actions/crypto';
import CryptoDiv, { BgTableRow } from "./CryptoExchange.style";

import PropTypes from "prop-types";
import TabPanel, { a11yProps } from "../../components/TabPanel";
import { StyledTabs, StyledTab } from "../../components/StyleTabs";
import { ButtonTab, ButtonTabs } from "../../components/buttontabs/StyleTabs";
import DepthChart from "../../components/chart/DepthChart";
import { Link } from "react-router-dom";
import Counter from "../../components/animations/background";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ImportantDevices } from "@material-ui/icons";
import Deposit from "../Wallets/ExchangeAccount/Deposit";
const override = css`
  display: block;
  margin: 150px auto;
  /* border-color: red; */
`;

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    formControl: {
        // margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        width: '100%'
    },
    topInfo: {
        marginTop: 45,
        padding: '10px',
    },
    eth_h: {
        margin: 0,
        marginTop:10,
        // textAlign: 'center',
        fontWeight: 500
    },
    eth_subp: {
        margin: 0,
        fontSize: 11,
        color: '#8fb5fc'
    },
    eth_p: {
        margin: 0,
        marginTop:10,
        // textAlign: 'center',
        fontSize: 11,
        color: '#8fb5fc'
    },
    menuitem: {
        fontSize: 11
    },
    xrpfilter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 4
    },
    star: {
        fontSize: 15
    },
    xrpSpan: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 11,
        cursor: 'pointer',
        padding: '3px 10px'
    },
    active: {
        background: "#D7EAEA",
    },
    xrpContent: {
        padding: '3px 15px 5px',
        position: 'relative',
        borderTop: '1px solid #aaa',
        borderBottom: '1px solid #aaa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    customInput: {
        border: 'none',
        paddingLeft: 5,
        maxWidth: '95%',
        minWidth: 50
    },
    searchIcon: {
        fontSize: '15px'
    },
    tables: {
        fontSize: 10
    },
    table: {
        width: '100%'
    },
    w100: {
        width: '100%'
    },
    fs11: {
        fontSize: 11
    },
    tableContainer: {
        maxHeight: 'calc(100vh - 180px)'
    },
    firstFieldMargin: {
        marginBottom: theme.spacing(2),
    }
}));

let timer1, timer2, timer3;

const CryptoExchange = (props) => {
    let {user_id, selectLanding, isAuthenticated, cryptoLists, cryptoOrderLists, cryptoTradLists,exchangeWalletState,cryptoExchangePairInfo,    cryptoExchangeLimitAmount,cryptoExchangeFeeAmount,cryptoExchangeUserTradeList,cryptoExchangeUserOrderList,cryptoExchangeResult, cryptoExchange30Volume, cryptoExchangeFee } = props;
    const classes = useStyles();
    const scrollBottom = useRef(null);
    // const [anchorElUSD, setAnchorElUSD] = useState(null);
    // const [anchorElALTS, setAnchorElALTS] = useState(null);
    // const [anchorElINNOV, setAnchorElINNOV] = useState(null);
    const match1 = useMediaQuery('(min-width:1400px)');
    const match2 = useMediaQuery('(min-width:1050px)');
    const isXs = useMediaQuery('(min-width:450px)');

    const [show, setShow] = useState(3);
    const [selectRow, setSelectRow] = useState({});
    // const openUSD = Boolean(anchorElUSD);
    // const openALTS = Boolean(anchorElALTS);
    // const openINNOV = Boolean(anchorElINNOV);
    const [value, setValue] = useState(0);
    const [adminPanLogin, setAdminPanLogin] = useState(0);
    const [tradingViewTab, setTradingViewTab] = useState(0);
    const [size, setSize] = useState(8);
    const [display, setDisplay] = useState('volume');
    const [search1, setSearch1] = useState('');
    const [hiddenC, setHiddenC] = useState(['sider1']);
    const [name, setName] = useState('all');
    const [buyOrderType, setBuyOrderType] = useState('limit');
    const [sellOrderType, setSellOrderType] = useState('limit');
    
    const [exchangePrice, setExchangePrice] = useState("");
    const [exchangeAmount, setExchangeAmount] = useState("");
    const [exchangeTotal, setExchangeTotal] = useState("");
    const [buyButtonDisable, setBuyButtonDisable] = useState(true);
    const [sellButtonDisable, setSellButtonDisable] = useState(true);
    const [exchangeBuyAvailable, setExchangeBuyAvailable] = useState("");
    const [exchangeSellAvailable, setExchangeSellAvailable] = useState("");
    const [exchangeLimitAmount,setExchangeLimitAmount] = useState(0);
    const [takerFee, setTakerFee] = useState(0.12);
    const [makerFee, setMakerFee] = useState(0.12);
    const [buyAlert, setBuyAlert] = useState(false);
    const [buyAlertContent, setBuyAlertContent] = useState("");
    const [orderAmount,setOrderAmount] = useState(0);
    const [orderTotal,setOrderTotal] = useState(0);
    
    const [sellExchangePrice, setSellExchangePrice] = useState("");
    const [sellExchangeAmount, setSellExchangeAmount] = useState("");
    const [sellExchangeTotal, setSellExchangeTotal] = useState("");
    // const [exchangeLimitAmount,setExchangeLimitAmount] = useState(0);
    // const [takerFee, setTakerFee] = useState(0.12);
    // const [makerFee, setMakerFee] = useState(0.12);
    const [sellAlert, setSellAlert] = useState(false);
    const [sellAlertContent, setSellAlertContent] = useState("");
    const [sellOrderAmount,setSellOrderAmount] = useState(0);
    const [sellOrderTotal, setSellOrderTotal] = useState(0);
    const [customPriceState,setCustomPriceState] = useState(0);
    const [sellCustomPriceState,setSellCustomPriceState] = useState(0);

    const [pairDefault, setPairDefault] = useState("BTC_USDT");

    const [orderHistorySelected, SetOrderHistorySelected] = useState([]);
    const [tradeHistorySelected, SetTradeHistorySelected] = useState([]);
    
    const [loading, setLoading] = React.useState(true);

    // const optionUSD = ['USDT', 'USDC', 'USDJ', 'DAI', 'PAX', 'BUSD'];
    // const optionALTS = ['ETH', 'BNB'];
    // const optionINNOV = ['LEVERAGE', 'DEFI', 'ASSESSMENT'];

    const orderHistorySelect = (id, checked) => {
        if(id == 0){
            if(checked == true){
                var newSelected = orderHistorySelected;
                cryptoExchangeUserOrderList.result.map((row, i) => {
                    newSelected[row.id] = true;
                })
                SetOrderHistorySelected(newSelected);
            }
            else{
                var newSelected = orderHistorySelected;
                cryptoExchangeUserOrderList.result.map((row, i) => {
                    newSelected[row.id] = false;
                })
                SetOrderHistorySelected(newSelected);
            }
        }
        else{
            var newSelected = orderHistorySelected;
            newSelected[id] = checked;
            SetOrderHistorySelected(newSelected);
        }
    }

    const clearSelectedOrderHistory = () => {
        cryptoExchangeUserOrderList.result.map((row, i) => {
            if(orderHistorySelected[row.id] == true){
                if(adminPanLogin == 0){
                    props.CryptoExchangeOrderClear(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin, row.id);
                }    
                else{
                    props.CryptoExchangeOrderClear(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin, row.id);
                }  
            }
        })          
    }

    const tradeHistorySelect = (id, checked) => {
        if(id == 0){
            if(checked == true){
                var newSelected = tradeHistorySelected;
                cryptoExchangeUserOrderList.result.map((row, i) => {
                    newSelected[row.id] = true;
                })
                SetTradeHistorySelected(newSelected);
            }
            else{
                var newSelected = tradeHistorySelected;
                cryptoExchangeUserOrderList.result.map((row, i) => {
                    newSelected[row.id] = false;
                })
                SetTradeHistorySelected(newSelected);
            }
        }
        else{
            var newSelected = tradeHistorySelected;
            newSelected[id] = checked;
            SetTradeHistorySelected(newSelected);
        }
    }

    const clearSelectedTradeHistory = () => {
        cryptoExchangeUserOrderList.result.map((row, i) => {
            if(tradeHistorySelected[row.id] == true){
                if(adminPanLogin == 0){
                    props.CryptoExchangeOrderClear(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin, row.id);
                }    
                else{
                    props.CryptoExchangeOrderClear(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin, row.id);
                }  
            }
        })          
    }

    const handleBuyOrderTable = (price,amount,total) => {
        setBuyOrderType('limit');
        setExchangePrice(price);
        setOrderAmount(amount);
        setOrderTotal(total);
        console.log(0)
        setAdminPanLogin(0);
        console.log("buy");
        setCustomPriceState(0);
    }

    const handleSellOrderTable = (price, amount,total) => {
        setSellOrderType('limit');
        setSellExchangePrice(price);
        setSellOrderAmount(amount);
        setSellOrderTotal(total);
        console.log(1)
        setAdminPanLogin(1);
        setSellCustomPriceState(0);
    }

    const handleExchangePrice = (e) => {
        setExchangePrice(e.target.value);
        setExchangeAmount("");
        setExchangeTotal("");
        setCustomPriceState(1);
    }

    const handleSellExchangePrice = (e) => {
        setSellExchangePrice(e.target.value);
        setSellExchangeAmount("");
        setSellExchangeTotal("");
        setSellCustomPriceState(1);
    }

    const handleExchangeAmount =(e) => {
        if(exchangePrice == "" || e.target.value == ""){
            setExchangeAmount("");
            setExchangeTotal("");
            alert("Please input order price.")
            document.getElementById('outlined-basic-buy').focus();
        } 
        else {
            setExchangeAmount(e.target.value);
            setExchangeTotal(e.target.value*1/(exchangePrice));
         }
    }

    const handleExchangeTotal = (e) => {
        if(exchangePrice =="" || e.target.value == ""){
            setExchangeAmount("");
            setExchangeTotal("");
            alert("Please input order price.")
            document.getElementById('outlined-basic-buy').focus();
        }
        else {
            setExchangeTotal(e.target.value);
            setExchangeAmount(e.target.value*exchangePrice);
        }
    }

    const handleBuy =async () => {
        // var limitAmount = cryptoExchangeLimitAmount[selectRow.name.split('_')[1]];
        console.log(selectRow.name.split('_')[1]);

        if(isNaN(exchangePrice)){
            setBuyAlert(true);
            setBuyAlertContent("Price must be number.");
            document.getElementById('outlined-basic-buy').focus();
        }
        else if(exchangeTotal == ""){
            setBuyAlert(true);
            setBuyAlertContent("Amount is empty.");
            document.getElementById('outlined-basic-buy-amount').focus();
        }
        else if(exchangeAmount > exchangeBuyAvailable) {
            setBuyAlert(true);
            setBuyAlertContent("No sufficient funds.");
            document.getElementById('outlined-basic-buy-amount').focus();
        }
        else if(exchangeTotal<=0){
            setBuyAlert(true);
            setBuyAlertContent("Amount must be a positive number.");
            document.getElementById('outlined-basic-buy-amount').focus();
        } 
        else if(
            (selectRow.name.split('_')[1] == 'USDT' && exchangeAmount < 25) || 
            (selectRow.name.split('_')[1] == 'ETH' && exchangeAmount < 0.02 ) ||
            (selectRow.name.split('_')[1] == 'BTC' && exchangeAmount < 0.00010)){
            setBuyAlert(true);
            if(selectRow.name.split('_')[1] == 'USDT')  setBuyAlertContent("Amount must be at least 25 USDT.");
            if(selectRow.name.split('_')[1] == 'ETH')   setBuyAlertContent("Amount must be at least 0.02 ETH.");
            if(selectRow.name.split('_')[1] == 'BTC')   setBuyAlertContent("Amount must be at least 0.00010 BTC");
            document.getElementById('outlined-basic-buy-amount').focus();
        }
        else {
            if(!window.confirm("Your price is "+exchangePrice+". Please click ok to confirm."))  return;
            var toAmount = exchangeTotal * (1-cryptoExchangeFee/100);
            if(buyOrderType == 'market'){
                setBuyButtonDisable(true)
                await props.CryptoExchangeBuyAmount(toAmount,selectRow.name.split('_')[0],exchangeAmount,selectRow.name.split('_')[1],user_id);
                if(cryptoExchangeResult == 'No sufficient fund'){
                    setBuyAlert(true);
                    setBuyAlertContent("No sufficient funds.");
                    return;
                }
                // await props.CryptoExchangeLimitAmount(user_id);
                await props.CryptoExchangeAddOrder(toAmount,selectRow.name.split('_')[0],exchangeAmount,selectRow.name.split('_')[1],user_id,exchangePrice,exchangeTotal * (0.25/100),"buy",1, buyOrderType);
                await props.CryptoExchangeOrderList(selectRow.name, user_id);
                setBuyAlert(true);
                setBuyAlertContent("Buy " + toAmount + " " + selectRow.name.split('_')[0] + " Sell " + exchangeAmount + " " + selectRow.name.split('_')[1]);
                setBuyButtonDisable(false)
            }
            else{
                if(parseFloat(exchangePrice) < parseFloat(selectRow.price)){
                    toAmount = exchangeTotal * (1-0.25/100);
                    props.CryptoExchangeAddOrder(toAmount,selectRow.name.split('_')[0],exchangeAmount,selectRow.name.split('_')[1],user_id,exchangePrice,exchangeTotal * (0.25/100),"buy",0, buyOrderType);
                    // setBuyAlert(true);
                    // setBuyAlertContent("Your order price("+exchangePrice+") is bigger than market price("+selectRow.price+"), so this order will be executed when the market price is bigger than this order price.");
                }
                else{               
                    setBuyButtonDisable(true)
                    await props.CryptoExchangeBuyAmount(toAmount,selectRow.name.split('_')[0],exchangeAmount,selectRow.name.split('_')[1],user_id);
                    // await props.CryptoExchangeLimitAmount(user_id);
                    await props.CryptoExchangeAddOrder(toAmount,selectRow.name.split('_')[0],exchangeAmount,selectRow.name.split('_')[1],user_id,exchangePrice,exchangeTotal * (0.25/100),"buy",1, buyOrderType);
                    await props.CryptoExchangeOrderList(selectRow.name, user_id);
                    setBuyAlert(true);
                    setBuyAlertContent("Buy " + toAmount + " " + selectRow.name.split('_')[0] + " Sell " + exchangeAmount + " " + selectRow.name.split('_')[1]);
                    setBuyButtonDisable(false)
                }
            }
            setExchangeAmount('');
            setExchangeTotal('');
            props.CryptoExchangeUserOrderList(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin, selectRow.price);
            props.CryptoExchangeUserTradeList(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin);
        }
    }

    const handleBuyAlertClose =() => {
        setBuyAlert(false);
    }

    const handleSell =async () => {
        // var limitAmount = cryptoExchangeLimitAmount[selectRow.name.split('_')[0]];
        console.log(selectRow.name.split('_')[1]);

        if(isNaN(exchangePrice)){
            setBuyAlert(true);
            setBuyAlertContent("Price must be number.");
            document.getElementById('outlined-basic-sell').focus();
        }
        if(sellExchangeTotal == ""){
            setBuyAlert(true);
            setBuyAlertContent("Amount is empty.");
            document.getElementById('outlined-basic-sell-total').focus();
        }
        else if(sellExchangeAmount > exchangeSellAvailable) {
            setSellAlert(true);
            setSellAlertContent("No sufficient funds");
            document.getElementById('outlined-basic-sell-total').focus();
        }
        else if(sellExchangeTotal<=0){
            setSellAlert(true);
            setSellAlertContent("Total must be a positive number");
            document.getElementById('outlined-basic-sell-total').focus();
        } 
        else if(
            (selectRow.name.split('_')[1] == 'USDT' && sellExchangeTotal < 25) || 
            (selectRow.name.split('_')[1] == 'ETH' && sellExchangeTotal < 0.02 ) ||
            (selectRow.name.split('_')[1] == 'BTC' && sellExchangeTotal < 0.00010)){
            setBuyAlert(true);
            if(selectRow.name.split('_')[1] == 'USDT')  setBuyAlertContent("Amount must be at least 25 USDT.");
            if(selectRow.name.split('_')[1] == 'ETH')   setBuyAlertContent("Amount must be at least 0.02 ETH.");
            if(selectRow.name.split('_')[1] == 'BTC')   setBuyAlertContent("Amount must be at least 0.00010 BTC");
            document.getElementById('outlined-basic-sell-total').focus();
        }
        else {
            if(!window.confirm("Your price is "+sellExchangePrice+". Please click ok to confirm."))  return;
            var toAmount = sellExchangeTotal * (1-cryptoExchangeFee/100);
            if(sellOrderType == 'market'){
                console.log(toAmount)
                console.log(sellExchangeTotal)
                setSellButtonDisable(true)
                await props.CryptoExchangeBuyAmount(toAmount,selectRow.name.split('_')[1],sellExchangeAmount,selectRow.name.split('_')[0],user_id);
                if(cryptoExchangeResult == 'No sufficient fund'){
                    setBuyAlert(true);
                    setBuyAlertContent("No sufficient funds.");
                    return;
                }
                // await props.CryptoExchangeLimitAmount(user_id);
                await props.CryptoExchangeAddOrder(sellExchangeAmount,selectRow.name.split('_')[1],toAmount,selectRow.name.split('_')[0],user_id,sellExchangePrice,sellExchangeTotal * (0.25/100),"sell",1, sellOrderType);
                await props.CryptoExchangeOrderList(selectRow.name, user_id);
                setSellAlert(true);                
                setSellAlertContent("Sell " + sellExchangeAmount + " " + selectRow.name.split('_')[0] + " Buy " + toAmount + " " + selectRow.name.split('_')[1]);
                setSellButtonDisable(false)
            }
            else{
                if(parseFloat(sellExchangePrice) > parseFloat(selectRow.price)){
                    toAmount = sellExchangeTotal * (1-0.25/100);
                    props.CryptoExchangeAddOrder(sellExchangeAmount,selectRow.name.split('_')[1],toAmount,selectRow.name.split('_')[0],user_id,sellExchangePrice,sellExchangeTotal * (0.25/100),"sell",0, sellOrderType);
                    // setSellAlert(true);                
                    // setBuyAlertContent("Your order price("+sellExchangePrice+") is bigger than market price("+selectRow.price+"), so this order will be executed when the market price is bigger than this order price.");
                }
                else{
                    console.log(toAmount)
                    console.log(sellExchangeTotal)
                    setSellButtonDisable(true)
                    await props.CryptoExchangeBuyAmount(toAmount,selectRow.name.split('_')[1],sellExchangeAmount,selectRow.name.split('_')[0],user_id);
                    // await props.CryptoExchangeLimitAmount(user_id);
                    await props.CryptoExchangeAddOrder(sellExchangeAmount,selectRow.name.split('_')[1],toAmount,selectRow.name.split('_')[0],user_id,sellExchangePrice,sellExchangeTotal * (0.25/100),"sell",1, sellOrderType);
                    await props.CryptoExchangeOrderList(selectRow.name, user_id);
                    setSellAlert(true);                
                    setSellAlertContent("Sell " + sellExchangeAmount + " " + selectRow.name.split('_')[0] + " Buy " + toAmount + " " + selectRow.name.split('_')[1]);
                    setSellButtonDisable(false)
                }
            }
            setSellExchangeAmount('');
            setSellExchangeTotal('');
            props.CryptoExchangeUserOrderList(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin, selectRow.price);
            props.CryptoExchangeUserTradeList(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin);
        }
    }

    const Depositlink = () => {
        if(selectRow.name){
            var token = selectRow.name.split('_')[0]
            if(token !='BTC' && token != 'ETH' && token != 'USDT' && token != 'SXP' && token != 'REPV2' && token != 'YFI' && token != 'UNI' && token != 'LINK')
                return;
            window.location.href="/wallet/exchange-account/deposit?token="+token;
        }
        else
        window.location.href="/wallet/exchange-account/deposit";
    }

    const Transferlink = () => {
        window.location.href="/wallet/transfer-balances";
    }

    const handleSellAlertClose =() => {
        setSellAlert(false);
    }

    const handleSellExchangeAmount =(e) => {
        if(sellExchangePrice == "" || e.target.value == ""){
            setSellExchangeAmount("");
            setSellExchangeTotal("");
            alert("Please input order price.")
            document.getElementById('outlined-basic-sell').focus();
        } 
        else {
            setSellExchangeAmount(e.target.value);
            setSellExchangeTotal(e.target.value*sellExchangePrice);
         }
    }

    const handleSellExchangeTotal = (e) => {
        if(exchangePrice =="" || e.target.value == ""){
            setSellExchangeAmount("");
            setSellExchangeTotal("");
            alert("Please input order price.")
            document.getElementById('outlined-basic-sell').focus();
        }
        else {
            setSellExchangeTotal(e.target.value);
            setSellExchangeAmount(e.target.value/sellExchangePrice);
        }
    }

    const handleLimitAmount = (e) =>{
        // var limitAmount = cryptoExchangeLimitAmount[selectRow.name.split('_')[1]];
        if(exchangePrice != "") {
            var limitAmount = exchangeBuyAvailable;
            setExchangeAmount(e*limitAmount/100);
            setExchangeTotal(e*limitAmount/(100*exchangePrice));  
        } else {
            setExchangeAmount("");
            setExchangeTotal("");
            alert("Please input order price.")
            document.getElementById('outlined-basic-buy').focus();  
        }
    }

    const handleSellLimitAmount = (e) =>{

        // var limitAmount = cryptoExchangeLimitAmount[selectRow.name.split('_')[0]];
        if(sellExchangePrice != "") {
            var limitAmount = exchangeSellAvailable;
            setSellExchangeAmount(e*limitAmount/100);
            setSellExchangeTotal(e*limitAmount/100*sellExchangePrice);    
        } else {
            setSellExchangeAmount("");
            setSellExchangeTotal("");
            alert("Please input order price.")
            document.getElementById('outlined-basic-sell').focus();
        }
    }

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };
    const handleTradingTabChange = (e, newValue) => {
        setTradingViewTab(newValue);
    };

    const handleBuySell = (e, newValue) => {
        console.log(newValue)
        if(newValue != adminPanLogin){
            setBuyOrderType('limit');
            setSellOrderType('limit');
            setExchangePrice("");
            setExchangeAmount("");
            setExchangeTotal("");
            setCustomPriceState(1);
            setSellExchangePrice("");
            setSellExchangeAmount("");
            setSellExchangeTotal("");
            setSellCustomPriceState(1);            
        }
        setAdminPanLogin(newValue)        
    }

    const handleBuyOrderType = (e) => {
        setBuyOrderType(e.target.value);
        // if(e.target.value == 'limit')
        //     setExchangePrice(cryptoOrderLists.ask_best?cryptoOrderLists.ask_best:"")
        if(e.target.value == 'market')
            setExchangePrice(selectRow.price)
    }

    const handleSellOrderType = (e) => {
        setSellOrderType(e.target.value);
        // if(e.target.value == 'limit')
        //     setSellExchangePrice(cryptoOrderLists.bid_best?cryptoOrderLists.bid_best:"")
        if(e.target.value == 'market')
            setSellExchangePrice((parseFloat(selectRow.price)*0.999).toFixed(8))
    }

    useEffect(() => {
        console.log(tradingViewTab)
        props.CryptoExchangePairList(name);
        props.CryptoExchange30Volume(user_id);
        return () => {
            clearInterval(timer1);
            clearInterval(timer2);
            clearInterval(timer3);
        }
    }, []);

    useEffect(() => {
        selectLanding();
    }, [selectLanding]);

    useEffect(() => {
        
    }, [isAuthenticated]);
    useEffect(() => {
        
    }, [user_id]);

    useEffect(()=>{
        console.log(buyOrderType)
    }, [buyOrderType])

    useEffect(() => {
        clearInterval(timer1);
        clearInterval(timer2);
        // clearInterval(timer3);
        if (Object.keys(selectRow).length) {
            props.CryptoExchangeOrderList(selectRow.name, user_id);
            props.CryptoExchangeTradList(selectRow.name);
            timer1 = setInterval(() => {
                props.CryptoExchangePairList(name);
                props.CryptoExchangeOrderList(selectRow.name, user_id);
                props.CryptoExchangeTradList(selectRow.name);   
                props.CryptoExchangeLimitAmount(user_id);                 
            }, 30000);
            timer2 = setInterval(() => {
                if(adminPanLogin==0){
                    props.CryptoExchangeUserOrderList(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin, selectRow.price);
                    props.CryptoExchangeUserTradeList(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin);
                }                    
                else {
                    props.CryptoExchangeUserOrderList(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin, selectRow.price);
                    props.CryptoExchangeUserTradeList(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin);
                }
            }, 5000);
            // timer3 = setInterval(() => {
            //     props.CryptoExchangePairList(name);
            // }, 5000);
        }
    }, [selectRow, adminPanLogin, name]);

    useEffect(() => {
        if (match2 && scrollBottom.current) { 
            scrollBottom.current.scrollIntoView({ block: "end", behavior: "smooth" });
        }
        // if(buyOrderType == 'limit') setExchangePrice(cryptoOrderLists.ask_best?cryptoOrderLists.ask_best:"")
        // if(sellOrderType == 'limit')setSellExchangePrice(cryptoOrderLists.bid_best?(parseFloat(1/cryptoOrderLists.bid_best)*0.999).toFixed(8):"")
    }, [cryptoOrderLists.asks])
    
    useEffect(()=>{
        if(cryptoExchangeUserOrderList.fund){
            cryptoExchangeUserOrderList.fund.map((row, index)=>{
                var amount;
                if(row.order>=0)    amount = row.available;
                else                amount = row.total;
                if(index == 0 && !adminPanLogin)
                    setExchangeBuyAvailable(amount);
                if(index == 0 && adminPanLogin)
                    setExchangeSellAvailable(amount);
                if(index == 1 && !adminPanLogin)
                    setExchangeSellAvailable(amount);
                if(index == 1 && adminPanLogin)
                    setExchangeBuyAvailable(amount);
            })
            setBuyButtonDisable(false);
            setSellButtonDisable(false);
        }
    }, [cryptoExchangeUserOrderList.fund])

    useEffect(() => {
        var result;
        result = pairDefault;
        console.log("------"+result)

        console.log("here1")

        if (cryptoLists.length) {
            console.log("here2")
            setSelectRow({
                ...cryptoLists.filter(crypto => crypto.name === result)[0]
            });
            setLoading(false);
        }
        console.log("here"+result)
        console.log(cryptoLists.filter(crypto => crypto.name === result)[0])

        if(cryptoLists.length){
            console.log(cryptoLists.filter(crypto => crypto.name === result)[0].price)
            if(buyOrderType == 'market')
                setExchangePrice(cryptoLists.filter(crypto => crypto.name === result)[0].price)
            if(sellOrderType == 'market')
                setSellExchangePrice((parseFloat(cryptoLists.filter(crypto => crypto.name === result)[0].price)*0.999).toFixed(8))
        }

       
    }, [cryptoLists])

    useEffect(() => {
        props.CryptoExchangeLimitAmount(user_id);
    },[selectRow]);

    useEffect(() => {
        
        if(cryptoExchangeFeeAmount>=0 && cryptoExchangeFeeAmount <50000) {
            setTakerFee(0.12);
            setMakerFee(0.12);
        }
        else if(cryptoExchangeFeeAmount >= 50000 && cryptoExchangeFeeAmount < 1000000){
            setMakerFee(0.1);
            setTakerFee(0.12);
        }
        else if(cryptoExchangeFeeAmount >= 1000000 && cryptoExchangeFeeAmount < 10000000){
            setMakerFee(0.08);
            setTakerFee(0.1);
        } else {
            setMakerFee(0.05);
            setTakerFee(0.08);
        }
    },[cryptoExchangeFeeAmount]);

    useEffect(() => {
        props.CryptoExchangeFeeAmount(user_id);
    },[selectRow]);
   
    // useEffect(() => {
    //     if (Object.keys(selectRow).length) {
    //         if(adminPanLogin == 0)
    //             {props.CryptoExchangeUserOrderList(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin, selectRow.price);
    //             props.CryptoExchangeUserTradeList(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin);
    //         }    
    //         else{
    //             props.CryptoExchangeUserOrderList(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin, selectRow.price);
    //             props.CryptoExchangeUserTradeList(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin);
    //         } 
                
    //     }
    // },[selectRow]);


    useEffect(() => {
        if (Object.keys(selectRow).length) {
            if(adminPanLogin == 0){
                props.CryptoExchangeUserOrderList(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin, selectRow.price);
                props.CryptoExchangeUserTradeList(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin);
            }    
            else{
                props.CryptoExchangeUserOrderList(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin, selectRow.price);
                props.CryptoExchangeUserTradeList(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin);
            } 
        }
    },[adminPanLogin]);

      useEffect(() => {
        props.CryptoExchangePairInfo();
        // if(typeof(selectRow) != 'undefined')
        //     {
        //         setExchangePrice(parseFloat(selectRow.price));
        //         setSellExchangePrice((parseFloat(1/selectRow.price)*0.999).toFixed(8));
        //     }
        // else {
        //     setExchangePrice("");
        //     setSellExchangePrice("");
        // }
        // if(typeof(cryptoExchangePairInfo) != "undefined" && typeof(selectRow.name) != 'undefined'){
        //     var pair = selectRow.name.split('_')[1] + "_" + selectRow.name.split('_')[0];
        //     if(typeof(cryptoExchangePairInfo[pair]) =="undefined"){
        //         if(typeof(cryptoExchangePairInfo[selectRow.name]) == 'undefined') {
        //             setExchangePrice('');
        //         }
        //         else {
        //             setExchangePrice(1/cryptoExchangePairInfo[selectRow.name]["last"]);
                
        //             // if(totalAmount != "") setToAmount(1/cryptoExchangePairInfo[inverse_pair]["last"]*totalAmount);
        //         }
        //     }
        //     else {
        //         setExchangePrice(cryptoExchangePairInfo[pair]["last"]);
        //     }
        // }else setExchangePrice("");
    },[selectRow])

    

    // const handleClick = (event, type) => {
    //     if (type === 'usd') {
    //         setAnchorElUSD(event.currentTarget);
    //         return;
    //     }
    //     if (type === 'alts') {
    //         setAnchorElALTS(event.currentTarget);
    //         return;
    //     }
    //     if (type === 'innov') {
    //         setAnchorElINNOV(event.currentTarget);
    //         return;
    //     }
    // };

    // const handleClose = () => {
    //     setAnchorElUSD(null);
    //     setAnchorElALTS(null);
    //     setAnchorElINNOV(null);
    // };

    const bookShow = (show) => {
        setShow(show);
    }
    const selectCrypto = (nam) => {
        if (name === nam) {
            setPairDefault("BTC_USDT");
            setName('all');
            nam = 'all';
        } else {
            if(nam == 'USDT')  setPairDefault("BTC_USDT");
            if(nam == 'BTC')   setPairDefault("SNX_BTC");
            if(nam == 'ETH')   setPairDefault("COMP_ETH");
            setName(nam);
        }
        // clearInterval(timer3);
        props.CryptoExchangePairList(nam);
        // timer3 = setInterval(() => {
        //     props.CryptoExchangePairList(name);
        // }, 5000);
    }

    const handleSelectRow = (target,row) => {
        if (name === 'all') row.name.split('_').reverse().join('_');
        setPairDefault(row.name);
        props.CryptoExchangeUserOrderList(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin, selectRow.price);
        setSelectRow({ ...row });
        if (!match2) {
            setHiddenC([...hiddenC.filter(hid => hid !== 'sider1')]);
            setHiddenC(hiddenC.concat(['sider1']));
        }
        let hidden = hiddenC.filter(hid => hid === target);
        if (hidden.length) {
            setHiddenC(hiddenC.filter(hid => hid !== target));
        } else {
            setHiddenC(hiddenC.concat([target]));
        }
    };

    const cancelOrder = (id) => {
        if (Object.keys(selectRow).length) {
            if(adminPanLogin == 0){
                props.CryptoExchangeOrderCancel(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin, id);
            }    
            else{
                props.CryptoExchangeOrderCancel(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin, id);
            }                 
        }
    }

    const clearOrder = (id) => {
        if (Object.keys(selectRow).length) {
            if(adminPanLogin == 0){
                props.CryptoExchangeOrderClear(user_id,selectRow.name.split('_')[0],selectRow.name.split('_')[1],adminPanLogin, id);
            }    
            else{
                props.CryptoExchangeOrderClear(user_id,selectRow.name.split('_')[1],selectRow.name.split('_')[0],adminPanLogin, id);
            }                 
        }
    }

    const onSizeChange = (e) => {
        setSize(e.target.value);
    }

    const handleDisplay = e => {
        setDisplay(e.target.value);
    }

    const handleResponse = (target) => {
        let hidden = hiddenC.filter(hid => hid === target);
        if (hidden.length) {
            setHiddenC(hiddenC.filter(hid => hid !== target));
        } else {
            setHiddenC(hiddenC.concat([target]));
        }
    };

    const handleSearch = (e) => {
        setSearch1(e.target.value);
    }

    const tabHeader = (label, tabNum = 0) => <StyledTab className="tabButton" label={label} {...a11yProps(tabNum)} />;
    const tabbodyMarketTrade = (tabNum, selNum = 0) => (
        <TabPanel value={selNum} index={tabNum}>
            <TableContainer className="trade-market-table-container">
                <Table className={classes.table} size="small" aria-label="a dense table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            {isXs && <TableCell align="center">Total</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cryptoTradLists.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{row.time}</TableCell>
                                <TableCell align="right"><span className={row.type === 'sell' ? 'minus' : 'plus'}>{row.price}</span></TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                {isXs && <TableCell align="right">{row.total}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>
    );

    const tabbodyOrderBook = (tabNum, selNum) => (
        <div className="sider2">
            <TabPanel value={selNum} index={tabNum}>
                {match2&&<div className="orderBookHeader">
                    <h4>Order Book</h4>
                    <div className="show-type">
                        <Tooltip title="Buy Orders" arrow placement="bottom">
                            <div className="buy-orders" onClick={() => { bookShow(1) }}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </Tooltip>
                        <Tooltip title="Sell Orders" arrow placement="bottom">
                            <div className="sell-orders" onClick={() => { bookShow(2) }}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </Tooltip>
                        <Tooltip title="Order Book" arrow placement="bottom">
                            <div className="order-book" onClick={() => { bookShow(3) }}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </Tooltip>
                        <Tooltip title="Order Book Grouping" arrow placement="bottom">
                            <div className="order-book-grouping">
                                <select name="order-book-grouping" id="order-book-grouping" value={size} onChange={onSizeChange}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="6">6</option>
                                    <option value="8">8</option>
                                </select>
                            </div>
                        </Tooltip>
                    </div>
                </div>}
                <div className="book-header">
                    {match2&&<span>PRICE({selectRow?.name && selectRow.name.split('_')[0]})</span>}
                    {!match2&&<span style={{marginRight:10}}>PRICE</span>}
                    {match2&&<span>AMOUNT({selectRow?.name && selectRow.name.split('_')[1]})</span>}
                    {!match2&&<span>AMOUNT</span>}
                    {match2&&<span>TOTAL({selectRow?.name && selectRow.name.split('_')[0]})</span>}
                </div>
                
                <div className="orderSellBook">
                    <TableContainer className="order-buy-table-container" ref={scrollBottom}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableBody>
                                {cryptoOrderLists.asks.map((row, i) => (
                                    <Tooltip key={i} type={1} title={
                                        <Fragment>
                                            <div><span>Avg Price: </span><span></span></div>
                                            <div><span>Sum {selectRow?.name && selectRow.name.split('_')[0]}: sd{row.sum_total}</span><span></span></div>
                                            <div><span>Sum {selectRow?.name && selectRow.name.split('_')[1]}: sd{row.sum_amount}</span><span></span></div>
                                        </Fragment>
                                    } placement="right" arrow>
                                        <BgTableRow  onClick = {() => handleBuyOrderTable(row.price, row.amount, row.total)} total={row.sum_total} max={cryptoOrderLists.asks[0].sum_total}>
                                            {match2&&<TableCell align="right" className="minus">{Number(row.price).toFixed(size)}</TableCell>}
                                            {!match2&&<TableCell align="right" className="minus">{Number(row.price).toFixed(2)}</TableCell>}
                                            {match2&&<TableCell align="right">{row.amount}</TableCell>}
                                            {!match2&&<TableCell align="right">{Number(row.amount).toFixed(2)}</TableCell>}
                                            {match2&&<TableCell align="right">{row.total}</TableCell>}
                                        </BgTableRow>
                                    </Tooltip>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="order-sell-book">
                    <div className="order-sell-book-header">
                        {match2&&<h4>{Object.keys(selectRow).length ? (selectRow.price + " " + selectRow.name.split('_')[1]) : '1'}</h4>}
                        {!match2&&<h4>{Object.keys(selectRow).length ? (Number(selectRow.price).toFixed(2)) : '-------'}</h4>}
                    </div>
                    <TableContainer className="order-sell-table-container">
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableBody>
                                {cryptoOrderLists.bids.map((row, i) => (
                                    <Tooltip key={i} title={
                                        <Fragment>
                                            <div><span>Avg Price: </span><span></span></div>
                                            <div><span>Sum {selectRow?.name && selectRow.name.split('_')[0]}: {row.sum_total}</span><span></span></div>
                                            <div><span>Sum {selectRow?.name && selectRow.name.split('_')[1]}: {row.sum_amount}</span><span></span></div>
                                        </Fragment>
                                    } placement="right" arrow>
                                        <BgTableRow onClick = {() => handleSellOrderTable(row.price, row.amount, row.total)} type={2} total={row.sum_total} max={cryptoOrderLists.bids[cryptoOrderLists.bids.length - 1].sum_total}>
                                        {match2&&<TableCell align="right" className="plus">{Number(row.price).toFixed(size)}</TableCell>}
                                            {!match2&&<TableCell align="right" className="plus">{Number(row.price).toFixed(2)}</TableCell>}
                                            {match2&&<TableCell align="right">{row.amount}</TableCell>}
                                            {!match2&&<TableCell align="right">{Number(row.amount).toFixed(2)}</TableCell>}
                                            {match2&&<TableCell align="right">{row.total}</TableCell>}
                                        </BgTableRow>
                                    </Tooltip>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </TabPanel>
        </div>
    );

    const tabbodyOpenOrders = (tabNum, selNum) => (
        <TabPanel value={selNum} index={tabNum}>
            <TableContainer className="tables">
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                                {match2&&<TableCell align="center">DateTime</TableCell>}
                                {match2&&<TableCell align="center">Pair</TableCell>}
                                {match2&&<TableCell align="center">Type</TableCell>}
                                {match2&&<TableCell align="center">Side</TableCell>}
                                <Fragment>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Amount</TableCell>                                    
                                    {/* {match2&&<TableCell align="center">Filled</TableCell>} */}
                                    {/* <TableCell align="center">Stop({selectRow?.name && selectRow.name.split('_')[0]})</TableCell> */}
                                    <TableCell align="center">Total</TableCell>
                                    <TableCell align="center"></TableCell>
                                </Fragment>
                            {/* {!isXs && <Fragment>
                                <TableCell align="center">Price / Stop({selectRow?.name && selectRow.name.split('_')[0]})</TableCell>
                                <TableCell align="center">Amount({selectRow?.name && selectRow.name.split('_')[1]})<br />Total({selectRow?.name && selectRow.name.split('_')[0]})</TableCell>
                            </Fragment>} */}
                            {/* <TableCell align="center">Date</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cryptoExchangeUserOrderList.result&&cryptoExchangeUserOrderList.result.map((row, i) => (
                            <TableRow key={i}>
                                {/* <TableCell>{row.time}</TableCell> */}
                                {/* <TableCell align="right"><span className={row.type === 'sell' ? 'minus' : 'plus'}>{row.price}</span></TableCell> */}
                                {((row.status==0)&&match2)&&<TableCell align="center">{row.datetime}</TableCell>}
                                {((row.status==0)&&match2)&&<TableCell align="center">{row.pair}</TableCell>}
                                {((row.status==0)&&match2)&&<TableCell align="center">{row.type}</TableCell>}
                                {row.side=='buy'&&
                                <Fragment>
                                    {((row.status==0)&&match2)&&<TableCell align="center" style={{color:'blue'}}>{row.side}</TableCell>}
                                    {(row.status==0)&&<TableCell align="center">{Number(row.price).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}
                                    {(row.status==0)&&<TableCell align="center">{Number(row.amount).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}                                
                                    {/* {(row.status==0)&&match2&&<TableCell align="center">{match2?row.filled:Number(row.filled).toFixed(4)}</TableCell>} */}
                                    {(row.status==0)&&<TableCell align="center">{Number(row.total).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[0]}</TableCell>}
                                    {row.status==0&&<TableCell align="right"><button onClick={()=>{cancelOrder(row.id)}}>Cancel</button></TableCell>}  
                                </Fragment>}
                                {row.side=='sell'&&
                                <Fragment>
                                    {((row.status==0)&&match2)&&<TableCell align="center" style={{color:'red'}}>{row.side}</TableCell>}
                                    {(row.status==0)&&<TableCell align="center">{Number(row.price).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}                              
                                    {/* {(row.status==0)&&match2&&<TableCell align="center">{match2?row.filled:Number(row.filled).toFixed(4)}</TableCell>} */}
                                    {(row.status==0)&&<TableCell align="center">{Number(row.total).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[0]}</TableCell>}
                                    {(row.status==0)&&<TableCell align="center">{Number(row.amount).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}  
                                    {row.status==0&&<TableCell align="right"><button onClick={()=>{cancelOrder(row.id)}}>Cancel</button></TableCell>}
                                </Fragment>}                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>
    );

    const tabbodyTradeHistory = (tabNum, selNum) => (
        <TabPanel value={selNum} index={tabNum}>
            <TableContainer className="tables">
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {match2&&<TableCell align="center">DateTime</TableCell>}
                            {match2&&<TableCell align="center">Pair</TableCell>}
                            {match2&&<TableCell align="center">Side</TableCell>}
                            <Fragment><TableCell align="center">Price</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                {/* <TableCell align="center">Status</TableCell> */}
                                <TableCell align="center">Fee</TableCell>
                                {/* <TableCell align="center">Stop({selectRow?.name && selectRow.name.split('_')[0]})</TableCell> */}
                                <TableCell align="center">Total</TableCell>
                                <TableCell align="center"><input type="checkbox" onChange={(e)=>{tradeHistorySelect(0, e.target.checked)}}></input></TableCell>
                                <TableCell align="right"><button onClick={()=>{clearSelectedTradeHistory()}}>Clear Selected</button></TableCell>
                            </Fragment>                          
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cryptoExchangeUserOrderList.result&&cryptoExchangeUserOrderList.result.map((row, i) => (
                            <TableRow key={i}>
                                {/* <TableCell>{row.time}</TableCell> */}
                                {/* <TableCell align="right"><span className={row.type === 'sell' ? 'minus' : 'plus'}>{row.price}</span></TableCell> */}
                                {row.status!=0&&match2&&<TableCell align="center">{row.datetime}</TableCell>}
                                {row.status!=0&&match2&&<TableCell align="center">{row.pair}</TableCell>}
                                {row.side=='buy'&&
                                <Fragment>                                    
                                    {row.status!=0&&match2&&<TableCell align="center" style={{color:'blue'}}>{row.side}</TableCell>}
                                    {row.status!=0&&<TableCell align="center">{Number(row.price).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}
                                    {row.status!=0&&<TableCell align="center">{Number(row.amount).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}
                                    {/* {row.status!=0&&<TableCell align="center">{row.status==1?'filled':'cancelled'}</TableCell>} */}
                                    {row.status!=0&&<TableCell align="center">{Number(row.fee).toFixed(4)} {selectRow?.name && selectRow.name.split('_')[0]}</TableCell>}
                                    {row.status!=0&&<TableCell align="center">{Number(row.total).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[0]}</TableCell>}
                                    {row.status!=0&&<TableCell align="center"><input type="checkbox" onChange={(e)=>{tradeHistorySelect(row.id, e.target.checked)}} checked={tradeHistorySelected[row.id]==true}></input></TableCell>}
                                    {row.status!=0&&<TableCell align="right"><button onClick={()=>{clearOrder(row.id)}}>Clear</button></TableCell>}
                                </Fragment>
                                }
                                {row.side=='sell'&&
                                <Fragment>
                                    {row.status!=0&&match2&&<TableCell align="center" style={{color:'red'}}>{row.side}</TableCell>}
                                    {row.status!=0&&<TableCell align="center">{Number(row.price).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}
                                    {row.status!=0&&<TableCell align="center">{Number(row.total).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[0]}</TableCell>}
                                    {/* {row.status!=0&&<TableCell align="center">{row.status==1?'filled':'cancelled'}</TableCell>} */}
                                    {row.status!=0&&<TableCell align="center">{Number(row.fee).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}
                                    {row.status!=0&&<TableCell align="center">{Number(row.amount).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}
                                    </TableCell>}
                                    {row.status!=0&&<TableCell align="center"><input type="checkbox" onChange={(e)=>{tradeHistorySelect(row.id, e.target.checked)}} checked={tradeHistorySelected[row.id]==true}></input></TableCell>}
                                    {row.status!=0&&<TableCell align="right"><button onClick={()=>{clearOrder(row.id)}}>Clear</button></TableCell>}
                                </Fragment>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>
    );

    const tabbodyFunds = (tabNum, selNum) => (
        <TabPanel value={selNum} index={tabNum}>
            <TableContainer className="tables">
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Coin</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Available</TableCell>
                            <TableCell align="center">In order</TableCell>
                            <TableCell align="center">USDT value</TableCell>                          
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cryptoExchangeUserOrderList.fund&&cryptoExchangeUserOrderList.fund.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell align="center">{row.symbol}</TableCell>
                                <TableCell align="center">{Number(parseFloat(row.available)+parseFloat(row.order)).toFixed(2)}</TableCell>
                                <TableCell align="center">{Number(row.available).toFixed(2)}</TableCell>
                                <TableCell align="center">{Number(row.order>0?row.order:-row.order).toFixed(2)}</TableCell>
                                <TableCell align="center">{Number(row.usdt_value).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>
    );

    const tabbodyOrderHistory = (tabNum, selNum) => (
        <TabPanel value={selNum} index={tabNum}>
            <TableContainer className="tables">
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {match2&&<TableCell align="center">DateTime</TableCell>}
                            {match2&&<TableCell align="center">Pair</TableCell>}
                            {match2&&<TableCell align="center">Type</TableCell>}
                            {match2&&<TableCell align="center">Side</TableCell>}
                            <Fragment><TableCell align="center">Price</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                {/* <TableCell align="center">Stop({selectRow?.name && selectRow.name.split('_')[0]})</TableCell> */}
                                <TableCell align="center">Total</TableCell>
                                <TableCell align="center"><input type="checkbox" onChange={(e)=>{orderHistorySelect(0, e.target.checked)}}></input></TableCell>
                                <TableCell align="right"><button onClick={()=>{clearSelectedOrderHistory()}}>Clear Selected</button></TableCell>
                            </Fragment>                          
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cryptoExchangeUserOrderList.result&&cryptoExchangeUserOrderList.result.map((row, i) => (
                            <TableRow key={i} id="orderhistory-table">
                                {/* <TableCell>{row.time}</TableCell> */}
                                {/* <TableCell align="right"><span className={row.type === 'sell' ? 'minus' : 'plus'}>{row.price}</span></TableCell> */}
                                {row.status&&match2&&<TableCell align="center">{row.datetime}</TableCell>}
                                {row.status&&match2&&<TableCell align="center">{row.pair}</TableCell>}
                                {row.status&&match2&&<TableCell align="center">{row.type}</TableCell>}
                                {row.side=='buy'&&
                                <Fragment>
                                    {row.status&&match2&&<TableCell align="center" style={{display:'none'}}>{row.id}</TableCell>}
                                    {row.status&&match2&&<TableCell align="center" style={{color:'blue'}}>{row.side}</TableCell>}
                                    {row.status&&<TableCell align="center">{Number(row.price).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}
                                    {row.status&&<TableCell align="center">{row.status==1?'filled':'open'}</TableCell>}
                                    {row.status&&<TableCell align="center">{Number(row.amount).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}
                                    {row.status&&<TableCell align="center">{Number(row.total).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[0]}</TableCell>}
                                    {row.status&&<TableCell align="center"><input type="checkbox" onChange={(e)=>{orderHistorySelect(row.id, e.target.checked)}} checked={orderHistorySelected[row.id]==true}></input></TableCell>}
                                    {row.status&&<TableCell align="right"><button onClick={()=>{clearOrder(row.id)}}>Clear</button></TableCell>}
                                </Fragment>
                                }
                                {row.side=='sell'&&
                                <Fragment>                                    
                                    {row.status&&match2&&<TableCell align="center" style={{display:'none'}}>{row.id}</TableCell>}
                                    {row.status&&match2&&<TableCell align="center" style={{color:'red'}}>{row.side}</TableCell>}
                                    {row.status&&<TableCell align="center">{Number(row.price).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}
                                    {row.status&&<TableCell align="center">{row.status==1?'filled':'open'}</TableCell>}
                                    {row.status&&<TableCell align="center">{Number(row.total).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[0]}</TableCell>}
                                    {row.status&&<TableCell align="center">{Number(row.amount).toFixed(2)} {selectRow?.name && selectRow.name.split('_')[1]}</TableCell>}
                                    {row.status&&<TableCell align="center"><input type="checkbox" onChange={(e)=>{orderHistorySelect(row.id, e.target.checked)}} checked={orderHistorySelected[row.id]==true}></input></TableCell>}
                                    {row.status&&<TableCell align="right"><button onClick={()=>{clearOrder(row.id)}}>Clear</button></TableCell>}
                                </Fragment>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>
    );

    let adminPan = <Grid item className="adminPan">
        <div><h2>Start Trading</h2></div>
        <div>
            <Link to="sign-up" className="signup">
                <Button
                    color="primary"
                    variant="contained"
                    size="small"
                >
                    Sign Up
            </Button>
            </Link>
            <Link to="login" className='login'>
                <Button
                    color="default"
                    variant="contained"
                    size="small"
                >
                    Log In
            </Button>
            </Link></div>
    </Grid>

    if (isAuthenticated) {

        adminPan = <Grid item className="adminPanLogin">
            <ButtonTabs
                value={adminPanLogin}
                onChange={handleBuySell}
                variant="standard"
                aria-label="scrollable auto tabs example"
                centered
            >
                {match2&&<ButtonTab className="buyButton" label="Buy"  {...a11yProps(0)} />}
                {!match2&&<ButtonTab className="buyButton" label="Buy" style={{marginRight:10}} {...a11yProps(0)} />}
                {match2&&<ButtonTab className="sellButton" label="Sell"  {...a11yProps(1)} />}
                {!match2&&<ButtonTab className="sellButton" label="Sell" style={{marginLeft:10}}  {...a11yProps(1)} />}
                
            </ButtonTabs>
            <TabPanel value={adminPanLogin} index={0}>
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Order Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            size="small"
                            fullWidth
                            value={buyOrderType}
                            onChange={handleBuyOrderType}
                            label="Order Type"
                        >
                            <MenuItem value="limit">Limit</MenuItem>
                            <MenuItem value="market">Market</MenuItem>
                        </Select>
                    </FormControl>
                    {/* {buyOrderType === "market" && <TextField id="outlined-basic" size="small" label="Stop Price" variant="outlined" fullWidth InputProps={{
                        endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[0] : ""}</InputAdornment>,
                    }} />} */}
                    {buyOrderType === "market" && <TextField id="outlined-basic" size="small" label="Price"  onChange = {handleExchangePrice} value = {exchangePrice?exchangePrice: " "} disabled variant="outlined" type = "number" fullWidth InputProps={{
                        endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[1] : ""}</InputAdornment>,
                    }} />}
                    {buyOrderType === "limit" && <TextField id="outlined-basic-buy" size="small" label="Price"  onChange = {handleExchangePrice} value = {exchangePrice} variant="outlined" type = "number" fullWidth InputProps={{
                        endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[1] : ""}</InputAdornment>,
                    }} />}
                    <TextField id="outlined-basic-buy-total" size="small" label="Amount" onChange = {handleExchangeTotal} type = "number" value = {exchangeTotal} variant="outlined" fullWidth InputProps={{
                        endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[0] : ""}</InputAdornment>,
                    }} />
                    <div className="percentage">
                        <span size="small" type="primary" className="color-secondary-percent" onClick = {() =>handleLimitAmount(25)}>25%</span>
                        <span size="small" type="primary" className="color-secondary-percent" onClick = {() =>handleLimitAmount(50)}>50%</span>
                        <span size="small" type="primary" className="color-secondary-percent" onClick = {() =>handleLimitAmount(75)}>75%</span>
                        <span size="small" type="primary" className="color-secondary-percent" onClick = {() =>handleLimitAmount(100)}>100%</span>
                    </div>
                    <TextField id="outlined-basic-buy-amount" size="small" label="Total" onChange = {handleExchangeAmount} type = "number" value = {exchangeAmount} variant="outlined" fullWidth InputProps={{
                        endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[1] : ""}</InputAdornment>,
                    }} />
                    <TextField id="outlined-basic" size="small" label="Available" type = "number" value = {exchangeBuyAvailable!=''?exchangeBuyAvailable:"0"} variant="outlined" fullWidth InputProps={{
                        endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[1] : ""}</InputAdornment>,
                    }} disabled/>
                    {/* <div><span>Buy Price: {selectRow?.price && selectRow.price} {selectRow?.name && selectRow.name.split('_')[0]}</span></div> */}
                    {/* <div><span>Taker / Maker Fee: {takerFee}% / {makerFee}%</span></div> */}
                    <div><span>Transaction Fee: {cryptoExchangeFee}%</span></div>
                    <Button fullWidth size="small" onClick = {handleBuy} id="buy_button" className="color-primary" disabled = {buyButtonDisable}>Buy {selectRow?.name ? selectRow?.name.split('_')[0] : ""}</Button>
                </div>
                <div>
                    {/* <div style={{ marginTop: 20 }}>
                        <div className="unitsize"><div className="unitview"><span className="color1">&#9679;</span><div><p>ETH</p><p>Ethereum</p></div></div><div><p>0.000000</p>
                            <p>$0.00</p></div></div>
                        <div className="unitsize"><div className="unitview"><span className="color2">&#9679;</span><div><p>ETH</p><p>Ethereum</p></div></div><div><p>0.000000</p>
                            <p>$0.00</p></div></div>
                    </div> */}
                    {match2&&<Grid container spacing={3}>
                        <Grid item xs={6}><Button size="small" type="primary" className="color-secondary" fullWidth 
                            onClick={Depositlink}
                        >Deposit</Button></Grid>
                        <Grid item xs={6}><Button size="small" type="primary" className="color-secondary" fullWidth onClick={Transferlink}>Transfer</Button></Grid>
                    </Grid>}
                </div>
            </TabPanel>
            <TabPanel value={adminPanLogin} index={1}>
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Order Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            size="small"
                            fullWidth
                            value={sellOrderType}
                            onChange={handleSellOrderType}
                            label="Order Type"
                        >
                            <MenuItem value='limit'>Limit</MenuItem>
                            <MenuItem value='market'>Market</MenuItem>
                        </Select>
                    </FormControl>
                    {sellOrderType === "market" && <TextField id="outlined-basic" size="small" label="Price" onChange = {handleSellExchangePrice} disabled value = {sellExchangePrice?sellExchangePrice:" "} type = "number" variant="outlined" fullWidth InputProps={{
                        endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[1] : ""}</InputAdornment>,
                    }} />}
                    {sellOrderType === "limit" && <TextField id="outlined-basic-sell" size="small" label="Price" onChange = {handleSellExchangePrice} value = {sellExchangePrice} type = "number" variant="outlined" fullWidth InputProps={{
                        endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[1] : ""}</InputAdornment>,
                    }} />}
                    
                    <TextField id="outlined-basic-sell-amount" size="small" label="Amount" onChange = {handleSellExchangeAmount} type = "number" value = {sellExchangeAmount} variant="outlined" fullWidth InputProps={{
                        endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[0] : ""}</InputAdornment>,
                    }} />
                    <div className="percentage">
                        <span size="small" type="primary" className="color-secondary-percent" onClick = {() =>handleSellLimitAmount(25)} >25%</span>
                        <span size="small" type="primary" className="color-secondary-percent" onClick = {() =>handleSellLimitAmount(50)}>50%</span>
                        <span size="small" type="primary" className="color-secondary-percent" onClick = {() =>handleSellLimitAmount(75)}>75%</span>
                        <span size="small" type="primary" className="color-secondary-percent" onClick = {() =>handleSellLimitAmount(100)}>100%</span>
                    </div>

                    <TextField id="outlined-basic-sell-total" size="small" label="Total" onChange = {handleSellExchangeTotal} type = "number" value = {sellExchangeTotal} variant="outlined" fullWidth InputProps={{
                        endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[1] : ""}</InputAdornment>,
                    }} />
                    <TextField id="outlined-basic" size="small" label="Available" type = "number" value = {exchangeSellAvailable!=''?exchangeSellAvailable:"0"} variant="outlined" fullWidth InputProps={{
                        endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[0] : ""}</InputAdornment>,
                    }} disabled/>
                  
                    {/* <div><span>Sell Price: {selectRow?.price && (parseFloat(1 / selectRow.price) * 0.999).toFixed(8)} {selectRow?.name && selectRow.name.split('_')[1]}</span></div> */}
                    {/* <div><span>Taker / Maker Fee: {takerFee}% / {makerFee}%</span></div> */}
                    <div><span>Transaction Fee: {cryptoExchangeFee}%</span></div>
                    <Button fullWidth size="small" className="color-danger" id="sell_button" onClick = {handleSell} disabled = {sellButtonDisable}>Sell {selectRow?.name ? selectRow?.name.split('_')[0] : ""}</Button>
                </div>
                <div>
                    {/* <div style={{ marginTop: 50 }}>
                        <div className="unitsize"><div className="unitview"><span className="color1">&#9679;</span><div><p>ETH</p><p>Ethereum</p></div></div><div><p>0.000000</p>
                            <p>$0.00</p></div></div>
                        <div className="unitsize"><div className="unitview"><span className="color2">&#9679;</span><div><p>ETH</p><p>Ethereum</p></div></div><div><p>0.000000</p>
                            <p>$0.00</p></div></div>
                    </div> */}
                    <Grid container spacing={3}>
                        {match2&&<Grid item xs={6}><Button size="small" type="primary" className="color-secondary" fullWidth>Deposit</Button></Grid>}
                        {match2&&<Grid item xs={6}><Button size="small" type="primary" className="color-secondary" fullWidth>Transfer</Button></Grid>}
                    </Grid>
                </div>
            </TabPanel>
        </Grid>
    }

    return (
        <>
        {!loading &&
        <CryptoDiv className={classes.root} show={show} responsive={hiddenC} match={!match2} match1={!match1} isXs={isXs} >
            <AppBar position={'static'}>
                <Toolbar>
                    <Grid container spacing={1} className={classes.topInfo}>
                        <Grid item xs={5} sm={3} md={2}>
                            <h3 onClick={() => { handleResponse('sider1') }} className={classes.eth_h}>{selectRow?.name && selectRow?.name.replace('_', '/')}{selectRow?.name ? "" : "USDT/BTC"} {hiddenC.filter(hid => hid === 'sider1').length ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</h3>
                            <p className={classes.eth_subp}>{selectRow?.fullname ? selectRow.fullname : ''}</p>
                        </Grid>
                        <div className="infoview">
                            <div>
                                <p className={classes.eth_p}>Last Price</p>
                                <h4 className={classes.eth_h}>{selectRow?.price && Number(selectRow?.price).toFixed(4 - (!isXs ? 3 : 0))} {selectRow?.price ? selectRow?.name.split('_')[0] : "0"} </h4>
                            </div>
                            <Hidden xsDown>
                                <div><p className={classes.eth_p}>24h Change</p>
                                    <h4 className={classes.eth_h}>{selectRow?.percent && Number(selectRow?.percent).toFixed(2)} {selectRow?.percent ? "%" : "0"}</h4>
                                </div>
                            </Hidden>
                            <Hidden smDown>
                                <div><p className={classes.eth_p}>24h Low</p>
                                    <h4 className={classes.eth_h}>{selectRow?.low && Number(selectRow?.low).toFixed(4)} {selectRow?.low ? selectRow?.name.split('_')[0] : "0"}</h4>
                                </div>
                                <div><p className={classes.eth_p}>24h High</p>
                                    <h4 className={classes.eth_h}>{selectRow?.high && Number(selectRow?.high).toFixed(4)} {selectRow?.high ? selectRow?.name.split('_')[0] : "0"}</h4>
                                </div>
                            </Hidden>
                            <Hidden xsDown>
                                <div><p className={classes.eth_p}>Volume</p>
                                    <h4 className={classes.eth_h}>{selectRow?.volume && Number(selectRow?.volume).toFixed(4)} {selectRow?.volume ? selectRow?.name.split('_')[0] : "0"}</h4>
                                </div>
                            </Hidden>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container spacing={1} className="content-wrapper">
                <Grid item className="sider1">
                    <div className={classes.xrpSearch}>
                        <div className={classes.xrpfilter}>
                            <StarIcon className={classes.star} />
                            {/* <div> */}
                            {/* <span className={classes.xrpSpan}
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => { handleClick(e, 'usd') }}
                                >
                                    USD <ArrowDropDownIcon />
                                </span>
                                <Menu
                                    id="long-menu"
                                    anchorEl={anchorElUSD}
                                    keepMounted
                                    open={openUSD}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            // maxHeight: ITEM_HEIGHT * 4.5,
                                            width: 'auto',
                                        },
                                    }}
                                >
                                    {optionUSD.map((option) => (
                                        <MenuItem className={classes.menuitem} key={option} onClick={() => { selectCrypto(option); handleClose(); }}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div> */}
                            <span className={clsx(classes.xrpSpan, name === 'USDT' && classes.active)} onClick={() => { selectCrypto('USDT'); }}>USDT</span>
                            <span className={clsx(classes.xrpSpan, name === 'BTC' && classes.active)} onClick={() => { selectCrypto('BTC'); }}>BTC</span>
                            <span className={clsx(classes.xrpSpan, name === 'ETH' && classes.active)} onClick={() => { selectCrypto('ETH'); }}>ETH</span>
                            {/* <span className={classes.xrpSpan} onClick={() => { selectCrypto('TRX'); }}>TRX</span> */}
                            {/* <div>
                                <span className={classes.xrpSpan}
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => { handleClick(e, 'alts') }}
                                >
                                    ALTS <ArrowDropDownIcon />
                                </span>
                                <Menu
                                    id="long-menu"
                                    anchorEl={anchorElALTS}
                                    keepMounted
                                    open={openALTS}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            // maxHeight: ITEM_HEIGHT * 4.5,
                                            width: 'auto',
                                        },
                                    }}
                                >
                                    {optionALTS.map((option) => (
                                        <MenuItem className={classes.menuitem} key={option} onClick={() => { selectCrypto(option); handleClose(); }}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                            <div>
                                <span className={classes.xrpSpan}
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => { handleClick(e, 'innov') }}
                                >
                                    INNOV <ArrowDropDownIcon />
                                </span>
                                <Menu
                                    id="long-menu"
                                    anchorEl={anchorElINNOV}
                                    keepMounted
                                    open={openINNOV}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            // maxHeight: ITEM_HEIGHT * 4.5,
                                            width: 'auto',
                                        },
                                    }}
                                >
                                    {optionINNOV.map((option) => (
                                        <MenuItem className={classes.menuitem} key={option} onClick={() => { selectCrypto(option); handleClose(); }}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div> */}
                        </div>
                    </div>
                    <div className={classes.xrpContent}>
                        <div className="searchBox"><SearchIcon className={classes.searchIcon} /><input className={classes.customInput} placeholder="Search.." value={search1} onChange={handleSearch} /></div>
                        <div className="radioGroup">
                            <input type="radio" name="volume" id="volume" value="volume" onChange={handleDisplay} checked={display === "volume"} /><label htmlFor="volume"> Volume</label>
                            <input type="radio" name="volume" id="balance" value="balance" onChange={handleDisplay} checked={display === "balance"} /><label htmlFor="balance"> Balance</label>
                        </div>
                    </div>
                    <div className={classes.tables}>
                        {/* {!props.isLoading && <TableContainer className={classes.tableContainer}> */}
                        <TableContainer className={classes.tableContainer}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" className="pairHeader">Pair</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">{display === 'volume' ? 'Volume' : 'Balance'}</TableCell>
                                        <TableCell align="right">24H</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cryptoLists.filter(cryptoList => {
                                        if (search1 === '') return true;
                                        return cryptoList.name.toLowerCase().search(search1.toLowerCase()) !== -1;
                                    }).map((row, i) => (
                                        //
                                        <TableRow key={i} onClick={() => { handleSelectRow('sider1',row); } } >
                                            <TableCell className="pairValue"><span>{row.name.split('_')[0]}</span>/<code>{row.name.split('_')[1]}</code></TableCell>
                                            <TableCell align="right"><span className={'fw-800' + (Number(row.percent) > 0 ? ' plus' : ' minus')}><Counter color={row.price} status={row.price} key={`${row.price}-${row.price}`}>{!isXs ? row.price : row.price}</Counter></span></TableCell>
                                            <TableCell align="right"><Counter color={row[display]} status={row[display]} key={`${row[display]}-${row[display]}`}>{display === 'volume' ? Number(row[display]).toFixed(0) : '_'}</Counter></TableCell>
                                            <TableCell align="right"><span className={'fw-800' + (Number(row.percent) > 0 ? ' plus' : ' minus')}><Counter color={row.percent} status={row.percent} key={`${row.percent}-${row.percent}`}>{parseFloat(row.percent).toFixed(4 - isXs ? 2 : 0)} %</Counter></span></TableCell>
                                        </TableRow>
                                        // </Counter>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* } */}
                        {/* <ClipLoader
                            css={override}
                            size={50}
                            color={"#123abc"}
                            loading={props.isLoading}
                        /> */}
                    </div>
                </Grid>
                {match2 && adminPan}
                {match2 && <Grid item className="sider2">
                    <div className="orderBookHeader">
                        <h4>Order Book</h4>
                        <div className="show-type">
                            <Tooltip title="Buy Orders" arrow placement="bottom">
                                <div className="buy-orders" onClick={() => { bookShow(1) }}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </Tooltip>
                            <Tooltip title="Sell Orders" arrow placement="bottom">
                                <div className="sell-orders" onClick={() => { bookShow(2) }}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </Tooltip>
                            <Tooltip title="Order Book" arrow placement="bottom">
                                <div className="order-book" onClick={() => { bookShow(3) }}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </Tooltip>
                            <Tooltip title="Order Book Grouping" arrow placement="bottom">
                                <div className="order-book-grouping">
                                    <select name="order-book-grouping" id="order-book-grouping" value={size} onChange={onSizeChange}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="4">4</option>
                                        <option value="6">6</option>
                                        <option value="8">8</option>
                                    </select>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="book-header">
                        <span>PRICE({selectRow?.name && selectRow.name.split('_')[0]})</span>
                        <span>AMOUNT({selectRow?.name && selectRow.name.split('_')[0]})</span>
                        <span>TOTAL({selectRow?.name && selectRow.name.split('_')[1]})</span>
                    </div>
                    <div className="orderSellBook">
                        <TableContainer className="order-buy-table-container" ref={scrollBottom}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableBody>
                                    {cryptoOrderLists.asks.map((row, i) => (
                                        <Tooltip key={i} type={1} 
                                        // title={
                                        //     <Fragment>
                                        //         <div><span>Avg Price: </span><span></span></div>
                                        //         <div><span>Sum {selectRow?.name && selectRow.name.split('_')[0]}: {row.sum_total}</span><span></span></div>
                                        //         <div><span>Sum {selectRow?.name && selectRow.name.split('_')[1]}: {row.sum_amount}</span><span></span></div>
                                        //     </Fragment>
                                        // } 
                                        placement="right" arrow>
                                            <BgTableRow  onClick = {() => handleBuyOrderTable(row.price, row.amount, row.total)} total={row.sum_total} max={cryptoOrderLists.asks[0].sum_total}>
                                                <TableCell align="right" className="minus">{Number(row.price).toFixed(size)}</TableCell>
                                                <TableCell align="right">{row.amount}</TableCell>
                                                <TableCell align="right">{row.total}</TableCell>
                                            </BgTableRow>
                                        </Tooltip>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="order-sell-book">
                        <div className="order-sell-book-header">
                            <h4>{Object.keys(selectRow).length ? (selectRow.price + " " + selectRow.name.split('_')[1]) : 'sell'}</h4>
                        </div>
                        <TableContainer className="order-sell-table-container">
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableBody>
                                    {cryptoOrderLists.bids.map((row, i) => (
                                        <Tooltip key={i} 
                                        // title={
                                        //     <Fragment>
                                        //         <div><span>Avg Price: </span><span></span></div>
                                        //         <div><span>Sum {selectRow?.name && selectRow.name.split('_')[0]}: {row.sum_total}</span><span></span></div>
                                        //         <div><span>Sum {selectRow?.name && selectRow.name.split('_')[1]}: {row.sum_amount}</span><span></span></div>
                                        //     </Fragment>
                                        // }
                                        placement="right" arrow>
                                            <BgTableRow type={2}  onClick = {() => handleSellOrderTable(row.price, row.amount, row.total)} total={row.sum_total} max={cryptoOrderLists.bids[cryptoOrderLists.bids.length - 1].sum_total}>
                                                <TableCell align="right" className="plus">{Number(row.price).toFixed(size)}</TableCell>
                                                <TableCell align="right">{row.amount}</TableCell>
                                                <TableCell align="right">{row.total}</TableCell>
                                            </BgTableRow>
                                        </Tooltip>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>}
                <Grid item className="trad-content">
                    {!match2&&<div style={{display: "flex"}}>
                        <div style={{width:'55%'}} className="responsive">{adminPan}</div>
                        <div style={{width:'45%'}} className="responsive">
                            
                            {tabbodyOrderBook()}

                        </div>
                    </div>}
                    <Grid container>
                        <Grid item className="tradingViews">
                            <AppBar position="static" color="transparent">
                                <StyledTabs
                                    value={tradingViewTab}
                                    onChange={handleTradingTabChange}
                                    variant="scrollable"
                                    scrollButtons="on"
                                    aria-label="scrollable auto tabs example"
                                >
                                    {/* {!match2 && tabHeader('Open Orders', 4)} */}
                                    <StyledTab className="tabButton" label="Price Chart"  {...a11yProps(0)} />
                                    <StyledTab className="tabButton" label="Depth Chart"  {...a11yProps(1)} />
                                    {!match2 && tabHeader('Order Book', 2)}
                                    {!match1 && tabHeader('Market Trade', 3 - match2)}
                                    {!match2 && tabHeader('Open Orders', 4)}
                                    {!match2 && tabHeader('Order History', 5)}
                                    {!match2 && tabHeader('Trade History', 6)}
                                    {!match2 && tabHeader('Funds', 7)}
                                </StyledTabs>
                            </AppBar>
                            <TabPanel value={tradingViewTab} index={0}>
                                {selectRow?.name &&
                                    <TradingViewWidget hide_legend autosize allow_symbol_change={false} symbol={"POLONIEX:" + (selectRow?.name && (selectRow.name.search("ETH") > 0 ? selectRow.name.split('_').reverse().join('') : selectRow.name.split('_').join('')))} locale="en" />}
                            </TabPanel>
                            <TabPanel value={tradingViewTab} index={1}>
                                <DepthChart data={cryptoOrderLists} symbol={(selectRow?.name && selectRow.name.split('_').reverse())} />
                            </TabPanel>
                            {!match2 && tabbodyOrderBook(2, tradingViewTab)}
                            {!match1 && tabbodyMarketTrade(3 - match2, tradingViewTab)}
                            {!match2 && tabbodyOpenOrders(4, tradingViewTab)}
                            {!match2 && tabbodyOrderHistory(5, tradingViewTab)}
                            {!match2 && tabbodyTradeHistory(6, tradingViewTab)}
                            {!match2 && tabbodyFunds(7, tradingViewTab)}
                        </Grid>
                        {match1 && <Grid item className="sider3">
                            <StyledTabs value={0}>
                                {match1 && tabHeader('Market Trade', 0)}
                            </StyledTabs>
                            {match1 && tabbodyMarketTrade(0)}
                        </Grid>}
                        <Grid item xs={12} className="bottom1">
                            {match2 && <Fragment>
                                <StyledTabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                    {tabHeader('Open Orders', 0)}
                                    {tabHeader('Order History', 1)}
                                    {tabHeader('Trade History', 2)}
                                    {tabHeader('Funds', 3)}
                                </StyledTabs>
                                {tabbodyOpenOrders(0, value)}
                                {tabbodyOrderHistory(1, value)}
                                {tabbodyTradeHistory(2, value)}
                                {tabbodyFunds(3, value)}
                            </Fragment>}
                            {/* {(!match2 && isAuthenticated) && adminPan} */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                fullWidth
                open={buyAlert}
                // onClose={handleTransferAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {buyAlertContent}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                
                <Button onClick={handleBuyAlertClose} color="primary" autoFocus>
                    Okay
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth
                open={sellAlert}
                // onClose={handleTransferAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {sellAlertContent}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                
                <Button onClick={handleSellAlertClose} color="primary" autoFocus>
                    Okay
                </Button>
                </DialogActions>
            </Dialog>
        </CryptoDiv>
        }        
        {loading &&
            <div style={{textAlign:'center', marginTop:'45vh', marginBottom:'45vh'}}>
                <img src={require('../../assets/loading.gif')} style={{width:200}}/>
            </div>
        }
        </>
    );
};

CryptoExchange.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    cryptoLists: state.crypto.cryptoLists,
    cryptoOrderLists: state.crypto.cryptoOrderLists,
    cryptoTradLists: state.crypto.cryptoTradLists,
    isLoading: state.crypto.isLoading,
    exchangeWalletState: state.wallet.exchangeWalletState,
    user_id: state.auth.user_id,
    cryptoExchange30Volume: state.crypto.cryptoExchange30Volume,
    cryptoExchangeFee: state.crypto.cryptoExchangeFee,
    cryptoExchangePairInfo: state.crypto.cryptoExchangePairInfo,
    cryptoExchangeLimitAmount: state.crypto.cryptoExchangeLimitAmount,
    cryptoExchangeFeeAmount: state.crypto.cryptoExchangeFeeAmount,
    cryptoExchangeUserOrderList:state.crypto.cryptoExchangeUserOrderList,
    cryptoExchangeUserTradeList:state.crypto.cryptoExchangeUserTradeList,
    cryptoExchangeResult:state.crypto.cryptoExchangeResult
});

const mapDispatchToProps = {
    CryptoExchangePairList,
    CryptoExchangeOrderList,
    CryptoExchangeTradList,
    CryptoExchangePairInfo,
    CryptoExchangeLimitAmount,
    CryptoExchangeFeeAmount,
    CryptoExchangeBuyAmount,
    CryptoExchangeAddOrder,
    CryptoExchangeUserOrderList,
    CryptoExchangeUserTradeList,
    CryptoExchangeOrderCancel,
    CryptoExchangeOrderClear,
    CryptoExchange30Volume
};

export default connect(mapStateToProps, mapDispatchToProps)(CryptoExchange);
