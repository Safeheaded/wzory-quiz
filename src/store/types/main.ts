import { AuthState } from './Authentication';
import { EquationsState } from './Equations';

export interface RootReducer {
    authReducer: AuthState;
    eqReducer: EquationsState;
}
