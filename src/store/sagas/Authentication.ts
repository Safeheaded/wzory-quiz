import { call, put, takeLatest, all } from 'redux-saga/effects';
import { LoginActionType, LogoutActionType } from '../types/Authorization';
import { LOG_IN, LOG_OUT } from '../constants/Authentication';
import 'firebase/auth';
import { firebaseHandler } from '../../firebaseConfig';
import {
    loginSuccess,
    loginError,
    logoutSuccess,
    logoutError
} from '../actions/Authentication';
import { createBrowserHistory } from 'history';

const rsf = firebaseHandler.getRSF();

function* login(action: LoginActionType) {
    try {
        const user = yield call(
            rsf.auth.signInWithEmailAndPassword,
            action.payload.email,
            action.payload.password
        );
        yield createBrowserHistory().push('/login');
        yield put(loginSuccess(user.email));
    } catch (error) {
        yield put(loginError(error));
    }
}

function* logout(action: LogoutActionType) {
    try {
        yield call(rsf.auth.signOut);
        yield put(logoutSuccess());
    } catch (error) {
        yield put(logoutError(error));
    }
}

export function* AuthenticationSaga() {
    yield all([takeLatest(LOG_IN, login), takeLatest(LOG_OUT, logout)]);
}
