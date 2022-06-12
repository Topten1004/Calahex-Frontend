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
import SearchIcon from "@material-ui/icons/Search";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import jsonData from "../../../resources/depositcrypto.json";

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
        marginRight: "15px"
    },
    searchLetter: {
        marginTop: "3px"
    },
    chartPartTop: {
        display: "flex"
    },
    convertLink: {
        marginTop: "11px",
        color: '#337ab7'
    },
    actionColor: {
        color: '#337ab7'
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
    { id: 'total', numeric: false, disablePadding: false, label: 'Total' },
    { id: 'available', numeric: false, disablePadding: false, label: 'Available' },
    { id: 'locked', numeric: false, disablePadding: false, label: 'Locked' },
    { id: 'value', numeric: false, disablePadding: false, label: 'BTC Value' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
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

function HistoryTable(props) {
    const {
        classes,
        rows
    } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openAdd, setOpenAdd] = useState(false);

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

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
        <div>


            <div className={classes.root}>
                <Paper className={classes.paper} elevation={8}>
                    <div className={['text-right', 'token-info-header',classes.tableHeader].join(" ")} >
                        <Typography  className={classes.tableHeaderText}>Balance</Typography>

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
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                <TableCell align="left">{row.coin}</TableCell>
                                                <TableCell align="left">{row.total}</TableCell>
                                                <TableCell align="left">{row.available}</TableCell>
                                                <TableCell align="left">{row.locked}</TableCell>
                                                <TableCell align="left">{row.value}</TableCell>
                                                <TableCell align="left" className={classes.actionColor}>{row.action}</TableCell>
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
        </div>

    );
}

HistoryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withWidth()(
    withStyles(styles, { withTheme: true })(HistoryTable)
);
