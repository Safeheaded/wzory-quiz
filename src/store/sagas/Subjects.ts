import { firebaseHandler } from '../../firebaseConfig';
import { AddSubject, SubjectWithId, UpdateSubject } from '../types/Subjects';
import { put, call, all, takeLatest } from 'redux-saga/effects';
import {
    addSubjectSuccess,
    addSubjectError,
    fetchAllSubjectsSuccess,
    fetchAllSubjectsError,
    updateSubjectSuccess,
    updateSubjectError
} from '../actions/Subjects';
import {
    ADD_SUBJECT,
    FETCH_ALL_SUBJECTS,
    UPDATE_SUBJECT
} from '../constants/Subjects';

const rsf = firebaseHandler.getRSF();
function* addSubject(action: AddSubject) {
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

function* updateSubject(action: UpdateSubject) {
    try {
        yield call(
            rsf.firestore.updateDocument,
            `Subjects/${action.payload.id}`,
            { name: action.payload.name }
        );
        yield put(updateSubjectSuccess(action.payload));
    } catch (error) {
        yield put(updateSubjectError(action.payload));
    }
}

export function* SubjectsSaga() {
    yield all([
        takeLatest(ADD_SUBJECT, addSubject),
        takeLatest(FETCH_ALL_SUBJECTS, fetchAllSubjects),
        takeLatest(UPDATE_SUBJECT, updateSubject)
    ]);
}
