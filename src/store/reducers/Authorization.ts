import { AuthState, AuthActionTypes } from '../types/Authorization';
import { LOG_IN, LOG_OUT } from '../constants/Authorization';

const initState = {isLoggedIn: false};

const AuthorizationReducer = (state: AuthState = initState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOG_OUT:
            return {
                token: undefined,
                isLoggedIn: false
            }
    }

    return state;
};
 
export default AuthorizationReducer;
