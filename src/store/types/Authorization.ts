import { LOG_IN, LOG_OUT } from '../constants/Authorization';

export interface AuthState {
    token?: string;
    isLoggedIn: boolean;
}

export interface LogInCredentials {
    email: string;
    password: string;
}

export interface LoginActionType {
    type: typeof LOG_IN;
    payload: LogInCredentials;
}

export interface LogoutActionType {
    type: typeof LOG_OUT;
}

export type AuthActionTypes = LoginActionType | LogoutActionType;
