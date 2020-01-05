import { firebaseHandler } from '../../firebaseConfig';

import {
    AddTopic,
    FetchAllTopics,
    ExtendedTopicWithId,
    ExtendedTopic
} from '../types/Topics';

import { put, call, all, takeLatest } from 'redux-saga/effects';

import {
    fetchAllTopicsSuccess,
    fetchAllTopicsError,
    addTopicSuccess,
    addTopicError
} from '../actions/Topics';
import { ADD_TOPIC, FETCH_ALL_TOPICS } from '../constants/Topics';

const rsf = firebaseHandler.getRSF();
function* addTopic(action: AddTopic) {
    try {
        const snapshot: firebase.firestore.DocumentSnapshot = yield call(
            rsf.firestore.addDocument,
            `Topics`,
            action.payload
        );
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
                name: topic.get('name'),
                subjectRef: topic.get('subjectRef')
            };
            topics.push(newTopic);
        });
        yield put(fetchAllTopicsSuccess(topics));
    } catch (error) {
        yield put(fetchAllTopicsError(error));
    }
}

export function* TopicsSaga() {
    yield all([
        takeLatest(ADD_TOPIC, addTopic),
        takeLatest(FETCH_ALL_TOPICS, fetchAllTopics)
    ]);
}
