import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
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
    TableBody, TablePagination,
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

const styles = theme => ({
    root: {
    },
    paper: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: theme.spacing(3),
        marginTop: 80,
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
    aTag: {
        textDecoration: 'none'
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
    { id: 'coin', numeric: false, disablePadding: true, label: 'Coin' },
    { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' }
];

function EnhancedTableHead(props) {
    const { classes,  order, orderBy, rowCount, onRequestSort, historySelect ,clearSelected} = props;
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
                <TableCell align="center"><input type="checkbox" onChange={(e)=>{historySelect(0, e.target.checked)}}></input></TableCell>
                <TableCell align="right"><button onClick={()=>{clearSelected()}}>Clear Selected</button></TableCell>
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

function HistoryTable(props) {
    const {
        classes,
        rows,
        historyCancel
    } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openAdd, setOpenAdd] = useState(false);
    const [view, setView] = useState(false);
    const [historySelected, SetHistorySelected] = useState([]);
    const { dictionary } = useContext(LanguageContext);


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

    const historySelect = (payment_id, checked) => {
        if(payment_id == 0){
            if(checked == true){
                var newSelected = historySelected;
                rows.map((row, i) => {
                    newSelected[row.payment_id] = true;
                })
                SetHistorySelected(newSelected);
            }
            else{
                var newSelected = historySelected;
                rows.map((row, i) => {
                    newSelected[row.payment_id] = false;
                })
                SetHistorySelected(newSelected);
            }
        }
        else{
            var newSelected = historySelected;
            newSelected[payment_id] = checked;
            SetHistorySelected(newSelected);
        }
    }

    const clearSelected = () => {
        rows.map(row=>{
            if(historySelected[row.payment_id] == true){
                historyCancel(row.payment_id)
            }
        })
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={8}>
                <div className={['text-right', 'token-info-header',classes.tableHeader].join(" ")} >
                    <Typography  className={classes.textBody}>{props.name}</Typography>
                    <div className={classes.tableHeaderTextBody}>
                        <a className={classes.aTag} href="mailto:customerservice@calahex.com">
                            <Typography  className={classes.tableHeaderText}>Didn't receive email</Typography>
                        </a>
                        <a className={classes.aTag} href="#" onClick={()=>{setView(!view)}}>
                            <Typography  className={classes.tableHeaderText}>View {view?'less':'all'}</Typography>
                        </a>
                    </div>
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
                            historySelect={historySelect}
                            clearSelected={clearSelected}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`; 
                                    var curDate = new Date();
                                    var date = new Date(row.date);
                                    var diff_date = (curDate.getTime() - date.getTime())/(1000*3600*24);
                                    if(view == true || diff_date < 30)
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.coin)}
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                            >
                                                <TableCell align="left">{row.coin}</TableCell>
                                                <TableCell align="left">{row.amount}</TableCell>
                                                <TableCell align="left">{row.status=='requesting'?'open':'confirmed'}</TableCell>
                                                <TableCell align="left">{row.date}</TableCell>
                                                <TableCell align="center"><input type="checkbox" onChange={(e)=>{historySelect(row.payment_id, e.target.checked)}} checked={historySelected[row.payment_id]==true}></input></TableCell>
                                                <TableCell align="right"><button onClick={()=>{historyCancel(row.payment_id)}}>Clear</button></TableCell>
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
    );
}

HistoryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withWidth()(
    withStyles(styles, { withTheme: true })(HistoryTable)
);
