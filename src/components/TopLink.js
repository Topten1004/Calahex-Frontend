import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import { Check2FAEnable, Check2FAAnswer, SignOut, Check2FACountPlus, Disable2Fa } from "../redux/actions/auth";
import Check2FAModal from "./Check2FAModal";
import { getItem } from '../utils/helper';
import * as config from '../static/constants';
import axios from 'axios';

const TopLink = (props) => {
    const { check2FaEnable } = props;

    const [openAdd, setOpenAdd] = useState(false);
    const [showError, setShowError] = useState(false);

    let click_flag = 0;

    const onClose = () => {
        setOpenAdd(false);
        if (props.onclose) {
            props.onclose();
        }
    }


    const linkclicked = (e) => {
        // 
        if (window.location.pathname === props.to) return;

        if (props.to === '/future-trading' || props.to === '/buy-crypto' || props.to === '/profilechange' || props.to === '/change-password' || props.to === '/wallet/account-overview' || props.to === '/disable2fa') {

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
                        props.history.push(props.to);
                    }
                });

            } catch (err) {
                console.log(err);
            }


        } else {
            props.history.push(props.to);
        }
        props.onclicked();
    }
    const checkanswer = (new_token) => {
        if (props.check2FaEnable.answer === new_token) {
            click_flag = 0;
            setShowError(false);
            if (props.to !== '/disable2fa') props.history.push(props.to);
            setOpenAdd(false);
            if (props.to === '/disable2fa') {
                props.Disable2Fa(props.user_id);
            }
            if (props.onclose) {
                props.onclose();
            }
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

    return (
        <>
            <Typography className={props.className} onClick={linkclicked}>
                {props.name}
            </Typography>
            <Check2FAModal isVisible={openAdd} onClose={onClose} fullWidth={true} maxWidth={'sm'} createToken={checkanswer} showError={showError} />
        </>
    );
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user_id: state.auth.user_id,
    check2FaEnable: state.auth.check2FaEnable,
    check2FaAnswer: state.auth.check2FaAnswer,
    checka2FaCount: state.auth.checka2FaCount,
});

const mapDispatchToProps = {
    Check2FAEnable, Check2FAAnswer, SignOut, Check2FACountPlus, Disable2Fa
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopLink));