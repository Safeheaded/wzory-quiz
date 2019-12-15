import { all, takeLatest } from 'redux-saga/effects';
import { AuthenticationSaga } from './Authentication';
import { EquationsSaga } from './Equations';

export function* rootSaga() {
    yield all([AuthenticationSaga(), EquationsSaga()]);
}
