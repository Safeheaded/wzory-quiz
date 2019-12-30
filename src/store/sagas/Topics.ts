import { firebaseHandler } from '../../firebaseConfig';

import {
    AddTopic,
    Topic,
    FetchAllTopics,
    ExtendedTopicWithId
} from '../types/Topics';

import { put, call, all, takeLatest } from 'redux-saga/effects';

import { fetchAllTopicsSuccess, fetchAllTopicsError } from '../actions/Topics';
import { ADD_TOPIC, FETCH_ALL_TOPICS } from '../constants/Topics';

const rsf = firebaseHandler.getRSF();
function* addTopic(action: AddTopic) {
    const topic: Topic = { name: action.payload.name };
    const data: firebase.firestore.DocumentReference = yield call(
        rsf.firestore.addDocument,
        `Subjects/${action.payload.subjectRef}/Topics`,
        topic
    );
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
