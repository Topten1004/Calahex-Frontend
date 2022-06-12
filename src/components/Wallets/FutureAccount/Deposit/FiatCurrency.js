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
import BtcImage from "../../../../assets/btc.png";

const styles = theme => ({
    root: {
        margin: 0,
    },
    headerText: {
        color:  'black',
        fontSize: 16,
        fontWeight: 500
    },
    topTextBody: {
        color: 'gray',
    }
});

function FiatCurrency(props) {
    const {
        classes,
    } = props;

    const { dictionary } = useContext(LanguageContext);


    return (
        <Grid item xs={12} sm={6}>
            <Typography  className={classes.headerText}>1.Select currency and payment method</Typography>
            <Typography  className={classes.topTextBody}>Coin</Typography>
            {/*<FormControl variant="outlined" size="small" fullWidth className={classes.submitTextField}>*/}
            {/*    <InputLabel id="coin-select-outlined-label" size="small"/>*/}
            {/*    <Select*/}
            {/*        labelId="coin-select-outlined-label"*/}
            {/*        id="coin-simple-select-outlined"*/}
            {/*        size="small"*/}
            {/*        onChange={coinHandleChange}*/}
            {/*        defaultValue={props.coin[0].key}*/}
            {/*        startAdornment = {<InputAdornment position="start"><div className={classes.btcPrefix}>*/}
            {/*            <img*/}
            {/*                className={classes.btcImage}*/}
            {/*                src={BtcImage}*/}
            {/*                alt="btc"*/}
            {/*            />*/}
            {/*            <Typography className={classes.coinPrefix}>{coinValue}</Typography>*/}
            {/*        </div></InputAdornment>}*/}
            {/*        fullWidth*/}
            {/*    >*/}
            {/*        {*/}
            {/*            props.coin.map((coincell, index) => (*/}
            {/*                <MenuItem value={coincell.key} key={index}>{coincell.name}</MenuItem>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}
        </Grid>
    );
}

FiatCurrency.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withWidth()(
    withStyles(styles, { withTheme: true })(FiatCurrency)
);
