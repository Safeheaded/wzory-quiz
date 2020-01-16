import { firebaseHandler } from '../../firebaseConfig';

import {
    AddTopic,
    ExtendedTopicWithId,
    ExtendedTopic,
    FetchTopics,
    UpdateTopic,
    DeleteTopic
} from '../types/Topics';

import { put, call, all, takeLatest, select } from 'redux-saga/effects';

import {
    fetchAllTopicsSuccess,
    fetchAllTopicsError,
    addTopicSuccess,
    addTopicError,
    fetchTopicsSuccess,
    fetchTopicsError,
    updateTopicError,
    updateTopicSuccess,
    deleteTopicSuccess,
    deleteTopicError,
    fetchTopicsDone
} from '../actions/Topics';
import {
    ADD_TOPIC,
    FETCH_ALL_TOPICS,
    FETCH_TOPICS,
    UPDATE_TOPIC,
    DELETE_TOPIC
} from '../constants/Topics';
import { firestore, functions } from 'firebase';
import { collectionToArray, getTopics } from './utils';

const rsf = firebaseHandler.getRSF();
function* addTopic(action: AddTopic) {
    try {
        const doc: firebase.firestore.DocumentReference = yield call(
            rsf.firestore.addDocument,
            `Topics`,
            action.payload
        );
        const snapshot: firebase.firestore.DocumentSnapshot = yield doc.get();
        const addedTopic: ExtendedTopicWithId = {
            id: snapshot.id,
            ...(snapshot.data() as ExtendedTopic)
        };
        yield put(addTopicSuccess(addedTopic));
    } catch (error) {
        yield put(addTopicError(error));
    }
}

function* fetchAllTopics() {
    try {
        const data: firebase.firestore.QuerySnapshot = yield call(
            rsf.firestore.getCollection,
            `Topics`
        );
        const topics: ExtendedTopicWithId[] = collectionToArray<
            ExtendedTopicWithId,
            ExtendedTopic
        >(data);
        yield put(fetchAllTopicsSuccess(topics));
    } catch (error) {
        yield put(fetchAllTopicsError(error));
    }
}

function* fetchTopics(action: FetchTopics) {
    const topics: ExtendedTopicWithId[] = yield select(getTopics);

    const wantedTopics = topics.filter(
        topic => topic.subjectRef === action.payload
    );

    if (wantedTopics.length !== 0) {
        yield put(fetchTopicsDone());
        return;
    }

    try {
        const collectionRef = yield firestore().collection('Topics');
        const snapshot: firestore.QuerySnapshot = yield call(
            rsf.firestore.getCollection,
            collectionRef.where('subjectRef', '==', action.payload)
        );
        const topics: ExtendedTopicWithId[] = collectionToArray<
            ExtendedTopicWithId,
            ExtendedTopic
        >(snapshot);
        yield put(fetchTopicsSuccess(topics));
    } catch (error) {
        yield put(fetchTopicsError(error));
    }
}

function* updateTopic(action: UpdateTopic) {
    const updatedTopic = { ...action.payload };
    delete updatedTopic.id;
    try {
        yield call(
            rsf.firestore.updateDocument,
            `Topics/${action.payload.id}`,
            updatedTopic
        );
        yield put(updateTopicSuccess(action.payload));
    } catch (error) {
        yield put(updateTopicError(error));
    }
}

function* deleteTopic(action: DeleteTopic) {
    try {
        const cf = functions();
        const fn = cf.httpsCallable('deleteTopic');
        const response = yield call(fn, {
            id: action.payload
        });
        yield put(deleteTopicSuccess(response.data.id));
    } catch (error) {
        yield put(deleteTopicError(error));
    }
}

export function* TopicsSaga() {
    yield all([
        takeLatest(ADD_TOPIC, addTopic),
        takeLatest(FETCH_ALL_TOPICS, fetchAllTopics),
        takeLatest(FETCH_TOPICS, fetchTopics),
        takeLatest(UPDATE_TOPIC, updateTopic),
        takeLatest(DELETE_TOPIC, deleteTopic)
    ]);
}
