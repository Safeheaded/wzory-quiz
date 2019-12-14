import {
    LOG_IN,
    LOG_OUT,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_OUT_SUCCESS,
    LOG_OUT_ERROR
} from '../constants/Authorization';

export interface AuthState {
    isLoggedIn: boolean;
}

export interface LogInCredentials {
    email: string;
    password: string;
}

export interface User {
    email: string;
}

export interface LoginActionType {
    type: typeof LOG_IN;
    payload: LogInCredentials;
}

export interface LogoutActionType {
    type: typeof LOG_OUT;
}

export interface LoginSuccessActionType {
    type: typeof LOG_IN_SUCCESS;
    payload: User;
}

export interface LoginErrorActionType {
    type: typeof LOG_IN_ERROR;
    payload: object;
}

export interface LogoutSuccessActionType {
    type: typeof LOG_OUT_SUCCESS;
}

export interface LogoutErrorActionType {
    type: typeof LOG_OUT_ERROR;
    payload: object;
}

export type AuthActionTypes =
    | LoginActionType
    | LogoutActionType
    | LoginSuccessActionType
    | LoginErrorActionType
    | LogoutSuccessActionType
    | LogoutErrorActionType;
