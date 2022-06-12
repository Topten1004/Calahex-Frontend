import React, {useEffect} from "react";
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {Select, MenuItem} from '@material-ui/core';
import PropTypes from "prop-types";
import WalletTopbar from "../../../components/Wallets/WalletBars/WalletTopBar";
import WalletLeftBar from "../../../components/Wallets/WalletBars/WalletLeftBar";
import WalletProfileSecurity from "../../../components/Wallets/WalletBars/WalletRightBar";
import Typography from "@material-ui/core/Typography";
import {AntTab, AntTabs} from "../../../components/Wallets/FutureAccount/Withdraw/AntTabs";
import TabPanel from "../../../components/TabPanel";
import WithdrawCrypto from "../../../components/Wallets/FutureAccount/Withdraw/WithdrawCrypto";
import DepositFiat from "../../../components/Wallets/FutureAccount/Deposit/DepositFiat";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import WalletData from "../../../resources/walletData.json";
import Searcher from "../../../components/Wallets/FutureAccount/NewSearchTable";
import SearchUiTable from "../../../components/Wallets/FutureAccount/SearchUiTable";
import {Button} from "@material-ui/core";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import {FutureWalletInfo, FutureFiatDepositCheck} from "../../../redux/actions/wallet"
import {useLocation} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    walletBody: {
        display: "flex"
    },
    mainBody: {
        padding: 15,
        width: "-webkit-fill-available",
        height: 'calc(100vh - 50px)',
        overflowY: 'auto',
    },
    main: {
        marginLeft: "15px"
    },
    header: {
        display: "flex",

    },
    headerButton: {
        display: "flex",
        width: "115px",
        border: "solid 1px gray",
        borderRadius: "21px",
        height: "24px",
        marginTop: "13px",
        marginLeft: "12px"
    },
    headerBtnLetter: {
        marginTop: "2px"
    },
    headerHr: {
        margin: "0px 0 10px",
        color: '#e3e3e3'
    },
    middle: {
        backgroundColor: "#80808038",
        borderRadius: "6px",
        padding: "0px 20px 0px"
    },
    chartPart: {
        border: 'solid #e3e3e3',
        borderRadius: 14,
        marginTop: 10
    },

    search: {
        display: "flex",
        border: "solid 1px gray",
        marginLeft: "17px",
        width: "94px",
        height: "27px",
        borderRadius: "5px",
        marginTop: "7px",
        marginRight: "15px"
    },
    searchLetter: {
        marginTop: "3px"
    },
    chartPartTop: {
        display: "flex"
    },
    convertLink: {
        marginTop: "11px"
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
    hideIcon: {
        width: 15,
        height: 15,
        marginRight: 10
    },
    middleDownLetterStrong: {
        fontSize: 20,
    },
    middleDownLetter: {
        margin: 0,
        padding: '0 0 10px 0',
    },
    middleUpLetter: {
        padding: '15px 0 0 0',
        margin: 0
    },
    table: {
        marginTop: -80
    },
    searchTable: {
        padding: '0 15px'
    },
    balanceDiv: {
        borderRadius: 10,
        padding: '1% 2%',
        backgroundColor: '#e8e8e8',
    },
    textBody: {
        fontSize: 14
    },
    balanceBody: {
        display: "flex",
        alignItems: "baseline"
    },
    balanceText: {
        fontSize: 20,
        marginRight: 5
    }
}));

let myInterval2;
const WalletFuture = (props) => {

    const classes = useStyles();
    const [hide, setHide] = React.useState(true);

    const {selectLanding, isAuthenticated,user_id, futureWalletInfo,futureWalletAmount,futureWalletAmountBTC} = props;
    const [value, setValue] = React.useState(0);
    const [coinValue, setCoinValue] = React.useState("USDT");
    
    const [loading, setLoading] = React.useState(false);

    const search = useLocation().search;
    var key = new URLSearchParams(search).get('key');
    if(key!=null)
        props.FutureFiatDepositCheck(key);

    const coinHandleChange = (e) => {
        setCoinValue(e.target.value);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        selectLanding();
    }, [selectLanding]);

    useEffect(() => {
        console.log(isAuthenticated)
    }, [isAuthenticated])
    const hideChange = () => {
        setHide(!hide);
    };

    useEffect(()=>{
        if(futureWalletAmount)
            setLoading(true);
    }, [futureWalletAmount])

    useEffect(()=>{

        props.FutureWalletInfo(user_id)
        getResult();
        return () => {
            console.log("unmount - wallet")
            clearTimeout(myInterval2)
        }
    },[]);

    function getResult(){
        myInterval2 = setTimeout(()=>{
            props.FutureWalletInfo(user_id)
            getResult();
        }, 2000);        
    }

    return (
        <div className={classes.root}>
            <WalletTopbar name="Wallet"/>
            <div className={classes.walletBody}>
                <WalletLeftBar name="Wallet"/>
                {loading &&
                <>
                <div className={classes.mainBody}>
                    <div className={classes.main}>
                        <div className={classes.header}>
                            <h3>Future Wallet</h3>
                            {/*<Button size={"small"} className={classes.hideBalance}><VisibilityOffIcon className={classes.hideIcon} />Hide Balance</Button>*/}
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
                        <hr className={classes.headerHr}/>
                        <Collapse in={hide}>
                            <div className={classes.balanceDiv}>
                                <Typography className={classes.textBody}>Estimated Balance</Typography>
                                <div className={classes.balanceBody}>
                                    <Grid container direction="row"
                                          justify="flex-start"
                                          alignItems="center">
                                        <Grid>
                                            <Typography className={classes.balanceText}>{coinValue=='USDT'?futureWalletAmount:futureWalletAmountBTC}</Typography>
                                        </Grid>
                                        <Select
                                            labelId="coin-select-outlined-label"
                                            id="coin-simple-select-outlined"
                                            size="small"
                                            onChange={coinHandleChange}
                                            value={coinValue}
                                            >
                                                <MenuItem value="USDT" key="USDT">USD</MenuItem>
                                                {/* <MenuItem value="EUR" key="EUR">EUR</MenuItem> */}
                                                <MenuItem value="BTC" key="BTC">BTC</MenuItem>
                                        </Select>
                                    </Grid>
                                </div>
                            </div>
                        </Collapse>
                        <div className={classes.chartPart}>
                            {/*<div className={classes.chartPartTop}>*/}
                            {/*    <div className={classes.search}>*/}
                            {/*        <SearchIcon />*/}
                            {/*        <p className={classes.searchLetter}>Search..</p>*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <FormControlLabel*/}
                            {/*            control={*/}
                            {/*                <Checkbox*/}
                            {/*                    name="checkedB"*/}
                            {/*                    color="primary"*/}
                            {/*                />*/}
                            {/*            }*/}
                            {/*            label="Hide small balances"*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <a href={""}><p className={classes.convertLink}>Convert to EXL</p></a>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={classes.searchTable}>*/}
                            {/*    <TopSearch/>*/}
                            {/*</div>*/}
                                <SearchUiTable rows ={futureWalletInfo}/>
                            {/*<Searcher/>*/}
                        </div>
                    </div>
                </div>
                <WalletProfileSecurity/>
                </>
                }
                {!loading &&
                <div style={{textAlign:'center', marginTop:150, marginLeft: '35vw'}}>
                    <img src={require('../../../assets/loading.gif')} style={{width:200}}/>
                </div>}
            </div>
        </div>
    );
}

WalletFuture.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.auth.user_id,
    futureWalletInfo: state.wallet.futureWalletInfo,
    futureWalletAmount: state.wallet.futureWalletAmount,
    futureWalletAmountBTC: state.wallet.futureWalletAmountBTC
});

const mapDispatchToProps = {
    FutureWalletInfo,
    FutureFiatDepositCheck
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletFuture);
