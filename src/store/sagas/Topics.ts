import { firebaseHandler } from '../../firebaseConfig';

import {
    AddTopic,
    FetchAllTopics,
    ExtendedTopicWithId,
    ExtendedTopic,
    FetchTopics
} from '../types/Topics';

import { put, call, all, takeLatest } from 'redux-saga/effects';

import {
    fetchAllTopicsSuccess,
    fetchAllTopicsError,
    addTopicSuccess,
    addTopicError,
    fetchTopicsSuccess,
    fetchTopicsError
} from '../actions/Topics';
import { ADD_TOPIC, FETCH_ALL_TOPICS } from '../constants/Topics';
import { firestore } from 'firebase';

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

function* fetchAllTopics(action: FetchAllTopics) {
    try {
        const data: firebase.firestore.QuerySnapshot = yield call(
            rsf.firestore.getCollection,
            `Topics`
        );
        const topics: ExtendedTopicWithId[] = [];
        data.forEach(topic => {
            const newTopic: ExtendedTopicWithId = {
                id: topic.id,
                ...(topic.data() as ExtendedTopic)
            };
            topics.push(newTopic);
        });
        yield put(fetchAllTopicsSuccess(topics));
    } catch (error) {
        yield put(fetchAllTopicsError(error));
    }
}

function* fetchTopics(action: FetchTopics) {
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

export function* TopicsSaga() {
    yield all([
        takeLatest(ADD_TOPIC, addTopic),
        takeLatest(FETCH_ALL_TOPICS, fetchAllTopics)
    ]);
}

function collectionToArray<T extends K & { id: string }, K>(
    snapshot: firestore.QuerySnapshot
): T[] {
    const items: T[] = [];
    snapshot.forEach(item => {
        const newItem = { id: item.id, ...(item.data() as K) } as T;
        items.push(newItem);
    });
    return items;
}
