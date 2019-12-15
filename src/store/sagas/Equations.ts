import { call, put, takeLatest, all, takeLeading } from 'redux-saga/effects';
import { firebaseHandler } from '../../firebaseConfig';
import {
    Equation,
    AddEquationActionType,
    EquationWithId
} from '../types/Equations';
import { addEquationSuccess, addEquationError } from '../actions/Equations';
import { ADD_EQUATION } from '../constants/Equations';
import firebase from 'firebase/app';

const rsf = firebaseHandler.getRSF();

function* addEquation(action: AddEquationActionType) {
    try {
        const data: firebase.firestore.DocumentReference = yield call(
            rsf.firestore.addDocument,
            `Equations/`,
            action.payload
        );
        const newEquation: EquationWithId = {
            equation: action.payload.equation,
            explanation: action.payload.explanation,
            id: data.id
        };
        yield put(addEquationSuccess(newEquation));
    } catch (error) {
        yield put(addEquationError(error));
    }
}

export function* EquationsSaga() {
    yield takeLatest(ADD_EQUATION, addEquation);
}
