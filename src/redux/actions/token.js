import axios from "axios";
import ActionTypes from "./actionTypes";
import * as config from '../../static/constants';
import { getItem } from '../../utils/helper';

export const GetTokenInfoBase = () => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/tokenList`, {}, header);
        dispatch({
            type: ActionTypes.TokenList,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}


export const TokenExchangePairList = () => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/exchangeTokenPair`, {}, header);
        dispatch({
            type: ActionTypes.TokenExchangePairList,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'TokenExchangePairList');
    }
}

export const TokenExchangeOrderList = (name = "USDT_BTC") => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/exchangeOrder`, { pair: name }, header);
        dispatch({
            type: ActionTypes.TokenExchangeOrderList,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'TokenExchangeOrderList');
    }
}

export const TokenExchangeTradList = (name = "USDT_BTC") => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/exchangeTrade`, { pair: name }, header);
        dispatch({
            type: ActionTypes.TokenExchangeTradList,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'TokenExchangeTradList');
    }
}

export const CreateToken = (newToken) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        await axios.post(`${config.BACKEND_URL}main/createToken`, newToken, header);
    } catch (err) {
        console.log(err);
    }
}