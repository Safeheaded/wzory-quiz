import { firebaseHandler } from '../../firebaseConfig';
import {
    AddSubject,
    SubjectWithId,
    UpdateSubject,
    Subject,
    DeleteSubject
} from '../types/Subjects';
import { put, call, all, takeLatest, select } from 'redux-saga/effects';
import {
    addSubjectSuccess,
    addSubjectError,
    fetchAllSubjectsSuccess,
    fetchAllSubjectsError,
    updateSubjectSuccess,
    updateSubjectError,
    deleteSubjectSuccess,
    deleteSubjectError,
    fetchAllSubjectsDone
} from '../actions/Subjects';
import {
    ADD_SUBJECT,
    FETCH_ALL_SUBJECTS,
    UPDATE_SUBJECT,
    DELETE_SUBJECT
} from '../constants/Subjects';
import { collectionToArray, getSubjects } from './utils';
import { functions } from 'firebase';

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
    const subjects: SubjectWithId[] = yield select(getSubjects);

    if (subjects.length !== 0) {
        yield put(fetchAllSubjectsDone());
        return;
    }

    try {
        const data: firebase.firestore.QuerySnapshot = yield call(
            rsf.firestore.getCollection,
            'Subjects'
        );
        const subjects: Array<SubjectWithId> = collectionToArray<
            SubjectWithId,
            Subject
        >(data);
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

function* deleteSubject(action: DeleteSubject) {
    const cf = functions();
    const fn = cf.httpsCallable('deleteSubject');
    try {
        const response = yield call(fn, { id: action.payload });
        yield put(deleteSubjectSuccess(response.data.id));
    } catch (error) {
        yield put(deleteSubjectError(error));
    }
}

export function* SubjectsSaga() {
    yield all([
        takeLatest(ADD_SUBJECT, addSubject),
        takeLatest(FETCH_ALL_SUBJECTS, fetchAllSubjects),
        takeLatest(UPDATE_SUBJECT, updateSubject),
        takeLatest(DELETE_SUBJECT, deleteSubject)
    ]);
}
