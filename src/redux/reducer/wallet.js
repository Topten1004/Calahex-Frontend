import { array } from 'prop-types';
import ActionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    accountInfo: [],
    orderId: 0,
    paymentInfo: [],
    paymentResult: "",
    activateState: [],
    activateTransferState:"Exchange",
    exchangeWalletInfo:[],
    exchangeWalletState:"BTC",
    exchangeDepositHistory:[],
    exchangeAvailable:0,
    exchangeWithdrawHistory:[],
    ///mine
    futureWalletInfo:[],
    futureWalletState:"BTC",
    futureDepositHistory:[],
    futureAvailable:0,
    futureWithdrawHistory:[],
    verifyInfo: [],
    limit: 0,
    balance: {
        total: 0,
        available: 0,
        order: 0
    },
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.AccountInfo:
            return ({
                ...state,
                accountInfo: action.payload,
            })
        case ActionTypes.VerifyInfo:
            return ({
                ...state,
                verifyInfo: action.payload,
            })
        case ActionTypes.GetOrder:
            return ({
                ...state,
                orderId: action.payload,
            })
        case ActionTypes.GetLimit:
            return ({
                ...state,
                limit: action.payload,
            })
        case ActionTypes.CreatePayment:
            return ({
                ...state,
                paymentInfo: action.payload,
            })
        case ActionTypes.GetPaymentResult:
            return ({
                ...state,
                paymentResult: action.payload,
            })
        case ActionTypes.ActivateState:
            return ({
                ...state,
                activateState: action.payload,
            })
        case ActionTypes.ActivateTransferState:
            return ({
                ...state,
                activateTransferState:action.payload,
            })
        case ActionTypes.ExchangeWithdraw:
            return ({
                ...state,
                exchangeAvailable:action.payload  
            })
        case ActionTypes.ExchangeWalletState:
            return ({
                ...state,
                exchangeWalletState:action.payload  
            })
        case ActionTypes.ExchangeWalletInfo:
            return ({
                ...state,
                exchangeWalletInfo:action.payload.exchangeInfo,
                exchangeWalletAmount:action.payload.amount,
                exchangeWalletAmountBTC:action.payload.amount_BTC,
                pairInfo:action.payload.pairInfo,
            })
        case ActionTypes.ExchangeDepositHistory: 
            return ({
                ...state,
                exchangeDepositHistory:action.payload
            })
        case ActionTypes.ExchangeWithdrawHistory: 
            return ({
                ...state,
                exchangeWithdrawHistory:action.payload.history,
                balance: action.payload.balance,
            })
        ///////mine
        case ActionTypes.FutureWithdraw:
            return ({
                ...state,
                futureAvailable:action.payload  
            })
        case ActionTypes.FutureWalletState:
            return ({
                ...state,
                futureWalletState:action.payload  
            })
        case ActionTypes.FutureWalletInfo:
            return ({
                ...state,
                futureWalletInfo:action.payload.exchangeInfo,
                futureWalletAmount:action.payload.amount,
                futureWalletAmountBTC:action.payload.amount_BTC,
                pairInfo:action.payload.pairInfo,
            })
        case ActionTypes.FutureDepositHistory: 
            return ({
                ...state,
                futureDepositHistory:action.payload
            })
        case ActionTypes.FutureWithdrawHistory: 
            return ({
                ...state,
                futureWithdrawHistory:action.payload.history,
                balance: action.payload.balance,
            })
        default:
            return state;
    }

}


