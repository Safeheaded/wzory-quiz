import { all } from 'redux-saga/effects';
import { AuthenticationSaga } from './Authentication';
import { EquationsSaga } from './Equations';
import { SubjectsSaga } from './Subjects';
import { TopicsSaga } from './Topics';

export function* rootSaga() {
    yield all([
        AuthenticationSaga(),
        EquationsSaga(),
        SubjectsSaga(),
        TopicsSaga()
    ]);
}
