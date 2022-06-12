import React, { useEffect } from "react";
import axios from "axios";
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import WalletTopbar from "../../components/Wallets/WalletBars/WalletTopBar";
import WalletLeftBar from "../../components/Wallets/WalletBars/WalletLeftBar";
import WalletProfileSecurity from "../../components/Wallets/WalletBars/WalletRightBar";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import FutureImage from '../../assets/future.png';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import {AccountInfo,AmountTransfer} from "../../redux/actions/wallet"
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
        width: "-webkit-fill-available",
        textAlign: 'center'
    },
    headText: {
        marginTop: 40,
        fontSize: 45
    },
    fundText: {
        fontSize: 18,
        color: theme.palette.primary.main,
    },
    inputBody: {
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
        marginTop: 15,
        justifyContent: 'center',
    },
    bodyText: {
        fontSize: 14,
        color: 'black',
        alignSelf: 'center',
        fontWeight: 500,
        margin: '5px 2px'
    },
    amountInput: {
        height: 25,
        padding: 0,
        paddingLeft: 5,
        margin: 0,
        fontSize: 14,
        width: 160,
    },
    coinSelect: {
        maxHeight: 25,
        padding: 0,
        margin: 0,
        fontSize: 14
    },
    formControl: {
        margin: '5px 2px',
        alignSelf: 'center',
    },
    transferButton: {
        borderRadius: 5,
        background: theme.palette.primary.main,
        textTransform: 'none',
        color: 'white',
        padding: '0px 10px',
        fontSize: 14,
        textDecoration: "none !important",
        height: 30
    },
    table: {
        margin: 'auto',
        marginTop: 20,
        minWidth: 800,
        width: '80%',
        display: "flex",
        justifyContent: 'center',
        borderColor: '#96aeaf',
        border: '1px solid',
    },
    tableBodyCell: {
      
        borderColor: '#e3eff0',
        border: '1px solid',
        paddingRight: 5,
        fontWeight: 500
        
    },
    tableBodyCellText: {
        borderBottom: '1px dotted',
        borderRight: '1px solid transparent',  
        cursor: "pointer",
        textDecoration: "none !important",
    },
    tableBodyActionCell: {
        borderColor: '#e3eff0',
        border: '1px solid',
        paddingRight: 5,
        cursor: "pointer",
        fontWeight: 500
    },
    transferMainBody: {
        overflowX: 'auto'
    },
    tableHeadCell: {
        borderColor: '#e3eff0',
        border: '1px solid',
        backgroundColor: theme.palette.primary.footer,
        color: 'white',
        fontWeight: 500
    },
    footerBody: {
        [theme.breakpoints.up('sm')]: {
            display: "flex",
        },
        justifyContent: "center",
        margin: '2%'
    },
    footerText: {
        fontSize: 16,
        color: 'black'
    },
    footerLinkText: {
        fontSize: 16,
        color: theme.palette.primary.main,
        cursor: "pointer",
        fontWeight: 500
    },
    transferFlex: {
        display: "flex",
        justifyContent: "center"
    }
}));

// function createData(coin, exchange, margin, futures, totalBalance) {
//     return { coin, exchange, margin, futures, totalBalance};
// }

// const rows = [
//     createData('USDT', '0.000001', '0.00000020', '0.00', '0'),
//     createData('ETH', '0.0000002', '0', '0', '0'),
// ];

const TransferBalance = (props) => {

    const classes = useStyles();
    const { selectLanding, isAuthenticated,user_id,accountInfo ,activateTransferState} = props;
    const [coin, setCoin] = React.useState('USDT');
    const [amount, setAmount] = React.useState();
    const [fromAccount, setFromAccount] = React.useState('Exchange');
    const [toAccount, setToAccount] = React.useState('Exchange');
    const [transferAlert, setTransferAlert] = React.useState(false);
    const [transferAlertContent, setTransferAlertContent] = React.useState("");

    const [tt,setTt] = React.useState("asdf");
    const ChangeCoin = (event) => {
        setCoin(event.target.value);
    };
    
    const ChangeAmount = (event) => {
        setAmount(event.target.value);
    };

    const ChangeAccountName = (event) => {
        setFromAccount(event.target.value);
    };

    const ChangeToAccount = (event) => {
        setToAccount(event.target.value);
    }
    const ChangeCellState = (account,coin,amount) => {
        setFromAccount(account);
        setAmount(amount);
        setCoin(coin);
    }

    const handleTransfer = (state) =>{
        if(typeof(amount) == 'undefined') {
            setTransferAlert(true);
            setTransferAlertContent("Amount must be a number.");
        }else if(toAccount == fromAccount) {
            setTransferAlert(true);
            setTransferAlertContent("Please specify different source and destination accounts.");
        } else if(amount > state.detail_data[coin][fromAccount.toLowerCase()] || typeof(state.detail_data[coin][fromAccount.toLowerCase()]) == 'undefined'){
            setTransferAlert(true);
            setTransferAlertContent("Not enough "+coin+" in wink account.");
        } else {
            
            props.AmountTransfer(amount,coin,fromAccount,toAccount,user_id);
            props.AccountInfo(user_id);
            setTransferAlert(true);
            setTransferAlertContent("Transferred "+amount+" "+coin+" from "+fromAccount+" to "+toAccount+" account.");    
        }
        
    }

    const handleTransferAlertClose = () => {
        setTransferAlert(false);
    }    


    useEffect(() => {
        setFromAccount(activateTransferState);
      
    },[]);

    useEffect(() => {
        selectLanding();
    }, [selectLanding]);

    useEffect(() => {
        console.log(isAuthenticated)
    }, [isAuthenticated])

    useEffect(() => {
        props.AccountInfo(user_id);
    }, [user_id]);

    return (
        <Box className={classes.root}>
            <WalletTopbar name="Transfer Balances" />
            <Box className={classes.futureBody}>
                <WalletLeftBar name="Transfer Balances" />
                <Box className={classes.mainBody}>
                    <Typography className={classes.headText}>TRANSFER BALANCES</Typography>
                    <Typography className={classes.fundText}>Move funds between your different accounts.</Typography>
                    <Box className={classes.inputBody}>
                        <Typography className={classes.bodyText}>Transfer</Typography>
                        <Box className={classes.formControl}>
                            <TextField
                                id="filled-size-normal"
                                variant="outlined"
                                placeholder="Amount"
                                value = {amount}
                                onChange = {ChangeAmount}
                                InputProps={{ classes: { input: classes.amountInput} }}
                            />
                        </Box>
                        <Box className={classes.formControl}>
                            <FormControl variant="outlined" size="small">
                                <InputLabel id="coin-select-outlined-label" />
                                <Select
                                    native
                                    labelId="coin-select-outlined-label"
                                    id="coin-simple-select-outlined"
                                    value={coin}
                                    defaultValue={coin}
                                    onChange={ChangeCoin}
                                    className={classes.coinSelect}
                                >
                                    {
                                        accountInfo.map((info,i) => 
                                            info.token_info.map((row,j) => 
                                                typeof(info.token_amount[row]) !='undefined' && info.token_amount[row] !=0 && (
                                                <option value={row} key={j}>{row}</option>
                                            ))
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <div className={classes.transferFlex}>
                            <Typography className={classes.bodyText}>from</Typography>
                            <Box className={classes.formControl}>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel id="from-select-outlined-label" />
                                    <Select
                                        native
                                        labelId="from-select-outlined-label"
                                        id="from-simple-select-outlined"
                                        value={fromAccount}
                                        onChange = {ChangeAccountName}
                                        defaultValue={fromAccount}
                                        className={classes.coinSelect}
                                    >
                                        <option value={"Exchange"}>Exchange</option>
                                        {accountInfo.map((state, i) =>(
                                        state.margin_state == true &&<option value={"Margin"} key={i}>Margin</option>
                                        ))}
                                        {accountInfo.map((state, i) =>(
                                        state.futures_state == true &&<option value={"Futures"} key={i}>Futures</option>
                                        ))}
                                        {accountInfo.map((state, i) =>(
                                        state.savings_state == true &&<option value={"Savings"} key={i}>Savings</option>
                                        ))}
                                        {accountInfo.map((state, i) =>(
                                        state.pool_state == true &&<option value={"Pool"} key={i}>Pool</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Typography className={classes.bodyText}>account</Typography>
                        </div>
                        <div className={classes.transferFlex}>
                            <Typography className={classes.bodyText}>to</Typography>
                            <Box className={classes.formControl}>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel id="to-select-outlined-label" />
                                    <Select
                                        native
                                        labelId="to-select-outlined-label"
                                        id="to-simple-select-outlined"
                                        onChange={ChangeToAccount}
                                        defaultValue={toAccount}
                                        value = {toAccount}
                                        className={classes.coinSelect}
                                    >
                                        <option value={"Exchange"}>Exchange</option>
                                        {accountInfo.map((state, i) =>(
                                        state.margin_state == true &&<option value={"Margin"} key={i}>Margin</option>
                                        ))}
                                        {accountInfo.map((state, i) =>(
                                        state.futures_state == true &&<option value={"Futures"} key={i}>Futures</option>
                                        ))}
                                        {accountInfo.map((state, i) =>(
                                        state.savings_state == true &&<option value={"Savings"} key={i}>Savings</option>
                                        ))}
                                        {accountInfo.map((state, i) =>(
                                        state.pool_state == true &&<option value={"Pool"} key={i}>Pool</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Typography className={classes.bodyText}>account.</Typography>
                        </div>
                        {accountInfo.map((state, i) =>(
                        <Button key = {i} variant="contained" className={classes.transferButton} onClick = {()=>handleTransfer(state)}>
                            Transfer
                        </Button>
                        ))}
                    </Box>
                    <Box className={classes.transferMainBody}>
                        <Box className={classes.table}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" className={classes.tableHeadCell}>Coin</TableCell>

                                        <TableCell align="left" className={classes.tableHeadCell}>Exchange</TableCell>
                                        {accountInfo.map((state, i) =>(
                                            state.margin_state == true &&
                                            <TableCell key = {i} align="left" className={classes.tableHeadCell}>Margin</TableCell>
                                        ))}
                                        {accountInfo.map((state, i) =>(
                                            state.futures_state == true &&
                                            <TableCell key = {i} align="left" className={classes.tableHeadCell}>Futures</TableCell>
                                        ))}
                                        {accountInfo.map((state, i) =>(
                                            state.savings_state == true &&
                                            <TableCell key = {i} align="left" className={classes.tableHeadCell}>Savings</TableCell>
                                        ))}
                                        {accountInfo.map((state, i) =>(
                                            state.pool_state == true &&
                                            <TableCell key = {i} align="left" className={classes.tableHeadCell}>Pool</TableCell>
                                        ))}
                                        <TableCell align="left" className={classes.tableHeadCell}>Total Balance</TableCell>
                                    </TableRow>
                                </TableHead>
                                {accountInfo.map((info,k) => (
                                <TableBody key = {k}>
                                    
                                        {info.token_info.map((row,j) => 
                                        typeof(info.token_amount[row]) !='undefined' && info.token_amount[row] !=0 &&
                                        (<TableRow key={j}>
                                            <TableCell component="th" scope="row" className={classes.tableBodyCell}>
                                                {row}
                                            </TableCell>
                                            {accountInfo.map((state, i) =>(
                                                <TableCell key = {i} align="right" className={classes.tableBodyCell} >
                                                    {(typeof(state.detail_data[row]["exchange"]) ==="undefined"||parseFloat(state.detail_data[row]["exchange"])==0)?'-': <Link onClick = {()=>ChangeCellState("Exchange",row,state.detail_data[row]["exchange"])} className={classes.tableBodyCellText}>{parseFloat(state.detail_data[row]["exchange"]).toFixed(8)}</Link>}
                                                </TableCell>
                                            ))}
                                            {accountInfo.map((state, i) =>(
                                                state.margin_state == true &&
                                                <TableCell key = {i} align="right" className={classes.tableBodyCell} >
                                                    {(typeof(state.detail_data[row]["margin"]) ==="undefined"||parseFloat(state.detail_data[row]["margin"])==0)?'-': <Link onClick = {()=>ChangeCellState("Margin",row,state.detail_data[row]["margin"])} className={classes.tableBodyCellText}>{parseFloat(state.detail_data[row]["margin"]).toFixed(8)}</Link>}
                                                </TableCell>
                                            ))}
                                            {accountInfo.map((state, i) =>(
                                                state.futures_state == true &&
                                                <TableCell key = {i} align="right" className={classes.tableBodyCell} >
                                                    {(typeof(state.detail_data[row]["futures"]) ==="undefined"||parseFloat(state.detail_data[row]["futures"])==0)?'-': <Link onClick = {()=>ChangeCellState("Futures",row,state.detail_data[row]["futures"])} className={classes.tableBodyCellText}>{parseFloat(state.detail_data[row]["futures"]).toFixed(8)}</Link>}
                                                </TableCell>
                                            ))}
                                            {accountInfo.map((state, i) =>(
                                                state.savings_state == true &&
                                                <TableCell key = {i} align="right" className={classes.tableBodyCell} >
                                                    {(typeof(state.detail_data[row]["savings"]) ==="undefined"||parseFloat(state.detail_data[row]["savings"])==0)?'-': <Link onClick = {()=>ChangeCellState("Savings",row,state.detail_data[row]["savings"])} className={classes.tableBodyCellText}>{parseFloat(state.detail_data[row]["savings"]).toFixed(8)}</Link>}
                                                </TableCell>
                                            ))}
                                            {accountInfo.map((state, i) =>(
                                                state.pool_state == true &&
                                                <TableCell key = {i} align="right" className={classes.tableBodyCell} >
                                                    {(typeof(state.detail_data[row]["pool"]) ==="undefined"||parseFloat(state.detail_data[row]["pool"])==0)?'-': <Link onClick = {()=>ChangeCellState("Pool",row,state.detail_data[row]["pool"])} className={classes.tableBodyCellText}>{parseFloat(state.detail_data[row]["pool"]).toFixed(8)}</Link>}
                                                </TableCell>
                                            ))}
                                            {accountInfo.map((state, i) =>(
                                                <TableCell key = {i} align="right" className={classes.tableBodyCell}>{parseFloat(state.token_amount.row) == 0 ? '-': parseFloat(state.token_amount[row]).toFixed(8)}</TableCell>
                                            ))}
                                        </TableRow>)
                                        )}
                                </TableBody>
                                ))}
                            </Table>
                        </Box>
                    </Box>
                    {/* <Box className={classes.footerBody} >
                        <Typography className={classes.footerText}>Only showing your assets that are available for transfer. </Typography>
                        <Typography className={classes.footerLinkText}>View the full list of assets</Typography>
                    </Box> */}
                </Box>
                <WalletProfileSecurity/>
            </Box>
            <Dialog
                fullWidth
                open={transferAlert}
                // onClose={handleTransferAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {transferAlertContent}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                
                <Button onClick={handleTransferAlertClose} color="primary" autoFocus>
                    Okay
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

TransferBalance.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.auth.user_id,
    accountInfo : state.wallet.accountInfo,
    activateTransferState:state.wallet.activateTransferState
});

const mapDispatchToProps = {
    AccountInfo,AmountTransfer
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferBalance);
