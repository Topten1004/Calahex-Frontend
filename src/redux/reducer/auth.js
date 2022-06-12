import ActionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    isAuthenticated: false,
    email: "",
    userName: "",
    user_id: "",
    access_token: "",
    error: {},
    check2FaEnable: {},
    check2FaAnswer: {},
    checka2FaCount: 0,
    user_profile: {},
    is_profile: false,
    is_apienable: null,
    userdata: {},
    api_enabled: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SignupUser:
            return ({
                ...state
            });
        case ActionTypes.SigninUser:
            return ({
                ...state,
                access_token: action.payload.access_token,
                isAuthenticated: true,
                user_id: action.payload.user_id,
                userName: action.payload.user_name,
                api_enabled: action.payload.api_enabled,
            });
        case ActionTypes.SigninProfile:
            return ({
                ...state,
                is_profile: action.payload.profile
            });
        case ActionTypes.SigninApiEnable:
            return ({
                ...state,
                is_apienable: action.payload.api_enabled,
                userdata: action.payload
            });
        case ActionTypes.SetApiEnable:
            return ({
                ...state,
                is_apienable: false,
            });
        case ActionTypes.SendUser:
            return ({
                ...state,
            });
        case ActionTypes.ChangePassword:
            return ({
                ...state,
            });
        case ActionTypes.ConfirmUser:
            return ({
                ...state,
            });
        case ActionTypes.UserProfile:
            return ({
                ...state
            });
        case ActionTypes.UserProfile1:
            return ({
                ...state,
                api_enabled: action.payload.api_enabled,
            });
        case ActionTypes.Disable2Fa:
            return ({
                ...state,
                api_enabled: action.payload.api_enabled,
            });
        case ActionTypes.UserPhone:
            return ({
                ...state
            });
        case ActionTypes.Check2FAEnable:
            return ({
                ...state,
                check2FaEnable: action.payload
            });
        case ActionTypes.GetUserProfile:
            return ({
                ...state,
                user_profile: action.payload
            });
        case ActionTypes.Check2FAAnswer:
            return ({
                ...state,
                check2FaAnswer: action.payload
            });
        case ActionTypes.Check2FACountPlus:
            return ({
                ...state,
                checka2FaCount: action.payload
            });
        case ActionTypes.UserTwo:
            return ({
                ...state
            });
        case ActionTypes.ReSend:
            return ({
                ...state,
            });
        case ActionTypes.ReConfirmUser:
            return ({
                ...state,
            });
        case ActionTypes.SignOut:
            return ({
                ...state,
                isAuthenticated: false,
                user_id: "",
                userName: "",
                password: "",
                access_token: "",
            });
        case ActionTypes.SetCurrentUser:
            return ({
                ...state,
                isAuthenticated: true,
                access_token: action.payload.access_token,
                user_id: action.payload.user_id
            });
        case ActionTypes.SigninUserError:
        case ActionTypes.SendUserError:
        case ActionTypes.ChangePasswordError:
        case ActionTypes.ConfirmUserError:
        case ActionTypes.ReSendError:
        case ActionTypes.UserProfileError:
            return ({
                ...state,
                error: action.payload
            })
        case ActionTypes.UserTwoError:
            return ({
                ...state,
                error: action.payload
            })
        case ActionTypes.ReConfirmUserError:
        case ActionTypes.SignupUserError:
            return ({
                ...state,
                error: action.payload
            });
        default:
            return state;
    }

}