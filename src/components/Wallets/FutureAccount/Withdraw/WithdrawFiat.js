import React, { useState, } from "react";

import {
    Button,
    Grid,
    Link,
    makeStyles,
    Paper,
    TextField,
    FormControlLabel,
    Checkbox,
    Card,
    Radio
} from '@material-ui/core';
// import jsonData from '../../../../resources/wallet.json';
import Hidden from "@material-ui/core/Hidden";
import Tatm from '../../../../assets/tatm.png';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from "@material-ui/core/Typography";
import CryptoBalance from "./CryptoBalance";
import Box from "@material-ui/core/Box";
import HistoryTable from "../HistoryTable";
import jsonData from "../../../../resources/depositcrypto.json";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        marginTop: 10,
        padding: 0,
    },
    transferForm: {
        border: '1px solid #bbb',
        borderRadius: 10,
        padding: 20,
    },
    fromError: {
        padding: 10,
        borderRadius: 5,
        color: 'red',
        border: '1px solid red',
        backgroundColor: '#F6E7E7'
    },
    checkbox: {
        marginTop: 25,
        padding: 10,
        border: '1px solid #bbb',
        borderRadius: 10
    },
    transferBtn: {
        marginTop: 20,
        width: '100%'
    },

    card1: {
        width: '30%',
        backgroundColor: theme.palette.primary.footer,
        borderRadius: 10,
        marginTop: 20,
        padding: 20,
    },
    card2: {
        width: '30%',
        backgroundColor: 'red',
        borderRadius: 10,
        marginTop: 20,
        padding: 20,
    },
    card3: {
        width: '30%',
        backgroundColor: '#e0a563',
        borderRadius: 10,
        marginTop: 20,
        padding: 20,
    },
    titleText: {
        fontSize: 12
    },
    currencyText: {
        fontSize: 18,
        [theme.breakpoints.down("md")]: {
            fontSize: 12
        },
    },

    radios: {
        width: '80%',
        background: '#bfebec',
        marginLeft: 30,
        marginTop: 50,
        padding: 20,
        borderRadius: 10
    },
    tabSavingTable: {
        width: '100%',
        marginTop: 40,
        border: '1px solid #bbb',
        borderRadius: 10,
    },
    flexibleHeader: {
        backgroundColor: '#bbb',
        padding: '10px 20px',
        [theme.breakpoints.down("md")]: {
            flexDirection: 'column'
        },
    },
    assignmentIcon: {
        marginTop: 20,
        width: 100,
        height: 100,
        color: theme.palette.primary.footer
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
    },
    withdrawFiatLeft: {
        padding: "1%"
    }
}));
const defaultProps = {
    bgcolor: 'gray',
    borderColor: '#055da6',
    m: 0.5,
    border: 2,
    style: { width: 10, height: 10 },
};

const currencies = [
    {
        value: 'USD',
        label: 'USD',
    },
    {
        value: 'EUR',
        label: 'EUR',
    },
    {
        value: 'BTC',
        label: 'BTC',
    },
    {
        value: 'JPY',
        label: 'JPY',
    },
];

const Fiat = () => {
    const classes = useStyles();
    const [currency1, setCurrency1] = React.useState('BTC');
    const [currency2, setCurrency2] = React.useState('EUR');
    const [fromError, setFromError] = React.useState(false);
    const [toError, setToError] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const handleChange1 = (event) => {
        setCurrency1(event.target.value);
    };

    const handleChange2 = (event) => {
        setCurrency2(event.target.value);
    };

    const handleCheckChange = () => {
        setChecked(!checked);
    };



    return (
        <Grid container>
            <Grid container direction={"row"} className={classes.responsivePanel}>
                <Grid item xs={12} sm={6} className={classes.withdrawFiatLeft}>
                    <Paper className={classes.transferForm}>
                        <form className={classes.root} Validate autoComplete="off">
                        <div>AMOUNT TO TRANSFER</div>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            name={'fromAmount'}
                            style={{width: '80%'}}
                        />
                        <TextField
                            select
                            value={currency1}
                            onChange={handleChange1}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            name={'fromType'}
                            style={{width: '20%'}}
                        >
                            {currencies.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>


                        <div style={{marginTop: 20}}>AMOUNT YOU RECEIVE</div>
                        <TextField id="outlined-basic" variant="outlined" name={'toAmount'} style={{width: '80%'}}/>
                        <TextField
                            select
                            value={currency2}
                            onChange={handleChange2}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            name={'toType'}
                            style={{width: '20%'}}
                        >
                            {currencies.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>

                        <Grid className={classes.checkbox}>
                            <FormControlLabel
                                control={<Checkbox checked={checked} onChange={handleCheckChange} name="checkedA" />}
                                label="I have read the Disclaimer and consent to Calahex providing my deposit address and user name simplex"
                            />
                        </Grid>

                        <Button variant="contained" color={"primary"} className={classes.transferBtn}>TRANSFER TO SIMPLEX ACCOUNT</Button>

                        <Grid container justify={"center"} alignItems={'center'} style={{marginTop: 20}}>Powered by
                            <img
                                src={Tatm}
                                alt="tatm logo" style={{width: 30}}
                            />
                            Simplex
                        </Grid>
                    </form>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} className={classes.withdrawFiatLeft}>
                    <div className={classes.balanceTextBody}>
                        <Typography  className={classes.textBody}>Transaction Speed></Typography>
                        <Typography  className={classes.textBody}>Address Management></Typography>
                    </div>
                    <CryptoBalance total ={jsonData.totalbalance} order = {jsonData.orderbalance}  available = {jsonData.availbalance}/>
                    <div className={classes.description}>
                        <div className={classes.bottomSubmit}>
                            <div><Box borderRadius="50%" {...defaultProps} /></div>
                            <Typography  className={classes.descriptionText}>Do not withdraw directly to a crowdfund or ICO address, as your account will not be credited with tokens from such sales.</Typography>
                        </div>
                        <div className={classes.bottomSubmit}>
                            <div><Box borderRadius="50%" {...defaultProps} /></div>
                            <Typography  className={classes.descriptionText}>When withdrawing to the Binance user's address,the handling fee will be returned to the Current Account by default.Learn more</Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>

            {/* <HistoryTable rows ={jsonData.history} name = 'Recent Withdrawal History'/> */}
        </Grid>
    )
}

export default Fiat;