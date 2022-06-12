import React, { useEffect } from "react";
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import WalletTopbar from "../../../components/Wallets/WalletBars/WalletTopBar";
import WalletLeftBar from "../../../components/Wallets/WalletBars/WalletLeftBar";
import WalletProfileSecurity from "../../../components/Wallets/WalletBars/WalletRightBar";
import TabPanel from "../../../components/TabPanel";
import withStyles from "@material-ui/core/styles/withStyles";
import WithdrawCrypto from "../../../components/Wallets/ExchangeAccount/Withdraw/WithdrawCrypto";
import Typography from "@material-ui/core/Typography";
import {AntTabs, AntTab} from "../../../components/Wallets/ExchangeAccount/Withdraw/AntTabs.js"
import WithdrawFiat from "../../../components/Wallets/ExchangeAccount/Withdraw/WithdrawFiat";

const useStyles = makeStyles(theme => ({
    root: {

        width: '100%',
        margin: 0,
        padding: 0,
    },
    futureBody: {
        display: "flex",

    },
    mainBody: {
        padding: 15,
        width: "-webkit-fill-available",
        height: 'calc(100vh - 50px)',
        overflowY: 'auto',
    },
    bodyHeader: {
        padding: '0px 0px 0px 10px',
        borderBottom: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    spotName: {
      margin: 0,
        fontSize: 14
    },
    withdrawText: {
        fontWeight: 'bold',
        fontSize: 16,
        margin: '0px 0px 5px 0px'
    }
}));


const Withdraw = (props) => {

    const classes = useStyles();
    const { selectLanding, isAuthenticated } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        selectLanding();
    }, [selectLanding]);

    useEffect(() => {
        console.log(isAuthenticated)
    }, [isAuthenticated])

    return (
        <div className={classes.root}>
            <WalletTopbar name="Withdraw" />
            <div className={classes.futureBody}>
                <WalletLeftBar name="Withdraw" />
                <div className={classes.mainBody}>
                    <div className={classes.bodyHeader}>
                        <div>
                            <div>
                            <Typography className={classes.spotName}>Exchange&nbsp;&nbsp;>&nbsp;&nbsp;Withdraw</Typography>
                            </div>
                            <Typography className={classes.withdrawText}>Withdraw</Typography>
                        </div>
                        {/* <div>
                            <Typography className={classes.spotName}>24h Withdrawal Limit:2 BTC</Typography>
                        </div> */}
                    </div>
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                        <AntTab label="Crypto"/>
                        {/* <AntTab label="Fiat" /> */}
                    </AntTabs>
                    <TabPanel value={value} index={0}>
                        <WithdrawCrypto/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {/* <WithdrawFiat/> */}
                    </TabPanel>
                </div>
                <WalletProfileSecurity/>
            </div>
        </div>
    );
}

Withdraw.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);
