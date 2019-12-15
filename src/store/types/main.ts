import { AuthState } from './Authentication';

export interface RootReducer {
    authReducer: AuthState;
}
