import { call, put, takeLatest } from 'redux-saga/effects';
import { LoginActionType } from '../types/Authorization';
import { LOG_IN } from '../constants/Authorization';
import firebase from 'firebase';
import 'firebase/auth';
import { firebaseHandler } from '../../firebaseConfig';

const rsf = firebaseHandler.getRSF();

function* login(action: LoginActionType) {
    try {
        yield call(
            rsf.auth.signInWithEmailAndPassword,
            action.payload.email,
            action.payload.password
        );
    } catch (error) {
        console.log(`Logging in error: ${error}`);
    }
}

export function* AuthenticationSaga() {
    yield takeLatest(LOG_IN, login);
}
