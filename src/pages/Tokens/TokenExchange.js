import React, { Fragment, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TradingViewWidget from 'react-tradingview-widget';
// import { Link } from "react-router-dom";
// import clsx from 'clsx';
import {
    AppBar,
    Button,
    FormControl,
    Grid,
    Hidden,
    InputLabel,
    Menu,
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
import {
    TokenExchangePairList,
    TokenExchangeOrderList,
    TokenExchangeTradList
} from '../../redux/actions/token';
import TokenDiv, { BgTableRow } from "./TokenExchange.style";

import PropTypes from "prop-types";
import TabPanel, { a11yProps } from "../../components/TabPanel";
import { StyledTabs, StyledTab } from "../../components/StyleTabs";
import DepthChart from "../../components/chart/DepthChart";
import { Link } from "react-router-dom";
import { ButtonTab, ButtonTabs } from "../../components/buttontabs/StyleTabs";

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
        cursor: 'pointer'
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
    }
}));
let timer1, timer2, timer3;

const TokenExchange = (props) => {
    const { selectLanding, isAuthenticated, tokenExchangeLists, tokenOrderLists, tokenTradLists } = props;
    console.log(tokenOrderLists);
    const classes = useStyles();
    const [anchorElUSD, setAnchorElUSD] = useState(null);
    const [anchorElALTS, setAnchorElALTS] = useState(null);
    const [anchorElINNOV, setAnchorElINNOV] = useState(null);
    const [show, setShow] = useState(3);
    const [selectRow, setSelectRow] = useState({});
    const openUSD = Boolean(anchorElUSD);
    const openALTS = Boolean(anchorElALTS);
    const openINNOV = Boolean(anchorElINNOV);
    const [value, setValue] = useState(0);
    const [adminPanLogin, setAdminPanLogin] = useState(0);
    const [tradingViewTab, setTradingViewTab] = useState(0);
    const [size, setSize] = useState(8);
    const [display, setDisplay] = useState('volume');
    const [search1, setSearch1] = useState('');
    const [hiddenC, setHiddenC] = useState(['sider1']);
    const [name, setName] = useState('')

    const match1 = useMediaQuery('(min-width:1400px)');
    const match2 = useMediaQuery('(min-width:1070px)');



    const optionUSD = ['USDT', 'USDC', 'USDJ', 'DAI', 'PAX', 'BUSD'];
    const optionALTS = ['ETH', 'BNB'];
    const optionINNOV = ['LEVERAGE', 'DEFI', 'ASSESSMENT'];

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };
    const handleTradingTabChange = (e, newValue) => {
        setTradingViewTab(newValue);
    };


    useEffect(() => {
        props.TokenExchangePairList();
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
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        if (Object.keys(selectRow).length) {
            props.TokenExchangeOrderList(selectRow.name);
            props.TokenExchangeTradList(selectRow.name);
            console.log('sele')
            timer1 = setInterval(() => {
                props.TokenExchangeOrderList(selectRow.name);
            }, 2000);
            timer2 = setInterval(() => {
                props.TokenExchangeTradList(selectRow.name);
            }, 3000);
            timer3 = setInterval(() => {
                props.TokenExchangePairList(name);
            }, 5000);
        }
    }, [selectRow, name, props]);

    useEffect(() => {

        if (!Object.keys(selectRow).length && tokenExchangeLists.length) {
            setSelectRow(tokenExchangeLists[0]);
        }
    }, [tokenExchangeLists, selectRow])


    const handleClick = (event, type) => {
        if (type === 'usd') {
            setAnchorElUSD(event.currentTarget);
            return;
        }
        if (type === 'alts') {
            setAnchorElALTS(event.currentTarget);
            return;
        }
        if (type === 'innov') {
            setAnchorElINNOV(event.currentTarget);
            return;
        }
    };

    const handleClose = () => {
        setAnchorElUSD(null);
        setAnchorElALTS(null);
        setAnchorElINNOV(null);
    };

    const bookShow = (show) => {
        setShow(show);
    }
    const selectToken = (nam) => {
        props.TokenExchangePairList(nam);
        setName(nam);
    }

    const handleSelectRow = (row) => {
        setSelectRow({ ...row });
        if (!match2) {
            setHiddenC(hiddenC.filter(hid => hid !== 'sider1'));
        }
    };

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

    const handleBuySell = (e, newValue) => {
        setAdminPanLogin(newValue)
    }

    const handleSearch = (e) => {
        setSearch1(e.target.value);
    }

    const tabHeader = (label, tabNum = 0) => <StyledTab className="tabButton" label={label} {...a11yProps(tabNum)} />;
    const tabbodyMarketTrade = (tabNum, selNum = 0) => (
        <TabPanel value={selNum} index={tabNum}>
            <TableContainer className="trade-market-table-container">
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tokenTradLists.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{row.time}</TableCell>
                                <TableCell align="right"><span className={row.type === 'sell' ? 'minus' : 'plus'}>{row.price}</span></TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.total}</TableCell>
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
                    <span>AMOUNT({selectRow?.name && selectRow.name.split('_')[1]})</span>
                    <span>TOTAL({selectRow?.name && selectRow.name.split('_')[0]})</span>
                </div>
                <div className="orderSellBook">
                    <TableContainer className="order-buy-table-container">
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableBody>
                                {tokenOrderLists.asks.reverse().map((row, i) => (
                                    <Tooltip key={i} type={1} title={
                                        <Fragment>
                                            <div><span>Avg Price: </span><span></span></div>
                                            <div><span>Sum {selectRow?.name && selectRow.name.split('_')[0]}: sd{row.sum_total}</span><span></span></div>
                                            <div><span>Sum {selectRow?.name && selectRow.name.split('_')[1]}: sd{row.sum_amount}</span><span></span></div>
                                        </Fragment>
                                    } placement="right" arrow>
                                        <BgTableRow total={row.total} max={tokenOrderLists.asks[tokenOrderLists.asks.length - 1].sum_total}>
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
                        <h4>{Object.keys(selectRow).length ? (selectRow.price + " " + selectRow.name.split('_')[1]) : '1'}</h4>
                    </div>
                    <TableContainer className="order-sell-table-container">
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableBody>
                                {tokenOrderLists.bids.map((row, i) => (
                                    <Tooltip key={i} title={
                                        <Fragment>
                                            <div><span>Avg Price: </span><span></span></div>
                                            <div><span>Sum {selectRow?.name && selectRow.name.split('_')[0]}: {row.sum_total}</span><span></span></div>
                                            <div><span>Sum {selectRow?.name && selectRow.name.split('_')[1]}: {row.sum_amount}</span><span></span></div>
                                        </Fragment>
                                    } placement="right" arrow>
                                        <BgTableRow type={2} total={row.sum_total} max={tokenOrderLists.bids[tokenOrderLists.bids.length - 1].sum_total}>
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
            </TabPanel>
        </div>
    );

    const tabbodyOpenOrders = (tabNum, selNum) => (
        <TabPanel value={selNum} index={tabNum}>
            <TableContainer className="tables">
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Price({selectRow?.name && selectRow.name.split('_')[0]})</TableCell>
                            <TableCell align="center">Amount({selectRow?.name && selectRow.name.split('_')[1]})</TableCell>
                            <TableCell align="center">Stop({selectRow?.name && selectRow.name.split('_')[0]})</TableCell>
                            <TableCell align="center">Total({selectRow?.name && selectRow.name.split('_')[0]})</TableCell>
                            <TableCell align="center">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {tokenTradLists.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{row.time}</TableCell>
                                <TableCell align="right"><span className={row.type === 'sell' ? 'minus' : 'plus'}>{row.price}</span></TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.total}</TableCell>
                                <TableCell align="right">{row.total}</TableCell>
                            </TableRow>
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>
    );

    const tabbodyFavorite = (tabNum, selNum) => (
        <TabPanel value={selNum} index={tabNum}>
            <TableContainer className="tables">
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Pair</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">24H</TableCell>
                            <TableCell align="center">Volum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {tokenTradLists.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{row.time}</TableCell>
                                <TableCell align="right"><span className={row.type === 'sell' ? 'minus' : 'plus'}>{row.price}</span></TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.total}</TableCell>
                                <TableCell align="right">{row.total}</TableCell>
                            </TableRow>
                        ))} */}
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
                // scrollButtons="on"
                aria-label="scrollable auto tabs example"
                centered
            >
                <ButtonTab className="tabButton" label="Buy" {...a11yProps(0)} />
                <ButtonTab className="tabButton sellButton" label="Sell" {...a11yProps(1)} />
            </ButtonTabs>
            <TabPanel value={adminPanLogin} index={0}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Order Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        size="small"
                        fullWidth
                        //   value={age}
                        //   onChange={handleChange}
                        label="Order Type"
                    >
                        <MenuItem value={10}>Limit</MenuItem>
                        <MenuItem value={20}>Stop Limit</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="Limit Price" variant="outlined" fullWidth />
                <TextField id="outlined-basic" label="Amount" variant="outlined" fullWidth />
                <TextField id="outlined-basic" label="Total" variant="outlined" fullWidth />
                <Grid container spacing={3}>
                    <Grid item xs={3}><Button size="small" type="primary" className="color-secondary" fullWidth >25%</Button></Grid>
                    <Grid item xs={3}><Button size="small" type="primary" className="color-secondary" fullWidth >50%</Button></Grid>
                    <Grid item xs={3}><Button size="small" type="primary" className="color-secondary" fullWidth >75%</Button></Grid>
                    <Grid item xs={3}><Button size="small" type="primary" className="color-secondary" fullWidth >100%</Button></Grid>
                </Grid>
                <div><span>fee: 0.125%/0.125%</span></div>
                <Button fullWidth size="small" className="color-primary">Buy</Button>

                <div style={{ marginTop: 20 }}>
                    <div className="unitsize"><div><p>ETH</p><p>Ethereum</p></div><div><p>0.000000</p>
                        <p>$0.00</p></div></div>
                    <div className="unitsize"><div><p>ETH</p><p>Ethereum</p></div><div><p>0.000000</p>
                        <p>$0.00</p></div></div>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={6}><Button size="small" type="primary" className="color-secondary" fullWidth>Deposit</Button></Grid>
                    <Grid item xs={6}><Button size="small" type="primary" className="color-secondary" fullWidth>Transfer</Button></Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={adminPanLogin} index={1}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Order Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        size="small"
                        fullWidth
                        //   value={age}
                        //   onChange={handleChange}
                        label="Order Type"
                    >
                        <MenuItem value={10}>Limit</MenuItem>
                        <MenuItem value={20}>Stop Limit</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="Limit Price" variant="outlined" fullWidth />
                <TextField id="outlined-basic" label="Amount" variant="outlined" fullWidth />
                <Grid container spacing={3} className="mb-15">
                    <Grid item xs={3}><Button size="small" type="primary" className="color-secondary" >25%</Button></Grid>
                    <Grid item xs={3}><Button size="small" type="primary" className="color-secondary" >50%</Button></Grid>
                    <Grid item xs={3}><Button size="small" type="primary" className="color-secondary" >75%</Button></Grid>
                    <Grid item xs={3}><Button size="small" type="primary" className="color-secondary" >100%</Button></Grid>
                </Grid>
                <TextField id="outlined-basic" label="Total" variant="outlined" fullWidth />
                <div><span>fee: 0.125%/0.125%</span></div>
                <Button fullWidth size="small" className="color-danger">Sell</Button>

                <div style={{ marginTop: 50 }}>
                    <div className="unitsize"><div><p>ETH</p><p>Ethereum</p></div><div><p>0.000000</p>
                        <p>$0.00</p></div></div>
                    <div className="unitsize"><div><p>ETH</p><p>Ethereum</p></div><div><p>0.000000</p>
                        <p>$0.00</p></div></div>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={6}><Button size="small" type="primary" className="color-secondary" fullWidth>Deposit</Button></Grid>
                    <Grid item xs={6}><Button size="small" type="primary" className="color-secondary" fullWidth>Transfer</Button></Grid>
                </Grid>
            </TabPanel>
        </Grid>
    }

    return (
        <TokenDiv className={classes.root} show={show} responsive={hiddenC} match={!match2} match1={!match1} >
            <AppBar position={'static'}>
                <Toolbar>
                    <Grid container spacing={1} className={classes.topInfo}>
                        <Grid item xs={5} sm={3} md={2}>
                            <h3 onClick={() => { handleResponse('sider1') }} className={classes.eth_h}>{selectRow?.name && selectRow.name.replace('_', '/')}{selectRow?.name ? "" : "USDT/BTC"} {hiddenC.filter(hid => hid === 'sider1').length ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</h3>
                            <p className={classes.eth_subp}>bitcoin</p>
                        </Grid>
                        <div className="infoview">
                            <div>
                                <p className={classes.eth_p}>Last Price</p>
                                <h4 className={classes.eth_h}>{selectRow?.price && Number(selectRow?.price).toFixed(4)} {selectRow.price ? selectRow?.name.split('_')[0] : "0"} </h4>
                            </div>
                            <Hidden xsDown>
                                <div><p className={classes.eth_p}>24h Change</p>
                                    <h4 className={classes.eth_h}>{selectRow?.percent && Number(selectRow?.percent).toFixed(2)} {selectRow?.percent ? "%" : "0"}</h4>
                                </div>
                                <div><p className={classes.eth_p}>24h Low</p>
                                    <h4 className={classes.eth_h}>{selectRow?.low && Number(selectRow?.low).toFixed(4)} {selectRow.low ? selectRow?.name.split('_')[0] : "0"}</h4>
                                </div>
                                <div><p className={classes.eth_p}>24h High</p>
                                    <h4 className={classes.eth_h}>{selectRow?.high && Number(selectRow?.high).toFixed(4)} {selectRow.high ? selectRow?.name.split('_')[0] : "0"}</h4>
                                </div>
                            </Hidden>
                            <div><p className={classes.eth_p}>Volume</p>
                                <h4 className={classes.eth_h}>{selectRow?.volume && Number(selectRow?.volume).toFixed(4)} {selectRow.volume ? selectRow?.name.split('_')[0] : "0"}</h4>
                            </div>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container spacing={1} className="content-wrapper">
                <Grid item className="sider1">
                    <div className={classes.xrpSearch}>
                        <div className={classes.xrpfilter}>
                            <StarIcon className={classes.star} />
                            <div>
                                <span className={classes.xrpSpan}
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
                                        <MenuItem className={classes.menuitem} key={option} onClick={() => { selectToken(option); handleClose(); }}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                            <span className={classes.xrpSpan} onClick={() => { selectToken('BTC'); }}>BTC</span>
                            {/* <span className={classes.xrpSpan} onClick={() => { selectToken('TRX'); }}>TRX</span> */}
                            <div>
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
                                        <MenuItem className={classes.menuitem} key={option} onClick={() => { selectToken(option); handleClose(); }}>
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
                                        <MenuItem className={classes.menuitem} key={option} onClick={() => { selectToken(option); handleClose(); }}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
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
                        <TableContainer className={classes.tableContainer}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Pair</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                        <TableCell align="center">{display === 'volume' ? 'Volume' : 'Balance'}</TableCell>
                                        <TableCell align="center">24H</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tokenExchangeLists.filter(tokenList => {
                                        if (search1 === '') return true;
                                        return tokenList.name.toLowerCase().search(search1.toLowerCase()) !== -1;
                                    }).map((row, i) => (
                                        // <Counter key={`${row.price}`}>
                                        <TableRow key={i} onClick={() => { handleSelectRow(row); }} >
                                            <TableCell><span>{row.name.split('_')[0]}</span>/<code>{row.name.split('_')[1]}</code></TableCell>
                                            <TableCell align="right"><span className={'fw-800' + (Number(row.percent) > 0 ? ' plus' : ' minus')}>{row.price}</span></TableCell>
                                            <TableCell align="right">{row[display]}</TableCell>
                                            <TableCell align="right"><span className={'fw-800' + (Number(row.percent) > 0 ? ' plus' : ' minus')}>{Number(row.percent).toFixed(4)} %</span></TableCell>
                                        </TableRow>
                                        // </Counter>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                        <span>AMOUNT({selectRow?.name && selectRow.name.split('_')[1]})</span>
                        <span>TOTAL({selectRow?.name && selectRow.name.split('_')[0]})</span>
                    </div>
                    <div className="orderSellBook">
                        <TableContainer className="order-buy-table-container">
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableBody>
                                    {tokenOrderLists.asks.reverse().map((row, i) => (
                                        <Tooltip key={i} type={1} title={
                                            <Fragment>
                                                <div><span>Avg Price: </span><span></span></div>
                                                <div><span>Sum {selectRow?.name && selectRow.name.split('_')[0]}: {row.sum_total}</span><span></span></div>
                                                <div><span>Sum {selectRow?.name && selectRow.name.split('_')[1]}: {row.sum_amount}</span><span></span></div>
                                            </Fragment>
                                        } placement="right" arrow>
                                            <BgTableRow total={row.sum_total} max={tokenOrderLists.asks[tokenOrderLists.asks.length - 1].sum_total}>
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
                                    {tokenOrderLists.bids.map((row, i) => (
                                        <Tooltip key={i} title={
                                            <Fragment>
                                                <div><span>Avg Price: </span><span></span></div>
                                                <div><span>Sum {selectRow?.name && selectRow.name.split('_')[0]}: {row.sum_total}</span><span></span></div>
                                                <div><span>Sum {selectRow?.name && selectRow.name.split('_')[1]}: {row.sum_amount}</span><span></span></div>
                                            </Fragment>
                                        } placement="right" arrow>
                                            <BgTableRow type={2} total={row.sum_total} max={tokenOrderLists.bids[tokenOrderLists.bids.length - 1].sum_total}>
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
                                    <StyledTab className="tabButton" label="Price Chart"  {...a11yProps(0)} />
                                    <StyledTab className="tabButton" label="Depth Chart"  {...a11yProps(1)} />
                                    {!match2 && tabHeader('Order Book', 2)}
                                    {!match1 && tabHeader('Market Trade', 3 - match2)}
                                    {/* {!match2 && tabHeader('Open Orders', 4)}
                                    {!match2 && tabHeader('Favorite', 5)} */}
                                </StyledTabs>
                            </AppBar>
                            <TabPanel value={tradingViewTab} index={0}>
                                {selectRow?.name && <TradingViewWidget autosize symbol={(selectRow?.name && selectRow.name.split('_').reverse().join(''))} />}
                            </TabPanel>
                            <TabPanel value={tradingViewTab} index={1}>
                                <DepthChart data={tokenOrderLists} />
                            </TabPanel>
                            {!match2 && tabbodyOrderBook(2, tradingViewTab)}
                            {!match1 && tabbodyMarketTrade(3 - match2, tradingViewTab)}
                            {/* {!match2 && tabbodyOpenOrders(4, tradingViewTab)}
                            {!match2 && tabbodyFavorite(5, tradingViewTab)} */}
                        </Grid>
                        {match1 && <Grid item className="sider3">
                            <StyledTabs value={0}>
                                {match1 && tabHeader('Market Trade', 0)}
                            </StyledTabs>
                            {match1 && tabbodyMarketTrade(0)}
                        </Grid>}
                        <Grid item xs={12} className="bottom1">
                            <StyledTabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                {tabHeader('Open Orders', 0)}
                                {tabHeader('Favorites', 1)}
                            </StyledTabs>
                            {tabbodyOpenOrders(0, value)}
                            {tabbodyFavorite(1, value)}
                            {(!match2 && isAuthenticated) && adminPan}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </TokenDiv>
    );
};

TokenExchange.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    tokenExchangeLists: state.token.tokenExchangeLists,
    tokenOrderLists: state.token.tokenOrderLists,
    tokenTradLists: state.token.tokenTradLists,
});

const mapDispatchToProps = {
    TokenExchangePairList,
    TokenExchangeOrderList,
    TokenExchangeTradList
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenExchange);