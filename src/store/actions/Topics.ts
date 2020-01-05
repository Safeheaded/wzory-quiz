import {
    ExtendedTopic,
    AddTopic,
    TopicWithId,
    AddTopicSuccess,
    AddTopicError,
    FetchAllTopics,
    ExtendedTopicWithId,
    FetchAllTopicsSuccess,
    FetchAllTopicsError,
    FetchTopics,
    FetchTopicsSuccess,
    FetchTopicsError
} from '../types/Topics';

import {
    ADD_TOPIC,
    ADD_TOPIC_SUCCESS,
    ADD_TOPIC_ERROR,
    FETCH_ALL_TOPICS,
    FETCH_ALL_TOPICS_SUCCESS,
    FETCH_ALL_TOPICS_ERROR,
    FETCH_TOPICS,
    FETCH_TOPICS_SUCCESS,
    FETCH_TOPICS_ERROR
} from '../constants/Topics';

export function addTopic(topic: ExtendedTopic): AddTopic {
    return {
        type: ADD_TOPIC,
        payload: topic
    };
}

export function addTopicSuccess(topic: ExtendedTopicWithId): AddTopicSuccess {
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

export function fetchTopics(subjectRef: string): FetchTopics {
    return { type: FETCH_TOPICS, payload: subjectRef };
}

export function fetchTopicsSuccess(
    topics: ExtendedTopicWithId[]
): FetchTopicsSuccess {
    return { type: FETCH_TOPICS_SUCCESS, payload: topics };
}

export function fetchTopicsError(error: object): FetchTopicsError {
    return { type: FETCH_TOPICS_ERROR, payload: error };
}
