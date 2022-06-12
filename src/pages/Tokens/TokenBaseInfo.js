import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableHead,
    TableRow,
    TableSortLabel,
    Paper,
    Button,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import GetAppIcon from '@material-ui/icons/GetApp';
import { GetTokenInfoBase, CreateToken } from '../../redux/actions/token';

import PropTypes from "prop-types";
import TokenBaseInfoContainer from "./TokenBaseInfo.style";
import AddModal from '../../components/TokenBaseInfo/AddModal';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            padding: 20
        },
    },
    paper: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: theme.spacing(3),
        marginTop: 80,
        [theme.breakpoints.down("lg")]: {
            width: '90%'
        },
        [theme.breakpoints.down("md")]: {
            width: '100%'
        },
    },
    table: {
        minWidth: 750,
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
    tokenPair: {
        display: "flex",
        color: theme.palette.warning.warningDark,
    },
    tokenPairType: {
        paddingTop: theme.spacing(0.5),
    },
    whitePaper: {
        marginTop: theme.spacing(0.5),
        color: theme.palette.common.black,
    },
    showDetail: {
        color: theme.palette.common.black,
        textDecoration: 'none'
    },
    downloadIcon: {
        marginTop: theme.spacing(0.5),
    },
    logo:{
        width:'50px'
    }
}));

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
    { id: 'token_pair_type', numeric: false, disablePadding: false, label: 'Pair', sortable: true },
    { id: 'token_logo', numeric: false, disablePadding: false, label: 'Logo', sortable: false },
    { id: 'token_symbol', numeric: false, disablePadding: false, label: 'Symbol', sortable: true },
    { id: 'token_decimal', numeric: true, disablePadding: false, label: 'Decimal', sortable: true },
    { id: 'token_last_price', numeric: true, disablePadding: false, label: 'Last Price', sortable: true },
    { id: 'token_24h_change', numeric: true, disablePadding: false, label: '24h Change', sortable: true },
    { id: 'token_24h_high', numeric: true, disablePadding: false, label: '24h High', sortable: true },
    { id: 'token_24h_low', numeric: true, disablePadding: false, label: '24h Low', sortable: true },
    { id: 'token_24h_volume', numeric: true, disablePadding: false, label: '24h Volume', sortable: true },
    { id: 'token_whitepaper', numeric: false, disablePadding: false, label: 'Whitepaper', sortable: false },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        size={"medium"}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {(headCell.sortable === true && (
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
                        ))}
                        {(headCell.sortable === false && (
                            <div>
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </div>
                        ))}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const TokenBaseInfo = (props) => {
    const { selectLanding, CreateToken, GetTokenInfoBase } = props;
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openAdd, setOpenAdd] = useState(false);

    useEffect(() => {
        GetTokenInfoBase();
    }, [])

    useEffect(() => {
        selectLanding();
    }, [selectLanding]);

    // useEffect(() => {
    // }, [isAuthenticated])

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

    const handleClickOpen = () => {
        setOpenAdd(true);
    }

    const onClose = () => {
        setOpenAdd(false);
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.tokenList.length - page * rowsPerPage);

    return (
        <TokenBaseInfoContainer className={classes.root}>
            <Paper className={classes.paper} elevation={8}>
                <div className="text-right token-info-header"><Button variant="outlined" color="primary" onClick={handleClickOpen}>Add</Button>
                </div>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='small'
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={props.tokenList.length}
                        />
                        <TableBody>
                            {stableSort(props.tokenList, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.token_pair_type}
                                            selected={isItemSelected}
                                        >
                                            <TableCell component="th" id={labelId} scope="row" padding="checkbox">
                                                <div className={classes.tokenPair}>
                                                    <StarIcon style={{ color: 'rgba(238, 197, 6, .7)' }} />
                                                    <span className={classes.tokenPairType}>{row.token_pair_type}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="left"><img src={row.token_logo} alt="token logo" className={classes.logo}/></TableCell>
                                            <TableCell align="left">{row.token_symbol}</TableCell>
                                            <TableCell align="right">{row.token_decimal}</TableCell>
                                            <TableCell align="right">{row.token_last_price}</TableCell>
                                            <TableCell align="right">{row.token_24h_change}</TableCell>
                                            <TableCell align="right">{row.token_24h_high}</TableCell>
                                            <TableCell align="right">{row.token_24h_low}</TableCell>
                                            <TableCell align="right">{row.token_24h_volume}</TableCell>
                                            <TableCell align="center"><a href={row.token_whitepaper} className={classes.whitePaper} target='blank'><GetAppIcon className={classes.downloadIcon} /></a></TableCell>
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
                    count={props.tokenList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <AddModal isVisible={openAdd} onClose={onClose} fullWidth={true} maxWidth={'sm'} createToken={CreateToken} />
        </TokenBaseInfoContainer>
    );
};

TokenBaseInfo.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    tokenList: state.token.tokenList,
});

const mapDispatchToProps = {
    GetTokenInfoBase,
    CreateToken
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenBaseInfo);