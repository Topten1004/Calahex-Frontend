import axios from "axios";
import * as config from "../../static/constants";
import ActionTypes from "./actionTypes";
import { getItem } from '../../utils/helper';

export const CryptoExchangePairList = (name = "all") => async dispatch => {
    try {
        dispatch({
            type: ActionTypes.LODING
        });
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_URL}main/exchangeCryptoPair`, { pair_end: name }, header);
        if(name === "all") {
            res.data = res.data.map(dat => ({...dat, name: dat.name.split('_').reverse().join('_')}));
        }
        dispatch({
            type: ActionTypes.CryptoExchangePairList,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'CryptoExchangePairList');
    }
}

export const CryptoExchange30Volume = (user_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_URL}main/order30balance`, { user_id: user_id }, header);
        dispatch({
            type: ActionTypes.CryptoExchange30Volume,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'CryptoExchangePairList');
    }
}

export const CryptoExchangeOrderClear = (user_id,toCoin,fromCoin,type,id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_URL}main/exchangeOrderClear`, {user_id: user_id,toCoin:toCoin, fromCoin:fromCoin, type:type, id: id }, header);
        dispatch({
            type: ActionTypes.CryptoExchangeOrderCancel,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'CryptoExchangeOrderList');
    }
}


export const CryptoExchangeOrderCancel = (user_id,toCoin,fromCoin,type,id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_URL}main/exchangeOrderCancel`, {user_id: user_id,toCoin:toCoin, fromCoin:fromCoin, type:type, id: id }, header);
        dispatch({
            type: ActionTypes.CryptoExchangeOrderCancel,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'CryptoExchangeOrderList');
    }
}

export const CryptoExchangeOrderList = (name = "USDT_BTC", user_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_URL}main/exchangeOrder`, { pair: name , user_id: user_id}, header);
        res.data.asks.reverse();
        dispatch({
            type: ActionTypes.CryptoExchangeOrderList,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'CryptoExchangeOrderList');
    }
}

export const CryptoExchangeTradList = (name = "USDT_BTC") => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/exchangeTrade`, { pair: name }, header);
        dispatch({
            type: ActionTypes.CryptoExchangeTradList,
            payload: res.data
        });
    } catch (err) {
        console.log(err, 'CryptoExchangeTradList');
    }
}

export const CryptoExchangePairInfo = () => async dispatch => {
    try{
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/exchangeInfo`, {}, header);
        dispatch({
            type: ActionTypes.CryptoExchangePairInfo,
            payload:res.data
        });
    } catch (err) {
        console.log(err,'CryptoExchangePairInfo');
    }
}

export const CryptoExchangeLimitAmount = (user_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/exchangeLimitAmount`,{ user_id: user_id }, header);
         
        dispatch({
            type: ActionTypes.CryptoExchangeLimitAmount,
            payload:res.data
        })
    } catch (err) {
        console.log(err,'CryptoExchangeLimitAmount');
    }
}

export const CryptoExchangeFeeAmount = (user_id) => async dispatch =>{
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/exchangeFeeAmount`,{ user_id: user_id }, header);
        dispatch({
            type: ActionTypes.CryptoExchangeFeeAmount,
            payload:res.data
        })
    } catch (err) {
        console.log(err,'CryptoExchangeFeeAmount');
    }
}

export const CryptoExchangeBuyAmount = (toAmount, toCoin, fromAmount, fromCoin,user_id)  => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/buyAmount`,{toAmount:toAmount,toCoin:toCoin, fromAmount:fromAmount,fromCoin:fromCoin,user_id:user_id }, header);
        dispatch({
            type: ActionTypes.CryptoExchangeResult,
            payload:res.data
        })
    } catch (err) {
        console.log(err);
    }
}


export const CryptoExchangeAddOrder = (toAmount, toCoin, fromAmount, fromCoin,user_id,exchangePrice, fee,type,status, pay_type)  => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/addOrder`,{toAmount:toAmount,toCoin:toCoin, fromAmount:fromAmount,fromCoin:fromCoin,user_id:user_id,exchangePrice:exchangePrice,type:type,status:status, pay_type:pay_type, fee:fee }, header);
    } catch (err) {
        console.log(err);
    }
}

export const CryptoExchangeUserOrderList = (user_id,toCoin,fromCoin,type,price) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/userOrderList`,{ user_id: user_id,toCoin:toCoin, fromCoin:fromCoin, price:price }, header);
        console.log(res.data);
        dispatch({
            type: ActionTypes.CryptoExchangeUserOrderList,
            payload:res.data
        })
    } catch (err) {
        console.log(err,'CryptoExchangeUserOrderList');
    }
}

export const CryptoExchangeUserTradeList = (user_id,toCoin,fromCoin,type) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/userTradeList`,{ user_id: user_id,toCoin:toCoin, fromCoin:fromCoin, type:type }, header);
        console.log(res.data);
        dispatch({
            type: ActionTypes.CryptoExchangeUserTradeList,
            payload:res.data
        })
    } catch (err) {
        console.log(err,'CryptoExchangeUserTradeList');
    }
}