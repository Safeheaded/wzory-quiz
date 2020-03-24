import { AuthState, AuthActionTypes } from '../types/Authentication';
import { LOG_OUT_SUCCESS, LOG_IN_SUCCESS } from '../constants/Authentication';
import isDev from '../../utils/general';

const initState = { isLoggedIn: isDev() };

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
