import { AuthState } from './Authorization';

export interface RootReducer {
    authReducer: AuthState;
}
