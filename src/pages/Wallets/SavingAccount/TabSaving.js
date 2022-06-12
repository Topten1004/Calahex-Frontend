import React, { Fragment, useEffect, useState } from "react";

import {
    Grid,
    Divider,
    ListItemText,
    makeStyles,
    Tabs,
    Tab,
    Typography,
    Box
} from '@material-ui/core';
import jsonData from '../../../resources/wallet.json';
import PropTypes from 'prop-types';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { WalletTabs , WalletTab } from "../../../components/Wallets/SavingAccount/WalletTabs";
import TabPanel from "../../../components/Wallets/ExchangeAccount/Withdraw/TabPanel";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    balance1: {
        fontSize: 20,
        fontWeight: 500,
        [theme.breakpoints.down("sm")]: {
            fontSize: 12,
            fontWeight: 500,
        },
    },
    tabSaving: {
        display: 'flex',
        backgroundColor: '#bbb',
        borderRadius: 10,
        padding: '10px 100px 10px 10px',
        marginTop: 40,
        [theme.breakpoints.down("md")]: {
            padding: '10px 10px 10px 10px',
        },
        [theme.breakpoints.down("sm")]: {
            padding: '10px 10px 10px 10px',
            flexDirection:'column',
            textAlign: 'center'
        },
    },
    tabSavingTable: {
        width: '100%',
        marginTop: 40,
        border: '1px solid #bbb',
        borderRadius: 10,
    },
    tabPanelHeader: {
        marginTop: 20,
        padding: '0 20px'
    },
    tabPanel: {
        width: '100%',
    },
    box: {
        padding: '0 !important'
    },
    assignmentIcon: {
        width: 200,
        height: 200,
        color: theme.palette.primary.footer
    },
    flexibleHeader: {
        backgroundColor: '#bbb',
        padding: 20,
        [theme.breakpoints.down("md")]: {
            flexDirection: 'column'
        },
    },

}));

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const Flexible = () => {
    const classes = useStyles();
    return (
        <Grid>
            <Grid container direction={'row'} justify={"space-around"} alignItems={"center"} className={classes.flexibleHeader}>
                <div>Flexible Savings</div>
                <div>Total Amount</div>
                <div>Today's Subscription</div>
                <div>Redeeming</div>
                <div>Cumulative Interest</div>
                <div>Estimated Annual Yield</div>
                <div>Operation</div>
            </Grid>

            <Grid container justify={"center"}>
                <AssignmentIcon className={classes.assignmentIcon}/>
            </Grid>
        </Grid>
    )
}

const TabSaving = () => {
    const classes = useStyles();
    const changedEUR = jsonData.wallet.savingAccount.saving.estimatedValue;
    const [value, setValue] = React.useState(0);//This is for the tab bar
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid direction={"column"}>
            <Grid direction={"row"} justify={"space-around"} className={classes.tabSaving}>
                <Grid direction={"column"}>
                    <ListItemText primary="Estimated Value" />
                    <div className={classes.balance1}>
                        { jsonData.wallet.savingAccount.saving.estimatedValue }
                        { jsonData.wallet.savingAccount.saving.type }
                    </div>
                    <div>{' = '}{changedEUR}EUR</div>
                </Grid>

                <Grid direction={"column"}>
                    <ListItemText primary="Total Interested Value" />
                    <div className={classes.balance1}>
                        { jsonData.wallet.savingAccount.saving.totalInterestedEarn }
                        { jsonData.wallet.savingAccount.saving.type }
                    </div>
                    <div>{' = '}{changedEUR}EUR</div>
                </Grid>

                <Grid direction={"column"}>
                    <ListItemText primary="Today's Interested Value" />
                    <div className={classes.balance1}>
                        { jsonData.wallet.savingAccount.saving.todayInterestedEarn }
                        { jsonData.wallet.savingAccount.saving.type }
                    </div>
                    <div>{' = '}{changedEUR}EUR</div>
                </Grid>

                <Grid direction={"column"}>
                    <ListItemText primary="Savings Trial Fund Bonus" />
                    <div className={classes.balance1}>
                        { jsonData.wallet.savingAccount.saving.savingTrialFundBounds }
                        { jsonData.wallet.savingAccount.saving.type }
                    </div>
                    <div>{' = '}{changedEUR}EUR</div>
                </Grid>
            </Grid>

            <Grid direction={"column"} className={classes.tabSavingTable}>
                <WalletTabs  value={value} onChange={handleChange} aria-label="simple tabs example">
                    <WalletTab className="tabButton" label="Flexible"  {...a11yProps(0)} />
                    <WalletTab className="tabButton" label="Locked"  {...a11yProps(1)} />
                    <WalletTab className="tabButton" label="Activities"  {...a11yProps(2)} />
                    <WalletTab className="tabButton" label="Saving Trial Func"  {...a11yProps(3)} />
                </WalletTabs>
                <Divider />
                <TabPanel value={value} index={0}>
                    <Flexible />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>Tab2</div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div>Tab3</div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <div>Tab3</div>
                </TabPanel>
            </Grid>
        </Grid>
    )
}

export default TabSaving;