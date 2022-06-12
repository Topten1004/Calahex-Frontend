import {combineReducers} from 'redux';

import authReducer from './auth';
import tokenReducer from './token';
import cryptoReducer from "./crypto";
import otherReducer from "./other";
import walletReducer from './wallet';

export default combineReducers({
    auth: authReducer,
    token: tokenReducer,
    crypto: cryptoReducer,
    other: otherReducer,
    wallet: walletReducer
});

