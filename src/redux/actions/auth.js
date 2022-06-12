import ActionTypes from './actionTypes';
import axios from 'axios';
import { setItem } from '../../utils/helper';
import * as config from '../../static/constants';
import { getItem } from '../../utils/helper';

export const SignupUser = (user, history) => async dispatch => {
    try {
        await axios.post(`${config.BACKEND_URL}auth/signup`, { ...user, name: user.email, role: 'user' });
        history.push('confirm', user["email"]);
        // history.push('profile',user["email"]);
        dispatch({
            type: ActionTypes.SignupUser,
            payload: user
        })
    } catch (err) {
        dispatch({
            type: ActionTypes.SignupUserError,
            payload: err.response.data.errors
        });
    }
}

export const ConfirmUser = (user, history) => async dispatch => {
    try {
        let res = await axios.post(`${config.BACKEND_URL}auth/confirm`, { ...user });
        // setItem('access_token', res.data.access_token);
        // setItem('user_id',res.data.user_id);
        history.push('profile', user["email"]);
        dispatch({
            type: ActionTypes.ConfirmUser,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ActionTypes.ConfirmUserError,
            payload: err.response.data
        });
    }
}

export const UserProfile = (user, email, history) => async dispatch => {
    try {

        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_URL}auth/profile`, { ...user, email: email }, header);
        // setItem('access_token', res.data.access_token);
        // setItem('user_id',res.data.user_id);
        history.push('phone', res.data.id);
        dispatch({
            type: ActionTypes.UserProfile,
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        // type: ActionTypes.UserProfileError,
        // payload: err.response.data.errors
        // });
    }
}
export const UserProfile1 = (user, email, history) => async dispatch => {
    try {

        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_URL}auth/profilechange`, { ...user }, header);
        // setItem('access_token', res.data.access_token);
        // setItem('user_id',res.data.user_id);
        console.log("hello");
        // history.push('phone', res.data.id);
        dispatch({
            type: ActionTypes.UserProfile1,
            payload: res.data
        });
        setItem('api_enabled', res.data.api_enabled);
        console.log('hello', user.change_state);
        if (user.change_state) {
            setItem('access_token');
            setItem('user_id');
            window.location.href = "/login";
            dispatch({
                type: ActionTypes.SignOut
            })
        } else {
            history.push('');
        }
    } catch (err) {
        dispatch({
            type: ActionTypes.UserProfileError,
            payload: err.response.data.errors
        });
    }
}
export const GetUserProfile = (user_id) => async dispatch => {
    try {

        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        let res = await axios.get(`${config.BACKEND_URL}auth/profile/${user_id}`, header);
        dispatch({
            type: ActionTypes.GetUserProfile,
            payload: res.data
        });
    } catch (err) {
    }
}

export const UserPhone = (id) => async dispatch => {
    try {

        let res = await axios.post(`${config.BACKEND_URL}auth/phone`, { id });
        // setItem('access_token', res.data.access_token);
        // setItem('user_id',res.data.user_id);
        console.log("phone verify");
        // history.push('twofa',email);
        dispatch({
            type: ActionTypes.UserPhone,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            // type: ActionTypes.UserProfileError,
            // payload: err.response.data.errors
        });
    }
}
export const Check2FAEnable = (user_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}auth/check2faenable`, { user_id: user_id }, header);
        dispatch({
            type: ActionTypes.Check2FAEnable,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
}

export const Check2FAAnswer = (newToken) => async dispatch => {
    dispatch({
        type: ActionTypes.Check2FAEnable,
        payload: newToken
    });
}
export const Check2FACountPlus = (newToken) => async dispatch => {
    dispatch({
        type: ActionTypes.Check2FACountPlus,
        payload: newToken
    });
}
export const UserTwo = (user, email, history) => async dispatch => {
    try {

        let res = await axios.post(`${config.BACKEND_URL}auth/two`, { ...user, email });
        // setItem('access_token', res.data.access_token);
        // setItem('user_id',res.data.user_id);
        console.log("2FA");
        history.push('login');
        dispatch({
            type: ActionTypes.UserTwo,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ActionTypes.UserTwoError,
            payload: err.response.data.errors
        });
    }
}


export const Resend = (user, history) => async dispatch => {
    try {
        let res = await axios.post(`${config.BACKEND_URL}auth/send`, { ...user });
        // setItem('access_token', res.data.access_token);
        // setItem('user_id',res.data.user_id);
        dispatch({
            type: ActionTypes.ReSend,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ActionTypes.ReSendError,
            payload: err.response.data
        });
    }
}

export const ResendConfirm = (user, history) => async dispatch => {
    try {
        let res = await axios.post(`${config.BACKEND_URL}auth/reconfirm`, { ...user });
        // setItem('access_token', res.data.access_token);
        // setItem('user_id',res.data.user_id);
        dispatch({
            type: ActionTypes.ReConfirmUser,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ActionTypes.ReConfirmUserError,
            payload: err.response.data
        });
    }
}

export const Disable2Fa = (user_id) => async dispatch => {
    try {
        let res = await axios.get(`${config.BACKEND_URL}auth/disable2fa/${user_id}`);
        // setItem('access_token', res.data.access_token);
        setItem('api_enabled', res.data.api_enabled);
        dispatch({
            type: ActionTypes.Disable2Fa,
            payload: res.data
        });
    } catch (err) {
    }
}

export const ChangePassword = (user, history) => async dispatch => {
    try {
        let res = await axios.post(`${config.BACKEND_URL}auth/change`, { ...user });
        // setItem('access_token', res.data.access_token);
        // setItem('user_id',res.data.user_id);
        if (res.data == 'Successfully changed!')
            history.push('login');
        if (res.data == 'Wrong Key!')
            alert("Please input correct key. You can check it in your email.");
        if (res.data == 'Wrong Email!')
            alert("Please input correct email.");
        if (res.data == 'Wrong Confirm!')
            alert("Please input password and password confirm.");
        dispatch({
            type: ActionTypes.ChangePassword,
            payload: res.data
        });
        return;
    } catch (err) {
        dispatch({
            type: ActionTypes.ChangePasswordError,
            payload: err.response.data
        });
    }
}

export const SendUser = (user, history) => async dispatch => {
    try {
        let res = await axios.post(`${config.BACKEND_URL}auth/send`, { ...user });
        // setItem('access_token', res.data.access_token);
        // setItem('user_id',res.data.user_id);
        history.push('change-password');
        dispatch({
            type: ActionTypes.SendUser,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ActionTypes.SendUserError,
            payload: err.response.data
        });
    }
}

export const SigninUsers = (res) => async dispatch => {
    setItem('access_token', res.access_token);
    setItem('user_id', res.user_id);
    dispatch({
        type: ActionTypes.SigninUser,
        payload: res
    });
}


export const SigninUser = (user, history) => async dispatch => {
    try {
        let res = await axios.post(`${config.BACKEND_URL}auth/login`, { ...user });

        // history.push('');
        if (!res.data.verified) {
            history.push('confirm', res.data.email);
            return;
        }
        if (!res.data.profile) {
            history.push('profile', res.data.email);
            dispatch({
                type: ActionTypes.SigninProfile,
                payload: res.data
            });
            return;
        }
        if (!res.data.api_enabled) {
            setItem('access_token', res.data.access_token);
            setItem('user_id', res.data.user_id);
            dispatch({
                type: ActionTypes.SigninUser,
                payload: res.data
            });
            history.push('');
            setItem('api_enabled', res.data.api_enabled);
            return;
        }

        setItem('api_enabled', res.data.api_enabled);

        dispatch({
            type: ActionTypes.SigninApiEnable,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: ActionTypes.SigninUserError,
            payload: err.response.data
        });
    }
}

export const SetApiEnable = () => dispatch => {

    dispatch({
        type: ActionTypes.SetApiEnable
    })
}

export const SignOut = (history) => dispatch => {

    // delete token function call here
    setItem('access_token');
    setItem('user_id');
    window.location.href = "/login";
    dispatch({
        type: ActionTypes.SignOut
    })
}

export const setCurrentUser = (user) => {
    return {
        type: ActionTypes.SetCurrentUser,
        payload: user
    }
}
