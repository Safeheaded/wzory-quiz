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
    UPDATE_TOPIC_SUCCESS,
    UPDATE_TOPIC,
    UPDATE_TOPIC_ERROR
} from '../constants/Topics';
import { BaseType } from './main';

export interface TopicsState {
    topics: ExtendedTopicWithId[];
}

export interface Topic extends BaseType {}

export interface TopicWithId extends Topic {
    id: string;
}

export interface ExtendedTopic extends Topic {
    subjectRef: string;
}

export interface ExtendedTopicWithId extends ExtendedTopic, TopicWithId {}

export interface AddTopic {
    type: typeof ADD_TOPIC;
    payload: ExtendedTopic;
}

export interface AddTopicSuccess {
    type: typeof ADD_TOPIC_SUCCESS;
    payload: ExtendedTopicWithId;
}

export interface AddTopicError {
    type: typeof ADD_TOPIC_ERROR;
    payload: object;
}

export interface FetchAllTopics {
    type: typeof FETCH_ALL_TOPICS;
}

export interface FetchAllTopicsSuccess {
    type: typeof FETCH_ALL_TOPICS_SUCCESS;
    payload: ExtendedTopicWithId[];
}

export interface FetchAllTopicsError {
    type: typeof FETCH_ALL_TOPICS_ERROR;
    payload: object;
}

export interface FetchTopics {
    type: typeof FETCH_TOPICS;
    payload: string;
}

export interface FetchTopicsSuccess {
    type: typeof FETCH_TOPICS_SUCCESS;
    payload: ExtendedTopicWithId[];
}

export interface FetchTopicsError {
    type: typeof FETCH_TOPICS_ERROR;
    payload: object;
}

export interface UpdateTopic {
    type: typeof UPDATE_TOPIC;
    payload: ExtendedTopicWithId;
}

export interface UpdateTopicSuccess {
    type: typeof UPDATE_TOPIC_SUCCESS;
    payload: ExtendedTopicWithId;
}

export interface UpdateTopicError {
    type: typeof UPDATE_TOPIC_ERROR;
    payload: object;
}

export type TopicsActionTypes =
    | AddTopic
    | AddTopicSuccess
    | AddTopicError
    | FetchAllTopics
    | FetchAllTopicsSuccess
    | FetchAllTopicsError
    | FetchTopics
    | FetchTopicsSuccess
    | FetchTopicsError
    | UpdateTopic
    | UpdateTopicSuccess
    | UpdateTopicError;
