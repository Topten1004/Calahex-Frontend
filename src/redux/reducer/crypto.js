import ActionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    cryptoLists: [],
    isLoading: false,
    cryptoOrderLists: {
        bids: [],
        asks: []
    },
    cryptoExchange30Volume: 0,
    cryptoExchangeFee: 0,
    cryptoTradLists: [],
    cryptoExchangeInfo: [],
    cryptoExchangeLimitAmount: [],
    cryptoExchangeFeeAmount:0,
    cryptoExchangeUserOrderList:[],
    cryptoExchangeUserTradeList:[],
    cryptoExchangeResult: "",
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.LODING:
            return({
                ...state,
                isLoading: true
            })
        case ActionTypes.CryptoExchangePairList:
            return ({
                ...state,
                cryptoLists: action.payload,
                isLoading: false
            });
        case ActionTypes.CryptoExchange30Volume:
            return ({
                ...state,
                cryptoExchange30Volume: action.payload.volume,
                cryptoExchangeFee: action.payload.fee
            });            
        case ActionTypes.CryptoExchangeResult:
            return ({
                ...state,
                cryptoExchangeResult: action.payload
            });            
        case ActionTypes.CryptoExchangeOrderList:
            return ({
                ...state,
                cryptoOrderLists: action.payload
            });
        case ActionTypes.CryptoExchangeTradList:
            return ({
                ...state,
                cryptoTradLists: action.payload
            });
        case ActionTypes.CryptoExchangePairInfo:
            return ({
                ...state,
                cryptoExchangePairInfo: action.payload
            });
        case ActionTypes.CryptoExchangeLimitAmount:
            return ({
                ...state,
                cryptoExchangeLimitAmount: action.payload
            });
        case ActionTypes.CryptoExchangeFeeAmount:
            return ({
                ...state,
                cryptoExchangeFeeAmount: action.payload
            });
        case ActionTypes.CryptoExchangeUserOrderList:
            return ({
                ...state,
                cryptoExchangeUserOrderList: action.payload
            })
        case ActionTypes.CryptoExchangeOrderCancel:
            return ({
                ...state,
                cryptoExchangeUserOrderList: action.payload
            })            
        case ActionTypes.CryptoExchangeUserTradeList:
            return ({
                ...state,
                cryptoExchangeUserTradeList: action.payload
            })
        default:
            return state;
    }

}
