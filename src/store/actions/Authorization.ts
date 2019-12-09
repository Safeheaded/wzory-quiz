import { AuthActionTypes, LogInCredentials } from '../types/Authorization';
import { LOG_IN, LOG_OUT } from '../constants/Authorization';

export function logout(): AuthActionTypes{
    return {
        type: LOG_OUT
    };
}
