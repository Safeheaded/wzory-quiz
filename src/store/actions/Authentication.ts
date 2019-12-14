import {
    LoginActionType,
    LogoutActionType,
    LoginSuccessActionType,
    LoginErrorActionType,
    LogoutSuccessActionType,
    LogoutErrorActionType
} from '../types/Authorization';
import {
    LOG_IN,
    LOG_OUT,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_OUT_SUCCESS,
    LOG_OUT_ERROR
} from '../constants/Authentication';

export function login(email: string, password: string): LoginActionType {
    return { type: LOG_IN, payload: { email, password } };
}

export function logout(): LogoutActionType {
    return {
        type: LOG_OUT
    };
}

export function logoutSuccess(): LogoutSuccessActionType {
    return {
        type: LOG_OUT_SUCCESS
    };
}

export function logoutError(error: object): LogoutErrorActionType {
    return {
        type: LOG_OUT_ERROR,
        payload: error
    };
}

export function loginSuccess(email: string): LoginSuccessActionType {
    return {
        type: LOG_IN_SUCCESS,
        payload: {
            email
        }
    };
}

export function loginError(error: object): LoginErrorActionType {
    return {
        type: LOG_IN_ERROR,
        payload: error
    };
}
