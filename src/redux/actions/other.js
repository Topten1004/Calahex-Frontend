import ActionTypes from './actionTypes';
import axios from 'axios';
import { getItem } from '../../utils/helper';
import * as config from '../../static/constants';

export const GetNews = () => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/news`, {}, header);
        dispatch({
            type: ActionTypes.GetNews,
            payload: res.data
        })
    } catch(err) {
        console.log(err);
    }
}

export const GetNotification = () => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+getItem('access_token') }
        };
        const res = await axios.post(`${config.BACKEND_URL}main/notification`, {}, header);
        dispatch({
            type: ActionTypes.GetNotification,
            payload: res.data
        })
    } catch(err) {
        console.log(err);
    }
}
