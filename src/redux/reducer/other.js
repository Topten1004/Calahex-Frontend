import ActionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    news: {},
    notification: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.GetNews:
            return ({
                ...state,
                news: action.payload,
            });
        case ActionTypes.GetNotification:
            return ({
                ...state,
                notification: action.payload
            });
        default:
            return state;
    }

}
