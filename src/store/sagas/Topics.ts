import { firebaseHandler } from '../../firebaseConfig';

import {
    AddTopic,
    Topic,
    FetchAllTopics,
    ExtendedTopicWithId,
    TopicWithId
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
        const topic: Topic = { name: action.payload.name };
        const snapshot: firebase.firestore.DocumentSnapshot = yield call(
            rsf.firestore.addDocument,
            `Subjects/${action.payload.subjectRef}/Topics`,
            topic
        );
        const addedTopic: TopicWithId = {
            id: snapshot.id,
            ...(snapshot.data() as Topic)
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
        yield put(fetchAllTopicsError(error));
    }
}

export function* TopicsSaga() {
    yield all([
        takeLatest(ADD_TOPIC, addTopic),
        takeLatest(FETCH_ALL_TOPICS, fetchAllTopics)
    ]);
}
