import { call, put, takeLatest, all, takeLeading } from 'redux-saga/effects';
import { firebaseHandler } from '../../firebaseConfig';
import {
    Equation,
    AddEquationActionType,
    EquationWithId,
    AddSubjectActionType,
    SubjectWithId
} from '../types/Equations';
import {
    addEquationSuccess,
    addEquationError,
    addSubjectSuccess,
    addSubjectError
} from '../actions/Equations';
import { ADD_EQUATION, ADD_SUBJECT } from '../constants/Equations';
import firebase from 'firebase/app';

const rsf = firebaseHandler.getRSF();

function* addEquation(action: AddEquationActionType) {
    try {
        const data: firebase.firestore.DocumentReference = yield call(
            rsf.firestore.addDocument,
            `Equations/`,
            action.payload
        );
        const addedEquation: EquationWithId = {
            equation: action.payload.equation,
            explanation: action.payload.explanation,
            id: data.id
        };
        yield put(addEquationSuccess(addedEquation));
    } catch (error) {
        yield put(addEquationError(error));
    }
}

function* addSubject(action: AddSubjectActionType) {
    try {
        const data: firebase.firestore.DocumentReference = yield call(
            rsf.firestore.addDocument,
            'Subjects',
            action.payload
        );
        const addedSubject: SubjectWithId = {
            name: action.payload.name,
            id: data.id
        };
        yield put(addSubjectSuccess(addedSubject));
    } catch (error) {
        yield put(addSubjectError(error));
    }
}

export function* EquationsSaga() {
    yield all([
        takeLatest(ADD_EQUATION, addEquation),
        takeLatest(ADD_SUBJECT, addSubject)
    ]);
}
