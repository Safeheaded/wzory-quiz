import { LoginActionType, LogoutActionType } from '../types/Authorization';
import { LOG_IN, LOG_OUT } from '../constants/Authorization';

export function login(email: string, password: string): LoginActionType {
    return { type: LOG_IN, payload: { email, password } };
}

export function logout(): LogoutActionType {
    return {
        type: LOG_OUT
    };
}
