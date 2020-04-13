import { call, put, takeLatest, all } from 'redux-saga/effects';
import { LoginActionType, LogoutActionType } from '../types/Authentication';
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
import isDev from '../../utils/general';

const rsf = firebaseHandler.getRSF();

function* login(action: LoginActionType) {
    if (isDev()) {
        yield* loginSuccessfull('test@test.com');
        return;
    }
    try {
        const user = yield call(
            rsf.auth.signInWithEmailAndPassword,
            action.payload.email,
            action.payload.password
        );
        yield* loginSuccessfull(user);
    } catch (error) {
        yield put(loginError(error));
    }
}

function* loginSuccessfull(user: any) {
    yield createBrowserHistory().push('/login');
    yield put(loginSuccess(user.email));
}

function* logout(action: LogoutActionType) {
    if (isDev()) {
        yield put(logoutSuccess());
        return;
    }
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
