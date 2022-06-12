import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    withStyles,
    withWidth,
    Container,
    Grid, Button
} from "@material-ui/core";
import { LanguageContext } from '../../../utils/Language';
import Slide from "@material-ui/core/Slide";
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import CloudCheck from '../../../assets/cloud-check.png';
import UserVerify from '../../../assets/user_verify.png';
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { connect } from 'react-redux';
import { VerifyInfo } from "../../../redux/actions/wallet"
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { Check2FAEnable, Check2FAAnswer, SignOut, Check2FACountPlus } from "../../../redux/actions/auth";
import Check2FAModal from "../../Check2FAModal";
import { getItem } from '../../../utils/helper';
import * as config from '../../../static/constants';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    bodySection: {
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 400,
        height: 'calc(100vh - 50px)',
        overflowY: 'auto',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: '0px 0px',
        margin: 0
    },
    bodyheader: {
        backgroundColor: 'white',
        display: 'flex',
        padding: '0px 15px 0px 15px',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid black'
    },
    profilebody: {
        backgroundColor: theme.palette.primary.footer,
        borderRadius: 10,
        width: '100%',
        padding: 15,
        marginTop: 15
    },
    mainbody: {
        padding: 20,
    },
    textbody: {
        color: 'white',
        fontSize: 12,
        marginBottom: 10
    },
    enableButton: {
        borderRadius: 20,
        background: theme.palette.primary.main,
        textTransform: 'none',
        color: 'white',
        padding: '0px 5px 0px 5px',
        fontSize: 12,
        textDecoration: "none !important",
        marginTop: 20
    },
    image: {
        width: 80,
        height: 60
    }
}));

const WalletRightBar = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const { verifyInfo, user_id } = props;
    const [checked, setChecked] = React.useState(true);
    const [twofa, setTwofa] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    const { check2FaEnable } = props;

    const [openAdd, setOpenAdd] = useState(false);
    const [showError, setShowError] = useState(false);

    let click_flag = 0;

    const checkanswer = (new_token) => {
        if (props.check2FaEnable.answer === new_token) {
            click_flag = 0;
            setShowError(false);
            history.push('/profilechange', user_id);
            setOpenAdd(false);
        } else {
            setShowError(true);
            click_flag++;
            if (click_flag > 2) {
                setOpenAdd(false);
                click_flag = 0;
                props.SignOut(props.history);
            }
        }
    }
    const onClose = () => {
        setOpenAdd(false);
    }
    const handleTwoChange = () => {
        try {
            const header = {
                headers: { Authorization: `Bearer ` + getItem('access_token') }
            };
            axios.post(`${config.BACKEND_URL}auth/check2faenable`, { user_id: props.user_id }, header).then(res => {
                props.Check2FAAnswer(res.data);
                if (res.data.status === 1) {
                    setOpenAdd(true);
                }
                else {
                    history.push('/profilechange');
                }
            });
        } catch (err) {
            console.log(err);
        }

    }
    const { dictionary } = useContext(LanguageContext);

    useEffect(() => {
        props.VerifyInfo(user_id);
    }, [user_id]);

    useEffect(() => {
        if (Object.keys(verifyInfo).length) {
            if (verifyInfo["auth_verified_at"] != null) {
                setTwofa(true);
            } else {
                setTwofa(false);
            }
        }
    }, [verifyInfo]);

    return (
        <>
            {checked ? <Hidden mdDown>
                <Box className={classes.bodySection}>
                    <div className={classes.bodyheader}>
                        <p>Profile & Security</p>
                        <CloseIcon onClick={handleChange} />
                    </div>
                    <div className={classes.mainbody}>
                        {twofa == false &&
                            <Container className={classes.profilebody}>
                                <Typography className={classes.textbody}>Security</Typography>
                                <Typography className={classes.textbody}>Protect your assets by adding an extra layer of security with 2-Step Verification.</Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Button variant="contained" className={classes.enableButton} onClick={handleTwoChange}>
                                            Enable 2FA
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <img
                                            className={classes.image}
                                            src={CloudCheck}
                                            alt="cloudcheck"
                                        />
                                    </Grid>
                                </Grid>
                            </Container>}
                        <Container className={classes.profilebody}>
                            <Typography className={classes.textbody}>LIMITS & FEATURES</Typography>
                            <Typography className={classes.textbody}>Get increased limits and advanced features by providing a bit more profile information.</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Button variant="contained" className={classes.enableButton}>
                                        Get started
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <img
                                        className={classes.image}
                                        src={UserVerify}
                                        alt="userverify"
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </Box>
            </Hidden> :
                <Box />}
            <Check2FAModal isVisible={openAdd} onClose={onClose} fullWidth={true} maxWidth={'sm'} createToken={checkanswer} showError={showError} />
        </>
    );
}

// WalletRightBar.propTypes = {

// };

WalletRightBar.propTypes = {

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.auth.user_id,
    verifyInfo: state.wallet.verifyInfo,
    check2FaEnable: state.auth.check2FaEnable,
    check2FaAnswer: state.auth.check2FaAnswer,
});

const mapDispatchToProps = {
    VerifyInfo, Check2FAAnswer, SignOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletRightBar);

