import axios from "axios";
import * as config from "../../static/constants";
import ActionTypes from "./actionTypes";
import { getItem } from '../../utils/helper';

export const AccountInfo = (user_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/accountInfo`, { user_id: user_id }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.AccountInfo,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const DepositFiatConfirm = (user_id, amount, currency, corres_bank, swift_code, swift_rbcroyal, address_rbcroyal, benefit_accountname, benefit_accountnumber, benefi_address, detail_payment) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/depositfiatconfirm`, {
            user_id: user_id, amount: amount, currency: currency, corres_bank: corres_bank, swift_code: swift_code, swift_rbcroyal: swift_rbcroyal
            , address_rbcroyal: address_rbcroyal, benefit_accountname: benefit_accountname, benefit_accountnumber: benefit_accountnumber, benefi_address: benefi_address, detail_payment: detail_payment
        }, header);
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}

export const VerifyInfo = (user_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/verifyInfo`, { user_id: user_id }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.VerifyInfo,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const GetOrder = () => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/getOrder`, {}, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.GetOrder,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const GetLimit = (token) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/getLimit`, { token: token }, header);
        console.log(res.data);
        dispatch({
            type: ActionTypes.GetLimit,
            payload: res.data
        })
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const CreatePayment = (user_id, order, token, amount) => async dispatch => {
    try {
        dispatch({
            type: ActionTypes.CreatePayment,
            payload: []
        })
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/createPayment`, { user_id: user_id, amount: amount, token: token, order: order }, header);
        console.log(res.data);
        dispatch({
            type: ActionTypes.CreatePayment,
            payload: res.data
        })
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const GetPaymentResult = (payment_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/getCryptoResult`, { payment_id: payment_id }, header);
        console.log(res.data);
        dispatch({
            type: ActionTypes.GetPaymentResult,
            payload: res.data
        })
        return res.data;
    } catch (err) {
        console.log(err);
    }
}
export const GetPaymentResultMail = (payment_id, amount, currency) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/getCryptoResultMail`, { payment_id: payment_id, amount: amount, currency: currency }, header);
        console.log(res.data);
        dispatch({
            type: ActionTypes.GetPaymentResultMail,
            payload: res.data
        })
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const ActivateState = (user_id, type, state) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        await axios.post(`${config.BACKEND_URL}wallet/activateState`, { user_id: user_id, type: type, state: state }, header);
    } catch (err) {
        console.log(err);
    }
}

export const ActivateTransferState = (state) => async dispatch => {
    try {
        dispatch({
            type: ActionTypes.ActivateTransferState,
            payload: state
        })
    } catch (err) {
        console.log(err);
    }
}

export const AmountTransfer = (amount, coin, fromAccount, toAccount, user_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/amountTransfer`, { amount: amount, coin: coin, fromAccount: fromAccount.toLowerCase(), toAccount: toAccount.toLowerCase(), user_id: user_id }, header);

    } catch (err) {
        console.log(err);
    }
}

export const ExchangeWalletInfo = (user_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/exchangeWallet`, { user_id: user_id }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.ExchangeWalletInfo,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}
export const ExchangeDepositCancelHistory = (id, payment_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/exchangeDepositHistory`, { payment_id: payment_id, id: id }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.ExchangeDepositHistory,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const ExchangeWalletState = (state) => async dispatch => {
    try {
        dispatch({
            type: ActionTypes.ExchangeWalletState,
            payload: state
        })
    } catch (err) {
        console.log(err);
    }
}

export const ExchangeWithdrawConfirm = (user_id, key) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/withdrawConfirm`, { user_id: user_id, key: key }, header);
    } catch (err) {
        console.log(err);
    }
}

export const ExchangeWithdrawConfirmEmail = (user_id, to_address, to_amount, coinValue) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/withdrawConfirmEmail`, { user_id: user_id, to_address: to_address, to_amount: to_amount, coinValue: coinValue }, header);
    } catch (err) {
        console.log(err);
    }
}

export const ExchangeConvert = (user_id, fromCoin, fromAmount, toCoin, toAmount, price) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/exchangeConvert`, { user_id: user_id, fromCoin: fromCoin, fromAmount: fromAmount, toCoin: toCoin, toAmount: toAmount, price: price }, header);
    } catch (err) {
        console.log(err);
    }
}

export const ExchangeWithdraw = (user_id, coin, amount, type, address) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/withdraw`, { user_id: user_id, coin: coin, amount: amount, type: type, address: address }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.ExchangeWithdraw,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const ExchangeFiatDeposit = (user_id, currency, amount) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/fiatdeposit`, { user_id: user_id, currency: currency, amount: amount }, header);
        // console.log(res.data);
        window.location.href = res.data;
    } catch (err) {
        console.log(err);
    }
}

export const ExchangeFiatDepositCheck = (key) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/fiatdepositcheck`, { key: key }, header);
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}

export const ExchangeDepositHistory = (user_id, method) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/exchangeDepositHistory`, { id: user_id, method: method }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.ExchangeDepositHistory,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const ExchangeWithdrawHistory = (user_id, coin) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        // console.log(coin)
        const res = await axios.post(`${config.BACKEND_URL}wallet/exchangeWithdrawHistory`, { user_id: user_id, coin: coin }, header);
        console.log(res.data);
        dispatch({
            type: ActionTypes.ExchangeWithdrawHistory,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const RemainAccount = (user_id, coin, amount) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/remainAccount`, { user_id: user_id, coin: coin, amount: amount }, header);
        console.log(user_id);
        console.log(coin);
        console.log(amount);
        console.log(res.data);
        dispatch({
            type: ActionTypes.ExchangeWithdraw,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const ExchangeWithdrawCancelHistory = (user_id, id, coin) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/exchangeWithdrawHistory`, { user_id: user_id, id: id, coin: coin }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.ExchangeWithdrawHistory,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

////////////////////////////// mine
export const FutureWalletInfo = (user_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/exchangeWallet`, { user_id: user_id }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.FutureWalletInfo,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}
export const FutureDepositCancelHistory = (id, payment_id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/exchangeDepositHistory`, { payment_id: payment_id, id: id }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.FutureDepositHistory,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const FutureWalletState = (state) => async dispatch => {
    try {
        dispatch({
            type: ActionTypes.FutureWalletState,
            payload: state
        })
    } catch (err) {
        console.log(err);
    }
}

export const FutureWithdrawConfirm = (user_id, key) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/withdrawConfirm`, { user_id: user_id, key: key }, header);
    } catch (err) {
        console.log(err);
    }
}

export const FutureWithdrawConfirmEmail = (user_id, to_address, to_amount, coinValue) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/withdrawConfirmEmail`, { user_id: user_id, to_address: to_address, to_amount: to_amount, coinValue: coinValue }, header);
    } catch (err) {
        console.log(err);
    }
}

export const FutureConvert = (user_id, fromCoin, fromAmount, toCoin, toAmount, price) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/futureConvert`, { user_id: user_id, fromCoin: fromCoin, fromAmount: fromAmount, toCoin: toCoin, toAmount: toAmount, price: price }, header);
    } catch (err) {
        console.log(err);
    }
}

export const FutureWithdraw = (user_id, coin, amount, type, address) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/withdraw`, { user_id: user_id, coin: coin, amount: amount, type: type, address: address }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.FutureWithdraw,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const FutureFiatDeposit = (user_id, currency, amount) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/fiatdeposit`, { user_id: user_id, currency: currency, amount: amount }, header);
        // console.log(res.data);
        window.location.href = res.data;
    } catch (err) {
        console.log(err);
    }
}

export const FutureFiatDepositCheck = (key) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/fiatdepositcheck`, { key: key }, header);
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}

export const FutureDepositHistory = (user_id, method) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/futureDepositHistory`, { id: user_id, method: method }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.FutureDepositHistory,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const FutureWithdrawHistory = (user_id, coin) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        // console.log(coin)
        const res = await axios.post(`${config.BACKEND_URL}wallet/futureWithdrawHistory`, { user_id: user_id, coin: coin }, header);
        console.log(res.data);
        dispatch({
            type: ActionTypes.FutureWithdrawHistory,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const FutureWithdrawCancelHistory = (user_id, id, coin) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer ` + getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}wallet/futureWithdrawHistory`, { user_id: user_id, id: id, coin: coin }, header);
        // console.log(res.data);
        dispatch({
            type: ActionTypes.FutureWithdrawHistory,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}