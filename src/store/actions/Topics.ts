import {
    ExtendedTopic,
    AddTopic,
    AddTopicSuccess,
    AddTopicError,
    FetchAllTopics,
    ExtendedTopicWithId,
    FetchAllTopicsSuccess,
    FetchAllTopicsError,
    FetchTopics,
    FetchTopicsSuccess,
    FetchTopicsError,
    UpdateTopic,
    UpdateTopicSuccess,
    UpdateTopicError,
    DeleteTopic,
    DeleteTopicSuccess,
    DeleteTopicError,
    FetchTopicsDone,
    FetchAllTopicsDone
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
    FETCH_TOPICS_ERROR,
    UPDATE_TOPIC,
    UPDATE_TOPIC_SUCCESS,
    UPDATE_TOPIC_ERROR,
    DELETE_TOPIC,
    DELETE_TOPIC_SUCCESS,
    DELETE_TOPIC_ERROR,
    FETCH_TOPICS_DONE,
    FETCH_ALL_TOPICS_DONE
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

export function fetchAllTopics(): FetchAllTopics {
    return { type: FETCH_ALL_TOPICS };
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

export function fetchAllTopicsDone(): FetchAllTopicsDone {
    return { type: FETCH_ALL_TOPICS_DONE };
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

export function fetchTopicsDone(): FetchTopicsDone {
    return { type: FETCH_TOPICS_DONE };
}

export function updateTopic(topic: ExtendedTopicWithId): UpdateTopic {
    return { type: UPDATE_TOPIC, payload: topic };
}

export function updateTopicSuccess(
    topic: ExtendedTopicWithId
): UpdateTopicSuccess {
    return { type: UPDATE_TOPIC_SUCCESS, payload: topic };
}

export function updateTopicError(error: object): UpdateTopicError {
    return { type: UPDATE_TOPIC_ERROR, payload: error };
}

export function deleteTopic(id: string): DeleteTopic {
    return { type: DELETE_TOPIC, payload: id };
}

export function deleteTopicSuccess(id: string): DeleteTopicSuccess {
    return { type: DELETE_TOPIC_SUCCESS, payload: id };
}

export function deleteTopicError(error: object): DeleteTopicError {
    return { type: DELETE_TOPIC_ERROR, payload: error };
}
