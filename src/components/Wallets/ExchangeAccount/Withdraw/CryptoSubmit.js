import React, { useContext, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes, { string } from "prop-types";
import {
    withStyles,
    withWidth,
    Button, TextField, InputLabel, Select, MenuItem, FormControl,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { DialogTitle, DialogActions, DialogContent } from "../../Dialog";
import { useHistory, useLocation } from "react-router-dom";
import { LanguageContext } from '../../../../utils/Language';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import BtcImage from '../../../../assets/btc.png';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CryptoBalance from "./CryptoBalance";
import jsonData from "../../../../resources/withdrawcrypto.json";
import Box from "@material-ui/core/Box";
import { address } from "bitcoinjs-lib";
import {
    CryptoExchangeOrderList,
} from '../../../../redux/actions/crypto';
import {
    ExchangeWithdraw, ExchangeWithdrawConfirm, ExchangeWithdrawConfirmEmail, ExchangeWithdrawHistory, RemainAccount
} from '../../../../redux/actions/wallet';
import Common from '@ethereumjs/common'
const styles = theme => ({
    root: {
        padding: '0 15px',
    },
    transferBody: {
        backgroundColor: theme.palette.primary.footer,
        borderRadius: 10,
        padding: 20,
    },
    textBody: {
        color: '#e6e6e6',
        fontSize: 12,
        marginTop: 15
    },
    topTextBody: {
        color: '#cccccc',
        fontSize: 12,
    },
    uproot: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    bigTextBody: {
        color: 'white',
        fontSize: 16,
        marginTop: 5
    },
    endTextBody: {
        color: '#e6e6e6',
        fontSize: 16,
        marginTop: 5
    },
    selectConvert: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    submitBody: {
        backgroundColor: theme.palette.primary.footer,
        borderRadius: 10,
        marginTop: 10,
        padding: 20,
        paddingBottom: 40
    },
    submitTextField: {
        marginTop: 5,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    bottomSubmit: {
        display: 'flex'
    },
    submitButton: {
        borderRadius: 25,
        background: theme.palette.primary.main,
        textTransform: 'none',
        color: 'white',
        padding: 8,
        fontSize: 16,
        width: '40%',
        textDecoration: "none !important",
        marginTop: -25
    },
    subMainBody: {
        textAlign: 'center'
    },
    btcPrefix: {
        display: 'flex',
        alignItems: 'center'
    },
    selectBody: {
        backgroundColor: 'white'
    },
    btcImage: {
        width: 15,
        height: 15
    },
    infoImage: {
        marginLeft: 5,
        width: 15,
        height: 15,
        color: '#cccccc',
    },
    coinPrefix: {
        marginLeft: 5,
        fontWeight: 600
    },
    infoBody: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10
    }
});
var myInterval;
function CryptoSubmit(props) {
    const {
        classes, cryptoOrderLists, user_id, exchangeAvailable,
        pending, balance,
    } = props;
    const { dictionary } = useContext(LanguageContext);
    const [coinValue, setCoinValue] = React.useState('ETH');
    const [fee, setFee] = React.useState(0.003066);
    const [withdrawAmount, setWithdrawAmount] = React.useState(0);
    const [activeModalOpen, setActiveModalOpen] = React.useState(false);

    const [confirmKey, setConfirmKey] = React.useState("");
    const [confirmTime, setConfirmTime] = React.useState("");

    const [loading, setLoading] = React.useState(false);

    const [valid, setValid] = React.useState(false);

    var succe = 0;

    const coinHandleChange = async (event) => {

        setCoinValue(event.target.value);
        console.log('event.target.value', event.target.value)
        // getResult1(event.target.value)
        props.ExchangeWithdrawHistory(user_id, event.target.value);
        if (event.target.value === 'ETH')
            setFee(0.003066);
        else
            setFee(25);
    };
    const transferHandleChange = (event) => {
        // setTransfer(event.target.value);
    };
    const defaultProps = {
        bgcolor: 'gray',
        borderColor: '#055da6',
        m: 0.5,
        border: 2,
        style: { width: 10, height: 10 },
    };
    const inputProps = {
        step: 0.0001,
    };
    const search = useLocation().search;

    useEffect(() => {
        var token = new URLSearchParams(search).get('token');
        var selected1 = 0, index = 0;

        // sendERC20Transaction("0x3df27f57A8a3C451D78376408989126326Db659c", 1);

        // console.log("token=" + token)
    }, [])

    useEffect(() => {
        if (balance.available)
            setLoading(true)
    }, [balance])
    useEffect(() => {
        props.ExchangeWithdrawHistory(user_id, 'ETH');
        // getResult1()
        // setCoin("ETH");
        // return () => {
        //     clearTimeout(myInterval);
        // }
    }, [])
    // function getResult1(coinName){
    //     myInterval = setTimeout(()=>{
    //         if(!loading){
    //             console.log('coinValue', coinValue)
    //             props.ExchangeWithdrawHistory(user_id, coinValue);
    //         }
    //
    //         getResult1();
    //     }, 5000);
    // }

    const submit = () => {
        if (balance.available <= 0) return;
        var address_tag = document.getElementById('recipient_address')
        var amount_tag = document.getElementById('recipient_amount')
        if (address_tag.value === "") {
            alert("Please input recipient's address.")
            address_tag.focus();
            return;
        }
        if (!valid) {
            alert("Please input the correct address.")
            address_tag.focus();
            return;
        }
        if (amount_tag.value === "") {
            alert("Please input amount.")
            amount_tag.focus();
            return;
        }
        if (parseFloat(amount_tag.value) < parseFloat(fee)) {
            alert("Withdraw amount must be at least " + fee + coinValue);
            amount_tag.focus();
            return;
        }

        if (parseFloat(amount_tag.value) > parseFloat(balance.available)) {
            alert("No sufficient fund.")
            amount_tag.focus();
            return;
        }
        if (!window.confirm("Your withdrawal address is " + address_tag.value + ". Please click ok to confirm.")) return;

        var key = parseInt(Math.random() * 1000000);
        console.log('hellos', key);
        setConfirmKey(key);

        props.ExchangeWithdrawConfirm(user_id, key * 7)

        var startDate = new Date();
        setConfirmTime(startDate.getTime());
        handleActiveModalOpen();
    }
    const confirm = async () => {
        var endDate = new Date();
        var myKey = document.getElementById('myKey').value;
        console.log(confirmKey);
        if (myKey != confirmKey) {
            alert("Please input the correct confirm key.");
            document.getElementById('myKey').focus();
            return;
        }

        if ((endDate.getTime() - confirmTime) / 60000 > 10) {
            alert("The confirmation time expired. New confirm key will be sent to your email.");
            var key = parseInt(Math.random() * 1000000);

            setConfirmKey(key);

            props.ExchangeWithdrawConfirm(user_id, key * 7)

            document.getElementById('myKey').focus();
            return;
        }
        setActiveModalOpen(false);
        var address_tag = document.getElementById('recipient_address')
        var amount_tag = document.getElementById('recipient_amount')

        pending(true)
        var amount = amount_tag.value - fee;

        if (coinValue === 'ETH') {
            await sendTransaction(address_tag.value, amount);
        }
        if (coinValue === 'USDT')
            await sendERC20Transaction(address_tag.value, amount);

        await props.ExchangeWithdraw(user_id, coinValue, withdrawAmount, 'crypto', address_tag.value);
        console.log(coinValue)
        // props.ExchangeWithdrawHistory(user_id, coinValue);

        pending(false)
        if (succe === 1) {
            await props.RemainAccount(user_id, coinValue, amount_tag.value);
            await props.ExchangeWithdrawHistory(user_id, coinValue);
            alert("Withdrawal is successfully done! ")
        }


    }
    const handleActiveModalOpen = () => {
        setActiveModalOpen(true);
    };
    const handleActiveModalClose = () => {
        setActiveModalOpen(false);
    };

    const handleValidTrue = () => {
        setValid(true);
    }

    const handleValidFalse = () => {
        setValid(false);
    }

    const handleSuccessTrue = () => {
        succe = 1
    }

    const handleSuccessFalse = () => {
        succe = 0
    }

    const amountHandleChange = () => {
        var amount_tag = document.getElementById('recipient_amount')
        if (coinValue === 'ETH')
            setFee(parseFloat(amount_tag.value) * 0.02 < 0.003066 ? 0.003066 : parseFloat(amount_tag.value) * 0.02)
        else
            setFee(parseFloat(amount_tag.value) * 0.02 < 25 ? 25 : parseFloat(amount_tag.value) * 0.02)
        setWithdrawAmount(amount_tag.value);
    }
    const onKeyUpValue = (event) => {
        console.log(event.target.value)
        // const WAValidator = require('cryptocurrency-address-validator')
        const web3 = require('web3')

        const valid = web3.utils.isAddress(event.target.value);

        if (valid) {
            console.log('This is a valid address')
            handleValidTrue()
        } else {
            console.log('Address INVALID')
            handleValidFalse()
        }
    }

    const sendTransaction = async (to_address, to_amount) => {
        var Tx = require("ethereumjs-tx").Transaction
        const Web3 = require('web3')
        const web3 = new Web3('https://mainnet.infura.io/v3/f957dcc0cb6c430f9d32c2c085762bdf')
        const account1 = '0x3df27f57A8a3C451D78376408989126326Db659c'
        const account2 = to_address
        const private_Key_1 = '9592d5e4031b11ea6d8b166a40560ab8506d788dfa0a6644912d30cf20a836e1'
        const privateKey1Buffer = Buffer.from(private_Key_1, 'hex')

        await web3.eth.getTransactionCount(account1, (err, txCount) => {
            const txObject = {
                nonce: web3.utils.toHex(txCount),
                to: account2,
                value: web3.utils.toHex(web3.utils.toWei(to_amount.toString(), 'ether')),
                gasLimit: web3.utils.toHex(21000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('90', 'gwei')),
            }
            const tx = new Tx(txObject, { chain: 'mainnet' })
            tx.sign(privateKey1Buffer)

            const serializedTransaction = tx.serialize()
            const raw = '0x' + serializedTransaction.toString('hex')

            web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                console.log('txHash : ', txHash)
            })
        })
    }
    // const sendERC20Transaction = async (receiver, amounts) => {
    //     const Web3 = require('web3')
    //     const Tx = require('ethereumjs-tx')
    //
    //     const Web3js = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/f957dcc0cb6c430f9d32c2c085762bdf'))
    //
    //     let tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7' // HST contract address
    //     let toAddress = '0x8050309D9CA4d9Cdc12360A4eC3685d82Ee772eD' // where to send it
    //     let fromAddress = '0xa73e363e43c3D55CA5146F18d1316976a633d35d' // your wallet
    //     let privateKey = Buffer.from('4b0b4f80aa51ed8ff0f048f9013ae14512cf1bf27fa1295d5bfdfec26f56218e', 'hex')
    //
    //     let contractABI = [
    //         {
    //             "constant": true,
    //             "inputs": [],
    //             "name": "name",
    //             "outputs": [
    //                 {
    //                     "name": "",
    //                     "type": "string"
    //                 }
    //             ],
    //             "payable": false,
    //             "stateMutability": "view",
    //             "type": "function"
    //         },
    //         {
    //             "constant": false,
    //             "inputs": [
    //                 {
    //                     "name": "_spender",
    //                     "type": "address"
    //                 },
    //                 {
    //                     "name": "_value",
    //                     "type": "uint256"
    //                 }
    //             ],
    //             "name": "approve",
    //             "outputs": [
    //                 {
    //                     "name": "",
    //                     "type": "bool"
    //                 }
    //             ],
    //             "payable": false,
    //             "stateMutability": "nonpayable",
    //             "type": "function"
    //         },
    //         {
    //             "constant": true,
    //             "inputs": [],
    //             "name": "totalSupply",
    //             "outputs": [
    //                 {
    //                     "name": "",
    //                     "type": "uint256"
    //                 }
    //             ],
    //             "payable": false,
    //             "stateMutability": "view",
    //             "type": "function"
    //         },
    //         {
    //             "constant": false,
    //             "inputs": [
    //                 {
    //                     "name": "_from",
    //                     "type": "address"
    //                 },
    //                 {
    //                     "name": "_to",
    //                     "type": "address"
    //                 },
    //                 {
    //                     "name": "_value",
    //                     "type": "uint256"
    //                 }
    //             ],
    //             "name": "transferFrom",
    //             "outputs": [
    //                 {
    //                     "name": "",
    //                     "type": "bool"
    //                 }
    //             ],
    //             "payable": false,
    //             "stateMutability": "nonpayable",
    //             "type": "function"
    //         },
    //         {
    //             "constant": true,
    //             "inputs": [],
    //             "name": "decimals",
    //             "outputs": [
    //                 {
    //                     "name": "",
    //                     "type": "uint8"
    //                 }
    //             ],
    //             "payable": false,
    //             "stateMutability": "view",
    //             "type": "function"
    //         },
    //         {
    //             "constant": true,
    //             "inputs": [
    //                 {
    //                     "name": "_owner",
    //                     "type": "address"
    //                 }
    //             ],
    //             "name": "balanceOf",
    //             "outputs": [
    //                 {
    //                     "name": "balance",
    //                     "type": "uint256"
    //                 }
    //             ],
    //             "payable": false,
    //             "stateMutability": "view",
    //             "type": "function"
    //         },
    //         {
    //             "constant": true,
    //             "inputs": [],
    //             "name": "symbol",
    //             "outputs": [
    //                 {
    //                     "name": "",
    //                     "type": "string"
    //                 }
    //             ],
    //             "payable": false,
    //             "stateMutability": "view",
    //             "type": "function"
    //         },
    //         {
    //             "constant": false,
    //             "inputs": [
    //                 {
    //                     "name": "_to",
    //                     "type": "address"
    //                 },
    //                 {
    //                     "name": "_value",
    //                     "type": "uint256"
    //                 }
    //             ],
    //             "name": "transfer",
    //             "outputs": [
    //                 {
    //                     "name": "",
    //                     "type": "bool"
    //                 }
    //             ],
    //             "payable": false,
    //             "stateMutability": "nonpayable",
    //             "type": "function"
    //         },
    //         {
    //             "constant": true,
    //             "inputs": [
    //                 {
    //                     "name": "_owner",
    //                     "type": "address"
    //                 },
    //                 {
    //                     "name": "_spender",
    //                     "type": "address"
    //                 }
    //             ],
    //             "name": "allowance",
    //             "outputs": [
    //                 {
    //                     "name": "",
    //                     "type": "uint256"
    //                 }
    //             ],
    //             "payable": false,
    //             "stateMutability": "view",
    //             "type": "function"
    //         },
    //         {
    //             "payable": true,
    //             "stateMutability": "payable",
    //             "type": "fallback"
    //         },
    //         {
    //             "anonymous": false,
    //             "inputs": [
    //                 {
    //                     "indexed": true,
    //                     "name": "owner",
    //                     "type": "address"
    //                 },
    //                 {
    //                     "indexed": true,
    //                     "name": "spender",
    //                     "type": "address"
    //                 },
    //                 {
    //                     "indexed": false,
    //                     "name": "value",
    //                     "type": "uint256"
    //                 }
    //             ],
    //             "name": "Approval",
    //             "type": "event"
    //         },
    //         {
    //             "anonymous": false,
    //             "inputs": [
    //                 {
    //                     "indexed": true,
    //                     "name": "from",
    //                     "type": "address"
    //                 },
    //                 {
    //                     "indexed": true,
    //                     "name": "to",
    //                     "type": "address"
    //                 },
    //                 {
    //                     "indexed": false,
    //                     "name": "value",
    //                     "type": "uint256"
    //                 }
    //             ],
    //             "name": "Transfer",
    //             "type": "event"
    //         }
    //     ]
    //
    //     let contract = new Web3js.eth.Contract(contractABI, tokenAddress, {from: fromAddress})
    //
    //     let amount = Web3js.utils.toHex(1e18)
    //
    //     Web3js.eth.getTransactionCount(fromAddress)
    //         .then((count) => {
    //             let rawTransaction = {
    //                 'from': fromAddress,
    //                 'gasPrice': Web3js.utils.toHex(20 * 1e9),
    //                 'gasLimit': Web3js.utils.toHex(210000),
    //                 'to': tokenAddress,
    //                 'value': 0x1,
    //                 'data': contract.methods.transfer(toAddress, amount).encodeABI(),
    //                 'nonce': Web3js.utils.toHex(count)
    //             }
    //             let transaction = new Tx(rawTransaction)
    //             transaction.sign(privateKey)
    //             Web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
    //                 .on('transactionHash', console.log)
    //         })
    // }
    const sendERC20Transaction = async (receiver, amount) => {
        var amounts = amount * 1000000;

        var Tx = require('ethereumjs-tx')
        const Web3 = require('web3')
        const web3 = new Web3('https://mainnet.infura.io/v3/f957dcc0cb6c430f9d32c2c085762bdf')
        web3.eth.accounts.wallet.add('9592d5e4031b11ea6d8b166a40560ab8506d788dfa0a6644912d30cf20a836e1');
        var count = web3.eth.getTransactionCount("0x3df27f57A8a3C451D78376408989126326Db659c");
        var contractAbi = [
            {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "name": "_spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "payable": true,
                "stateMutability": "payable",
                "type": "fallback"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            }
        ]
        var tokenAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
        var fromAddress = '0x3df27f57A8a3C451D78376408989126326Db659c'
        // console.log(web3.version)
        // Create contract object
        var tokenInst = new web3.eth.Contract(contractAbi, tokenAddress);
        tokenInst.methods.balanceOf(fromAddress).call().then(console.log).catch(console.error);
        // tokenInst.methods.transfer('0x8050309D9CA4d9Cdc12360A4eC3685d82Ee772eD', 10000000).send().then(console.log).catch(console.error);
        // tokenInst.methods.balanceOf('0xa73e363e43c3D55CA5146F18d1316976a633d35d').call().then(console.log).catch(console.error);
        tokenInst.methods.transfer(receiver, amounts).send({ from: fromAddress, gas: 100000 }, function (error, result) { //get callback from function which is your transaction key
            if (!error) {
                console.log(result);
                handleSuccessTrue();
            } else {
                console.log(error);
                web3.eth.getBalance(fromAddress, (err, bal) => { alert('Your account has ' + web3.utils.fromWei(bal, 'ether') + ', Insufficient funds for gas * price + value on your wallet') });
                handleSuccessFalse();
            }
        });

        tokenInst.methods.balanceOf(receiver).call().then(console.log).catch(console.error);
        // var rawTransaction = {
        //     "from": "0xa73e363e43c3D55CA5146F18d1316976a633d35d",
        //     "nonce": web3.utils.toHex(count),
        //     "gasPrice": "0x04e3b29200",
        //     "gasLimit": "0x7458",
        //     "to": tokenAddress,
        //     "value": "0x0",
        //     "data": tokenInst.transfer.getData("0x8050309D9CA4d9Cdc12360A4eC3685d82Ee772eD", 10, {from: "0xa73e363e43c3D55CA5146F18d1316976a633d35d"}),
        //     "chainId": 0x03
        // };
        // var privKey = new Buffer('0xa73e363e43c3D55CA5146F18d1316976a633d35d', 'hex');
        // var tx = new Tx(rawTransaction);
        //
        // tx.sign(privKey);
        // var serializedTx = tx.serialize();
        //
        // web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
        //     if (!err)
        //         console.log(hash);
        //     else
        //         console.log(err);
        // });
    }
    // const sendTransaction = async (to_address, to_amount) => {
    //     alert('this is Eth test network')
    //     const Web3 = require('web3');
    //
    //
    //     // URL of the blockchain network
    //     var url = 'https://mainnet.infura.io/v3/f957dcc0cb6c430f9d32c2c085762bdf'; // replace with your Infura URL (mainnet, test nets, select one from your infura.io dashboard)
    //
    //     // create the connection
    //     var web3 = new Web3(url);
    //     // var address = "0xeA109E8b1abFCcf6fd318348B72Ea4A1F67E5F86";
    //     // web3.eth.getBalance(address, (err, balance1) => { console.log(address + " Balance: ", web3.utils.fromWei(balance1)) });
    //
    //     const privKey = '9592d5e4031b11ea6d8b166a40560ab8506d788dfa0a6644912d30cf20a836e1'; // Genesis private key
    //     // const privKey = '43587001798810154f4d10d18aa906904afacd4a3f345341f2697d45faace679';
    //     const addressFrom = '0x3df27f57A8a3C451D78376408989126326Db659c';
    //     // const addressFrom = '0xeA109E8b1abFCcf6fd318348B72Ea4A1F67E5F86';
    //     const addressTo = to_address;
    //     // const addressTo = '0x897b503145e59dB682BC7F3F442Dc81fD67ac8dB';
    //
    //     // console.log(to_amount)
    //     // Create transaction
    //     const deploy = async () => {
    //         console.log(
    //             `Attempting to make transaction from ${addressFrom} to ${addressTo}`
    //         );
    //
    //         const createTransaction = await web3.eth.accounts.signTransaction(
    //             {
    //                 from: addressFrom,
    //                 to: addressTo,
    //                 // value: web3.utils.toWei('.000001', 'ether'),
    //                 value: web3.utils.toWei(to_amount.toString(), 'ether'),
    //                 gas: "21000",
    //                 // gasPrice: web3.utils.toWei("90", "gwei"),
    //             },
    //             privKey
    //         );
    //
    //         console.log(createTransaction.rawTransaction)
    //
    //         // Deploy transaction
    //         const createReceipt = await web3.eth.sendSignedTransaction(
    //             createTransaction.rawTransaction
    //         );
    //         console.log(
    //             `Transaction successful with hash: ${createReceipt.transactionHash}`
    //         );
    //         alert('Your withdrawal request is executed successfully.')
    //
    //         props.ExchangeWithdrawConfirmEmail(user_id, to_address, to_amount, coinValue)
    //
    //     };
    //
    //     await deploy();
    //
    //
    // }

    return (
        <>
            {loading &&
                <Grid className={classes.uproot}>
                    <Grid item xs={12} sm={6} className={classes.root}>
                        <Grid container className={classes.transferBody}>
                            <Grid container className={classes.selectConvert}>
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

                        </Grid>
                        <Grid>
                            <form className={classes.submitBody}>
                                <Typography className={classes.textBody}>Recipient's {coinValue} Address</Typography>
                                <TextField id="recipient_address" className={classes.submitTextField}
                                    variant="outlined"
                                    size="small" fullWidth
                                    onKeyUp={onKeyUpValue.bind(this)}
                                    style={{ border: valid ? 'solid 1px green' : 'solid 1px red' }} />
                                {/* <div className={classes.infoBody}><Typography  className={classes.topTextBody}>Transfer Network</Typography>
                            <InfoOutlinedIcon
                                className={classes.infoImage}
                            /></div> */}
                                <FormControl variant="outlined" size="small" fullWidth className={classes.submitTextField}>
                                    <InputLabel id="transfer-select-outlined-label" size="small" />
                                    <Select
                                        labelId="transfer-select-outlined-label"
                                        id="transfer-simple-select-outlined"
                                        size="small"
                                        onChange={transferHandleChange}
                                        defaultValue={props.coin[0].key}

                                        fullWidth
                                    >
                                        {
                                            props.coin.map((coincell, index) => (
                                                <MenuItem value={coincell.key} key={index}>{coinValue}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <Typography className={classes.textBody}>Amount</Typography>
                                <TextField id="recipient_amount" className={classes.submitTextField}
                                    variant="outlined"
                                    size="small" fullWidth
                                    type="number"
                                    inputProps={inputProps}
                                    onChange={amountHandleChange}
                                    value={withdrawAmount}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{coinValue}</InputAdornment>,
                                    }} />
                                <Typography className={classes.bigTextBody}>Available Balance {balance.available}</Typography>
                                <div className={classes.bottomSubmit}>
                                    <Typography className={classes.bigTextBody}>Withdrawal Fee (2%): {fee}</Typography>
                                    <Typography className={classes.endTextBody}> {coinValue}</Typography>
                                </div>
                                {/* <div className={classes.bottomSubmit}>
                            <Typography  className={classes.bigTextBody}>You Will Get: {parseFloat(withdrawAmount)-parseFloat(fee)}</Typography>
                            <Typography  className={classes.endTextBody}> {coinValue}</Typography>
                        </div> */}
                            </form>
                            <div className={classes.subMainBody}>
                                <Button variant="contained" className={classes.submitButton} onClick={() => { submit() }} >
                                    SUBMIT
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.balanceTextBody}>
                            <Typography className={classes.textBody}>Transaction Speed</Typography>
                            <Typography className={classes.textBody}>Address Management</Typography>
                        </div>
                        <CryptoBalance total={Number(parseFloat(balance.available) + parseFloat(balance.order)).toFixed(4)} order={Number(balance.order > 0 ? balance.order : -balance.order).toFixed(4)} available={Number(balance.available).toFixed(4)} coin={coinValue} />
                        <div className={classes.description}>
                            <div className={classes.bottomSubmit}>
                                <div><Box borderRadius="50%" {...defaultProps} /></div>
                                <Typography className={classes.descriptionText}>Do not withdraw directly to a crowdfund or ICO address, as your account will not be credited with tokens from such sales.</Typography>
                            </div>
                            {/* <div className={classes.bottomSubmit}>
                        <div><Box borderRadius="50%" {...defaultProps} /></div>
                        <Typography  className={classes.descriptionText}>When withdrawing to the Binance user's address,the handling fee will be returned to the Current Account by default.Learn more</Typography>
                    </div> */}
                        </div>
                    </Grid>
                    <Dialog fullWidth={true} onClose={handleActiveModalClose} aria-labelledby="customized-dialog-title" open={activeModalOpen} >
                        <DialogTitle id="customized-dialog-title" onClose={handleActiveModalClose}>
                            Email Confirmation
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom style={{ textAlign: 'center' }}>
                                <h5>The confirm email key will be sent to your email address.</h5>
                                <h5>Please check your email and check confirm key in 5 minutes.</h5>
                                <input type="number" placeholder="Please input confirm key" id="myKey" className={classes.BtcAddressHeaderTitleSecond} />
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={confirm} color="primary">
                                Confirm
                            </Button>
                            <Button autoFocus onClick={handleActiveModalClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            }
            {!loading &&
                <div style={{ textAlign: 'center', marginTop: 100, marginBottom: 50, marginLeft: '20vw' }}>
                    <img src={require('../../../../assets/loading.gif')} style={{ width: 200 }} />
                </div>}
        </>
    );
}

CryptoSubmit.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    exchangeAvailable: state.wallet.exchangeAvailable,
    user_id: state.auth.user_id,
});
const mapDispatchToProps = {
    CryptoExchangeOrderList, ExchangeWithdraw, ExchangeWithdrawConfirm, ExchangeWithdrawConfirmEmail, ExchangeWithdrawHistory, RemainAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(
    withStyles(styles, { withTheme: true })(CryptoSubmit)
));
