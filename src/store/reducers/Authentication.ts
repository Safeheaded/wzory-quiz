import { AuthState, AuthActionTypes } from '../types/Authorization';
import {
    LOG_IN,
    LOG_OUT,
    LOG_OUT_SUCCESS,
    LOG_IN_SUCCESS
} from '../constants/Authentication';

const initState = { isLoggedIn: false };

const AuthorizationReducer = (
    state: AuthState = initState,
    action: AuthActionTypes
): AuthState => {
    switch (action.type) {
        case LOG_OUT_SUCCESS:
            return { ...state, isLoggedIn: false };
        case LOG_IN_SUCCESS:
            return { ...state, isLoggedIn: true };
    }

    return state;
};

export default AuthorizationReducer;
