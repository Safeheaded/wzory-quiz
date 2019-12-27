import { call, put, takeLatest, all, takeLeading } from 'redux-saga/effects';
import { firebaseHandler } from '../../firebaseConfig';
import {
    Equation,
    AddEquationActionType,
    EquationWithId,
    AddSubjectActionType,
    SubjectWithId,
    AddTopicActionType,
    Topic,
    FetchAllTopicsActionType,
    ExtendedTopicWithId
} from '../types/Equations';
import {
    addEquationSuccess,
    addEquationError,
    addSubjectSuccess,
    addSubjectError,
    fetchAllSubjectsSuccess,
    fetchAllSubjectsError,
    fetchAllTopicsSuccess,
    FetchAllTopicsError,
    fetchAllEquationsSuccess,
    fetchAllEquationsError
} from '../actions/Equations';
import {
    ADD_EQUATION,
    ADD_SUBJECT,
    FETCH_ALL_SUBJECTS,
    ADD_TOPIC,
    FETCH_ALL_TOPICS,
    FETCH_ALL_EQUATIONS
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

function* addTopic(action: AddTopicActionType) {
    const topic: Topic = { name: action.payload.name };
    const data: firebase.firestore.DocumentReference = yield call(
        rsf.firestore.addDocument,
        `Subjects/${action.payload.subjectRef}/Topics`,
        topic
    );
}

function* fetchAllTopics(action: FetchAllTopicsActionType) {
    try {
        const data: firebase.firestore.QuerySnapshot = yield call(
            rsf.firestore.getCollection,
            `Subjects/${action.payload}/Topics`
        );
        const topics: ExtendedTopicWithId[] = [];
        data.forEach(topic => {
            const newTopic: ExtendedTopicWithId = {
                id: topic.id,
                name: topic.get('name'),
                subjectRef: topic.get('subjectRef')
            };
            topics.push(newTopic);
        });
        yield put(fetchAllTopicsSuccess(topics));
    } catch (error) {
        yield put(FetchAllTopicsError(error));
    }
}

function* fetchAllEquations() {
    try {
        const data: firebase.firestore.QuerySnapshot = yield call(
            rsf.firestore.getCollection,
            'Equations'
        );
        const equations: EquationWithId[] = [];
        data.forEach(equation => {
            const newEquation: EquationWithId = {
                id: equation.id,
                explanation: equation.get('explanation'),
                equation: equation.get('equation')
            };
            equations.push(newEquation);
        });
        yield put(fetchAllEquationsSuccess(equations));
    } catch (error) {
        yield put(fetchAllEquationsError(error));
    }
}

export function* EquationsSaga() {
    yield all([
        takeLatest(ADD_EQUATION, addEquation),
        takeLatest(ADD_SUBJECT, addSubject),
        takeLatest(FETCH_ALL_SUBJECTS, fetchAllSubjects),
        takeLatest(ADD_TOPIC, addTopic),
        takeLatest(FETCH_ALL_TOPICS, fetchAllTopics),
        takeLatest(FETCH_ALL_EQUATIONS, fetchAllEquations)
    ]);
}
