import {
    ExtendedTopic,
    AddTopic,
    TopicWithId,
    AddTopicSuccess,
    AddTopicError,
    FetchAllTopics,
    ExtendedTopicWithId,
    FetchAllTopicsSuccess,
    FetchAllTopicsError
} from '../types/Topics';

import {
    ADD_TOPIC,
    ADD_TOPIC_SUCCESS,
    ADD_TOPIC_ERROR,
    FETCH_ALL_TOPICS,
    FETCH_ALL_TOPICS_SUCCESS,
    FETCH_ALL_TOPICS_ERROR
} from '../constants/Topics';

export function addTopic(topic: ExtendedTopic): AddTopic {
    return {
        type: ADD_TOPIC,
        payload: topic
    };
}

export function addTopicSuccess(topic: TopicWithId): AddTopicSuccess {
    return {
        type: ADD_TOPIC_SUCCESS,
        payload: topic
    };
}

export function addTopicError(error: object): AddTopicError {
    return { type: ADD_TOPIC_ERROR, payload: error };
}

export function fetchAllTopics(subjectRef: string): FetchAllTopics {
    return { type: FETCH_ALL_TOPICS, payload: subjectRef };
}

export function fetchAllTopicsSuccess(
    topics: ExtendedTopicWithId[]
): FetchAllTopicsSuccess {
    return { type: FETCH_ALL_TOPICS_SUCCESS, payload: topics };
}

export function fetchAllTopicsError(error: object): FetchAllTopicsError {
    return {
        type: FETCH_ALL_TOPICS_ERROR,
        payload: error
    };
}
