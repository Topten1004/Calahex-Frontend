import React, { useContext} from "react";
import PropTypes from "prop-types";
import {
    withStyles,
    withWidth,
    Button, TextField, InputLabel, Select, MenuItem, FormControl,
} from "@material-ui/core";
import { LanguageContext } from '../../../../utils/Language';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";

const styles = theme => ({
    root: {
        margin: 0,
    },
    balanceTotal: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 10,
        minHeight: 100,
        marginTop: 5,
    },
    balanceOrder: {
        backgroundColor: 'red',
        borderRadius: 10,
        marginTop: 5,
        minHeight: 100,
    },
    balanceAvailble: {
        backgroundColor: '#d2a679',
        borderRadius: 10,
        marginTop: 5,
        minHeight: 100,
    },
    balanceText: {
        color: 'white',
        fontSize: 12,
        marginLeft: 15,
        paddingTop: 30
    },
    valueText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 15,
    },
    descriptionText: {
        textColor: 'gray',
        fontSize: 12,
    },
    circleIcon: {
        borderRadius: '50%',
        border: 5,
        width: 25,
        height: 15,
        backgroundColor: 'orange'
    },
    balance: {
        padding: 2
    }
});


function CryptoBalance(props) {
    const {
        classes,
    } = props;

    const { dictionary } = useContext(LanguageContext);


    return (

            <Grid container>
                <Grid item xs={12} sm={4} className={classes.balance}>
                    <div className={classes.balanceTotal}>
                        <Typography  className={classes.balanceText}>Total balance:</Typography>
                        <Typography  className={classes.valueText}>{props.total}&nbsp;{props.coin}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.balance}>
                    <div className={classes.balanceAvailble}>
                        <Typography  className={classes.balanceText}>Available balance:</Typography>
                        <Typography  className={classes.valueText}>{props.available}&nbsp;{props.coin}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.balance}>
                    <div className={classes.balanceOrder}>
                        <Typography  className={classes.balanceText}>In order:</Typography>
                        <Typography  className={classes.valueText}>{props.order}&nbsp;{props.coin}</Typography>
                    </div>
                </Grid>
            </Grid>

    );
}

CryptoBalance.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withWidth()(
    withStyles(styles, { withTheme: true })(CryptoBalance)
);
