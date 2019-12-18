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
    addSubjectError,
    fetchAllSubjectsSuccess,
    fetchAllSubjectsError
} from '../actions/Equations';
import {
    ADD_EQUATION,
    ADD_SUBJECT,
    FETCH_ALL_SUBJECTS
} from '../constants/Equations';
import firebase, { database } from 'firebase/app';

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

function* fetchAllSubjects() {
    try {
        const data: firebase.firestore.QuerySnapshot = yield call(
            rsf.firestore.getCollection,
            'Subjects'
        );
        const subjects: Array<SubjectWithId> = [];
        data.forEach(subject => {
            const newSubject: SubjectWithId = {
                id: subject.id,
                name: subject.get('name')
            };
            subjects.push(newSubject);
        });
        yield put(fetchAllSubjectsSuccess(subjects));
    } catch (error) {
        yield put(fetchAllSubjectsError(error));
    }
}

export function* EquationsSaga() {
    yield all([
        takeLatest(ADD_EQUATION, addEquation),
        takeLatest(ADD_SUBJECT, addSubject),
        takeLatest(FETCH_ALL_SUBJECTS, fetchAllSubjects)
    ]);
}
