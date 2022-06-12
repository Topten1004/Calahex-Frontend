import React, {useEffect} from "react";
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import WalletTopbar from "../../components/Wallets/WalletBars/WalletTopBar";
import WalletLeftBar from "../../components/Wallets/WalletBars/WalletLeftBar";
import WalletProfileSecurity from "../../components/Wallets/WalletBars/WalletRightBar";
import Button from "@material-ui/core/Button";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Collapse from "@material-ui/core/Collapse";
import MarginComponent from "../../components/Wallets/AccountsOverview/MarginComponent";
import FuturesComponent from "../../components/Wallets/AccountsOverview/FuturesComponent";
import SavingComponent from "../../components/Wallets/AccountsOverview/SavingComponent";
import PoolComponent from "../../components/Wallets/AccountsOverview/PoolComponent";
import {AccountInfo} from "../../redux/actions/wallet"
import {VerifyInfo} from "../../redux/actions/wallet"

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
        width: "-webkit-fill-available"
    },
    bodyHeader: {
        padding: '0px 15px',
        borderBottom: '1px solid #e8e8e8',
        display: "flex"
    },
    futureText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    hideButton: {
        borderRadius: 5,
        textTransform: 'none',
        color: 'black',
        backgroundColor: 'white',
        padding: '0px 10px',
        fontSize: 12,
        textDecoration: "none !important",
        height: 30,
        marginLeft: 30,
        alignSelf: 'center',
    },
    defaultButton: {
        borderRadius: 20,
        textTransform: 'none',
        color: 'black',
        backgroundColor: 'white',
        borderColor: '#c6c6c6',
        padding: '0px 30px',
        fontSize: 12,
        textDecoration: "none !important",
        height: 35,
        border: '1px solid',
        alignSelf: 'center',
        marginRight: 10
    },
    balanceDiv: {
        borderRadius: 10,
        padding: '1% 2%',
        marginTop: 20,
        backgroundColor: '#e8e8e8',
    },
    textBody: {
        fontSize: 14,
        paddingTop:4
    },
    textEst: {
        fontSize: 10
    },
    balanceBody: {
        display: "flex",
        alignItems: "baseline",
        marginTop: -7
    },
    balanceText: {
        fontSize: 20,
        marginRight: 5
    },
    totalBody: {
        borderRadius: 10,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        marginTop: '3%',
        padding: 5
    },
    exchangeBody: {
        borderRadius: 5,
        margin: '2%',
        padding: '1rem 2rem',
        backgroundColor: '#e8e8e8',
    },
    descriptionText: {
        fontSize: 12,
        marginTop: 5
    },
    bottonBody: {
        display: 'flex',
        marginTop: 10
    },
    transferText:{
        textDecoration: 'none !important'
    }
}));

const AccountOverview = (props) => {

    const classes = useStyles();
    const {selectLanding, isAuthenticated,user_id,accountInfo} = props;
    const [hide, setHide] = React.useState(true);

    const [loading, setLoading] = React.useState(false);
    
    useEffect(() => {
        selectLanding();
    }, [selectLanding]);

    useEffect(() => {

    }, [isAuthenticated])

    useEffect(() => {
    }, [user_id])

    useEffect(() => {
        props.VerifyInfo(user_id);
    }, [user_id]);

    useEffect(() => {
        props.AccountInfo(user_id);
    }, [user_id]);

    useEffect(()=>{
        if(accountInfo.length>0)
            setLoading(true)
    }, [accountInfo])

    const hideChange = () => {
        setHide(!hide);
    };
    return (
        <div className={classes.root}>
            <WalletTopbar name="Accounts Overview"/>
            <div className={classes.futureBody}>
                <WalletLeftBar name="Accounts Overview"/>
                {loading &&
                <>
                    <div className={classes.mainBody}>
                        <div className={classes.bodyHeader}>
                            <p className={classes.futureText}>Overview</p>
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.hideButton}
                                startIcon={hide ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>}
                                onClick={hideChange}
                            >
                                {hide ? 'Hide' : 'Show'}&nbsp;Balance
                            </Button>
                        </div>
                        <Collapse in={hide}>
                            <div className={classes.balanceDiv}>
                                <Typography className={classes.textBody}>Estimated Balance</Typography>
                                <div className={classes.balanceBody}>
                                    <Grid container direction="row"
                                        justify="flex-start"
                                        alignItems="center">
                                        <Grid>
                                            {accountInfo.map((row, i) => (
                                            <Typography key={i} className={classes.balanceText}>{row.total_amount}</Typography>
                                            ))}

                                        </Grid>
                                        <Grid >
                                            <Typography className={classes.textBody}>USDT</Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Collapse>
                        <div className={classes.totalBody}>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <div className={classes.exchangeBody}>
                                        <Typography className={classes.textBody}>Exchange Account</Typography>
                                        <Collapse in={hide}>
                                            <Typography className={classes.textEst}>Estimated Balance</Typography>
                                            <div className={classes.balanceBody}>

                                            {accountInfo.map((row, i) => (
                                            <Typography key={i} className={classes.balanceText}>{row.exchange_amount}</Typography>
                                            ))}
                                                <Typography className={classes.textBody}>USDT</Typography>
                                            </div>
                                        </Collapse>
                                        <Typography className={classes.descriptionText}>This is your spot trading
                                            account.Simply transfer funds to start trading on the world's coolest crypto exchange instantly!</Typography>
                                        <div className={classes.bottonBody}>
                                            <Button
                                                variant="contained"
                                                color="default"
                                                className={classes.defaultButton}
                                                href="/wallet/exchange-account/deposit"
                                            >
                                                Deposit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="default"
                                                className={classes.defaultButton}
                                                href="/wallet/transfer-balances"
                                            >
                                                Transfer
                                            </Button>
                                        </div>
                                    </div>
                                </Grid>
                                {accountInfo.map((row, i) => (
                                    <FuturesComponent key ={i} classes={classes}  activate = {row.futures_state} hide={hide} amount = {row.futures_amount}/>
                                ))}
                                {accountInfo.map((row, i) => (
                                    <MarginComponent key ={i} classes={classes}  activate = {row.margin_state} hide={hide} amount = {row.margin_amount}/>
                                ))}
                                {accountInfo.map((row, i) => (
                                    <SavingComponent key ={i} classes={classes} activate = {row.savings_state} hide={hide} amount = {row.savings_amount}/>
                                ))}
                                {accountInfo.map((row, i) => (
                                    <PoolComponent key ={i} classes={classes} activate = {row.pool_state} hide={hide} amount = {row.pool_amount}/>
                                ))}
                                
                            </Grid>
                        </div>
                    </div>
                    
                    <WalletProfileSecurity/>  
                </>
                }
                {!loading && 
                <div style={{textAlign:'center', marginTop:150, marginLeft: '35vw'}}>
                    <img src={require('../../assets/loading.gif')} style={{width:200}}/>
                </div>}  
            </div>
            
        </div>
    );
}

AccountOverview.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.auth.user_id,
    accountInfo : state.wallet.accountInfo,
});

const mapDispatchToProps = {
    AccountInfo,
    VerifyInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountOverview);
