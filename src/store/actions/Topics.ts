import {
    ExtendedTopic,
    AddTopicActionType,
    TopicWithId,
    AddTopicSuccessActionType,
    AddTopicErrorActionType,
    FetchAllTopicsActionType,
    ExtendedTopicWithId,
    FetchAllTopicsSuccessActionType,
    FetchAllTopicsErrorActionType
} from '../types/Topics';

import {
    ADD_TOPIC,
    ADD_TOPIC_SUCCESS,
    ADD_TOPIC_ERROR,
    FETCH_ALL_TOPICS,
    FETCH_ALL_TOPICS_SUCCESS,
    FETCH_ALL_TOPICS_ERROR
} from '../constants/Topics';

export function addTopic(topic: ExtendedTopic): AddTopicActionType {
    return {
        type: ADD_TOPIC,
        payload: topic
    };
}

export function addTopicSuccess(topic: TopicWithId): AddTopicSuccessActionType {
    return {
        type: ADD_TOPIC_SUCCESS,
        payload: topic
    };
}

export function addTopicError(error: object): AddTopicErrorActionType {
    return { type: ADD_TOPIC_ERROR, payload: error };
}

export function fetchAllTopics(subjectRef: string): FetchAllTopicsActionType {
    return { type: FETCH_ALL_TOPICS, payload: subjectRef };
}

export function fetchAllTopicsSuccess(
    topics: ExtendedTopicWithId[]
): FetchAllTopicsSuccessActionType {
    return { type: FETCH_ALL_TOPICS_SUCCESS, payload: topics };
}

export function FetchAllTopicsError(
    error: object
): FetchAllTopicsErrorActionType {
    return {
        type: FETCH_ALL_TOPICS_ERROR,
        payload: error
    };
}
