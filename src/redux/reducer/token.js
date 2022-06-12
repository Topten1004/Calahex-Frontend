import ActionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    tokenList: [],
    tokenOrderLists: {
        asks: [],
        bids: []
    },
    tokenTradLists: [],
    tokenExchangeLists: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case ActionTypes.GetTokenInfoBase:
        //     return ({
        //         ...state,
        //         tokenList: action.payload,
        //     })
        case ActionTypes.TokenList:
            return ({
                ...state,
                tokenList: action.payload,
            })
        case ActionTypes.TokenExchangePairList:
            return ({
                ...state,
                tokenExchangeLists: action.payload,
            })
        case ActionTypes.TokenExchangeTradList:
            return ({
                ...state,
                tokenTradLists: action.payload,
            })
        case ActionTypes.TokenExchangeOrderList:
            return ({
                ...state,
                tokenOrderLists: action.payload,
            })
        default:
            return state;
    }

}
