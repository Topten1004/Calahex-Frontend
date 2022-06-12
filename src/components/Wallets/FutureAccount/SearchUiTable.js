import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FutureWalletState,FutureConvert,FutureWalletInfo} from "../../../redux/actions/wallet"
import {connect} from 'react-redux';
import {
    withStyles,
    withWidth,
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    TableBody, TablePagination, colors,
} from "@material-ui/core";
import { LanguageContext } from '../../../utils/Language';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import StarIcon from "@material-ui/icons/Star";
import {Link} from "react-router-dom";
import GetAppIcon from "@material-ui/icons/GetApp";
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import jsonData from "../../../resources/depositcrypto.json";
import Box from '@material-ui/core/Box'
import SearchBar from "material-ui-search-bar";
import Dialog from "@material-ui/core/Dialog";
import {DialogActions, DialogContent, DialogTitle} from "../Dialog";

const styles = theme => ({
    root: {
    },
    paper: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down("lg")]: {
            width: '100%'
        },
        [theme.breakpoints.down("md")]: {
            width: '100%'
        },
    },
    table: {
        minWidth: 750,
    },
    tableRow: {
        backgroundColor: '#e6e6e6',

    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    tableHeader: {
        minHeight: 50,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textBody: {
        color:  'black',
        fontSize: 16,
        fontWeight: '500'
    },
    tableHeaderTextBody: {
        display: 'flex'
    },
    tableHeaderText: {
        color: theme.palette.primary.main,
        marginLeft: 20
    },
    search: {
        display: "flex",
        border: "solid 1px gray",
        marginLeft: "17px",
        width: "94px",
        height: "27px",
        borderRadius: "5px",
        marginTop: "7px",
        marginRight: "5px"
    },
    searchLetter: {
        marginTop: "3px"
    },
    chartPartTop: {
        display: "flex",
        flexWrap: 'wrap',
    },
    convertLink: {
        color: '#337ab7',
        fontSize: '100%'

    },
    actionColor: {
        color: '#337ab7'
    },
    CheckBoxName: {
        fontSize: '100%'
    },
    FormTopTop: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 11
    },

    Form: {
        display: 'flex',
        flexGrow: 10,
        textAlign: 'center'
    },
    FormBottom: {
        display: 'flex',
        flexGrow: 3
    },
    actionButton: {
        color: '#ffffff',
        backgroundColor: '#055da6',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '20%',
        borderRadius: 5,
        margin: '0 5px',
        textAlign: 'center',
        fontSize:12
    },
    actionSpan: {
        margin: "auto"
    },
    formControl: {
        // margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        width: '100%'
    },
    percentage: {
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        span: {
            width: '20%',
            textAlign: 'center',
            color: 'white',
            padding: '3px 0'
        }
    },
    color_secondary_percent: {
    backgroundColor: '#337ab7b5',
    color: 'black',
    borderRadius: '25px',
    width: '20%',
    margin: '3px 0',
    padding: '8px',
    textAlign: 'center'
    },
    color_primary: {
    backgroundColor: '#337ab7',
    color: 'white'
    },
    firstFieldMargin: {
        marginBottom: theme.spacing(2),
    },
    transferText:{
        textDecoration: 'none !important'
    }

});

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
const headCells = [
    { id: 'logo', numeric: false, disablePadding: true, label: '' },
    { id: 'coin', numeric: false, disablePadding: true, label: 'Coin' },
    { id: 'total', numeric: false, disablePadding: false, label: 'Total' },
    { id: 'available', numeric: false, disablePadding: false, label: 'Available' },
    { id: 'locked', numeric: false, disablePadding: false, label: 'In order' },
    // { id: 'value', numeric: false, disablePadding: false, label: 'BTC Value' },
    //  { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
];

function EnhancedTableHead(props) {
    const { classes,  order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.tableRow}>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
let SearchBars = props => {
    const {handleSearch} = props;
    return (
        <TextField  placeholder="Search" onChange={handleSearch}/>
    );
};


function HistoryTable(props) {
    const {
        classes,
        rows,
        pairInfo,
        user_id
    } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openAdd, setOpenAdd] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [coin, setCoin] = useState("");
    const { dictionary } = useContext(LanguageContext);

    
    const [buyOrderType, setBuyOrderType] = useState('USDT');
    const [fromCoin, setFromCoin] = useState('');
    const [price, setPrice] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [limitAmount, setLimitAmount] = useState('');
    const [amountError, setAmountError] = useState(false);
    const [convertError,setConvertError] = useState(false);
    const [toAmount, setToAmount] = useState('');
        
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleConvert = () => {
        if(price == "") setConvertError(true);
        else {
            setConvertError(false);
            if(totalAmount>limitAmount || totalAmount <= 0) setAmountError(true);
            else {
                setAmountError(false);
                props.FutureConvert(user_id,fromCoin,totalAmount,buyOrderType,toAmount,price);
                props.FutureWalletInfo(user_id);
                handleActiveModalClose();
            }
        }
    }


    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const [display, setColor] = React.useState('contents');

    const handleFutureWalletState = (coinName) =>{
        props.FutureWalletState(coinName);
    }

    const handleChange = (event) => {
        setColor(event.target.checked ? 'none' : 'contents');
    };
    const [activeModalOpen, setActiveModalOpen] = React.useState(false);

    const handleTotalAmount= (e) =>{
        if(price == ""){
            setTotalAmount("");
            setToAmount('');
        } 
        else setTotalAmount(e.target.value);
        if((price!="")&&(e.target.value!="")) setToAmount(price*e.target.value*0.9975);
        else {
            setToAmount('');
            setTotalAmount('');
        }
    }

    const handleToAmount =(e) => {
        if(price == "" || e.target.value == ""){
            setToAmount("");
            setTotalAmount("");
        } 
        else {
            setToAmount(e.target.value);
            setTotalAmount(e.target.value*1/(price*0.9975));
        }
    }

    const handleActiveModalOpen = (coin) => {
        // alert(coin)
        let available = 0, locked=0;
        rows.map((row,i) => {
            if(row.coin == coin) {
                available = row.available;
                locked = row.locked;
            }
        });
        setToAmount("");
        setTotalAmount("");
        setLimitAmount(parseFloat(available)+parseFloat(locked));
        setAmountError(false);
        setConvertError(false);
        setCoin(coin);
        setFromCoin(coin);
        if(coin != buyOrderType && coin !='' && buyOrderType != ''){
            var pair = buyOrderType +'_' +coin;
            var inverse_pair = coin + '_' + buyOrderType;
            if(typeof(pairInfo[pair]) == 'undefined') {
                if(typeof(pairInfo[inverse_pair]) == 'undefined') {
                    setPrice('');
                }
                else setPrice(1/pairInfo[inverse_pair]["last"]);
            }
            else setPrice(pairInfo[pair]["last"]);
        } else setPrice('');
        setActiveModalOpen(true);
        //document.getElementById("outlined-basic").innerHTML = document.getElementById("coinname").innerHTML;
        
    };


    const handleActiveModalClose = () => {
        setActiveModalOpen(false);
    };
    const handleLimitAmount = (e) => {
        if(price != "") {
            setTotalAmount(Number(e*limitAmount/100));
            setToAmount(Number(e*limitAmount*price/100*0.9975));    
        } else {
            setTotalAmount("");
            setToAmount("");    
        }
    }

    const handleBuyOrderType = (e) => {
        setBuyOrderType(e.target.value);
        if(fromCoin != e.target.value && fromCoin !='' && e.target.value != ''){
            var pair = e.target.value +'_' +fromCoin;
            var inverse_pair = fromCoin + '_' + e.target.value;
            if(typeof(pairInfo[pair]) == 'undefined') {
                if(typeof(pairInfo[inverse_pair]) == 'undefined') {
                    setPrice('');
                }
                else {
                    setPrice(1/pairInfo[inverse_pair]["last"]);
                    if(totalAmount != "") setToAmount(1/pairInfo[inverse_pair]["last"]*totalAmount);
                }
            }
            else{
                setPrice(pairInfo[pair]["last"]);  
                if(totalAmount != "") setToAmount(pairInfo[pair]["last"]*totalAmount);
            } 
        }else setPrice('');
        
    }

    const handleFromCoin = (e) => {
        setFromCoin(e.target.value);
        if(e.target.value != buyOrderType && e.target.value !='' && buyOrderType != ''){
            var pair = buyOrderType +'_' +e.target.value;
            var inverse_pair = e.target.value + '_' + buyOrderType;
            if(typeof(pairInfo[pair]) == 'undefined') {
                if(typeof(pairInfo[inverse_pair]) == 'undefined') {
                    setPrice('');
                }
                else {
                    setPrice(1/pairInfo[inverse_pair]["last"]);
                    if(totalAmount != "") setToAmount(1/pairInfo[inverse_pair]["last"]*totalAmount);
                }
            }
            else{
                setPrice(pairInfo[pair]["last"]);  
                if(totalAmount != "") setToAmount(pairInfo[pair]["last"]*totalAmount);
            } 
        }else setPrice('');
        let available = 0, locked = 0;
        rows.map((row,i) => {
            if(row.coin == e.target.value) {
                available = row.available;
                locked = row.locked;
            }
        });
        setLimitAmount(parseFloat(available)+parseFloat(locked));
    }

    function coinexpress() {
        return 'sdfs';

    }

    const [selectRow, setSelectRow] = useState({});
    let handleSearch = event => {
        const {data} = this.state
        let filteredDatas = []
        filteredDatas = data.filter(e => {
            let mathesItems = Object.values(e)
            let retVal = true;
            mathesItems.forEach(e => {
                const regex = new RegExp(event.target.value, 'gi')
                if (typeof e == 'string')
                    retVal = e.match(regex)
            })
            return retVal;
        })
        this.setState({filterData: filteredDatas, searchValue: event.target.value})
    }


    return (
        <div>
            <Grid className={classes.chartPartTop}>

                <Grid item lg={4} md={6} sm={12} xs={12}>
                    <SearchBar
                        onChange={(newValue) => {
                            setSearchValue(newValue)
                        }}
                        onRequestSearch={() => console.log('onRequestSearch')}
                        style={{
                            margin: '12px 50px 12px 10px'
                        }}
                    />
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}  className={classes.FormTopTop}>

                        <Grid  className={classes.Form}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checkedB"
                                        color="primary"
                                        checked={display === 'none'}
                                        onChange={handleChange}
                                    />
                                }
                            />
                            <p className={classes.CheckBoxName}>Hide small balances</p>
                        </Grid>
                        {/* <Grid  className={classes.Form}>
                            <a href={""}><p className={classes.convertLink}>Convert to CAX</p></a>
                        </Grid> */}


                </Grid>





            </Grid>

            <div className={classes.root}>
                <Paper className={classes.paper} elevation={8}>
                    <div className={['text-right', 'token-info-header',classes.tableHeader].join(" ")} >
                        <Typography  className={classes.tableHeaderText}>Crypto Balance</Typography>

                    </div>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size='medium'
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />

                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter(list=> searchValue === "" || list.coin.toLowerCase().search(searchValue.toLowerCase()) >= 0)
                                    .map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.coin)}
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                            >
                                             <Box display={parseFloat(row.available) == 0 && (display=="none")?"none":"contents"} >
                                                    <TableCell align="center" id="coinlogo"><img src={row.logo} height="30px" width="30px"></img></TableCell>
                                                    <TableCell align="left" id="coinname">{row.coin}</TableCell>
                                                    <TableCell align="left">{Number((parseFloat(row.available)+parseFloat(row.locked))*row.rate).toFixed(5)+' $'}</TableCell>
                                                    <TableCell align="left">{Number(row.available).toFixed(5)}</TableCell>
                                                    <TableCell align="left">{Number(row.locked>0?row.locked:-row.locked).toFixed(5)}</TableCell>
                                                    {/*<TableCell align="left">{row.value}</TableCell>*/}
                                                    
                                                </Box>   
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 33 * emptyRows }}>
                                        <TableCell colSpan={11} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <Dialog fullWidth={true} onClose={handleActiveModalClose} aria-labelledby="customized-dialog-title" open={activeModalOpen} >
                <DialogTitle id="customized-dialog-title"  onClose={handleActiveModalClose}>
                    Convert
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">From coin</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                fullWidth
                                value={fromCoin}
                                onChange={handleFromCoin}
                                label="Coin Selection"
                            >
                                {rows.map((row,i) => (
                                    (parseFloat(row.available)>0) && <MenuItem key = {i} value={row.coin}>{row.coin}</MenuItem>
                                ))}
                                

                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label" >To coin</InputLabel>
                            <Select autoFocus
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                fullWidth
                                value={buyOrderType}
                                onChange={handleBuyOrderType}
                                label="Coin Selection"
                            >
                                {rows.map((row,i) => (
                                   (row.coin!=fromCoin && (typeof(pairInfo[row.coin + '_'+fromCoin]) != "undefined" || typeof(pairInfo[fromCoin + '_' + row.coin]) != "undefined")) && <MenuItem key = {i} value={row.coin}>{row.coin}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                        {/*{buyOrderType === "stoplimit" && <TextField id="outlined-basic" size="small" label="Stop Price" variant="outlined" fullWidth InputProps={{*/}
                        {/*    endAdornment: <InputAdornment position="end">{selectRow?.name ? selectRow?.name.split('_')[0] : ""}</InputAdornment>,*/}
                        {/*}} />}*/}
                        <TextField className={classes.firstFieldMargin} size="small" label= "Price" value ={price} variant="outlined" fullWidth InputProps={{
                            endAdornment: <InputAdornment position="end" id="outlined-basic" >{buyOrderType}</InputAdornment>,
                        }} disabled/>
                        {convertError&&<Typography variant = "" color="error">Can't convert</Typography>}
                        <TextField className={classes.firstFieldMargin} type = "number" size="small" label="Amount" onChange = {handleToAmount} value = {toAmount} variant="outlined" fullWidth InputProps={{
                            endAdornment: <InputAdornment position="end" id="outlined-basic-second" >{buyOrderType}</InputAdornment>,
                        }} />
                        {(price!="Price")&&(totalAmount!="") && <Typography variant = "" color="primary">fee:{price*totalAmount*0.0025}</Typography>}
                        <TextField className={classes.firstFieldMargin} type = "number" size="small" label="Total" onChange = {handleTotalAmount} value={totalAmount} variant="outlined" fullWidth InputProps={{
                            endAdornment: <InputAdornment position="end" >{fromCoin}</InputAdornment>,
                        }} />
                        {amountError&&<Typography variant = "" color="error">Please input correct amount!</Typography>}
                        <TextField className={classes.firstFieldMargin} type = "number" size="small" label="Available" value={limitAmount} variant="outlined" fullWidth InputProps={{
                            endAdornment: <InputAdornment position="end" >{fromCoin}</InputAdornment>,
                        }} disabled/>
                        <div className={classes.percentage}>
                            <span size="small" type="primary" onClick = {() =>handleLimitAmount(25)} className={classes.color_secondary_percent}>25%</span>
                            <span size="small" type="primary" onClick = {() =>handleLimitAmount(50)} className={classes.color_secondary_percent} >50%</span>
                            <span size="small" type="primary" onClick = {() =>handleLimitAmount(75)} className={classes.color_secondary_percent} >75%</span>
                            <span size="small" type="primary" onClick = {() =>handleLimitAmount(100)} className={classes.color_secondary_percent} >100%</span>
                        </div>


                    </div>
                </DialogContent>
                <DialogActions>
                    <Button fullWidth size="small" onClick = {handleConvert} className={classes.color_primary}>Convert</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

HistoryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = {
    FutureWalletState,FutureConvert,FutureWalletInfo
};
const mapStateToProps = state => ({
    pairInfo:state.wallet.pairInfo,
    user_id:state.auth.user_id

});
export default withWidth()(
    withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(HistoryTable))
);
