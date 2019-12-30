import {
    ADD_TOPIC,
    ADD_TOPIC_SUCCESS,
    ADD_TOPIC_ERROR,
    FETCH_ALL_TOPICS,
    FETCH_ALL_TOPICS_SUCCESS,
    FETCH_ALL_TOPICS_ERROR
} from '../constants/Topics';

export interface TopicsState {
    topics: ExtendedTopicWithId[];
}

export interface Topic {
    name: string;
}

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
    payload: TopicWithId;
}

export interface AddTopicError {
    type: typeof ADD_TOPIC_ERROR;
    payload: object;
}

export interface FetchAllTopics {
    type: typeof FETCH_ALL_TOPICS;
    payload: string;
}

export interface FetchAllTopicsSuccess {
    type: typeof FETCH_ALL_TOPICS_SUCCESS;
    payload: ExtendedTopicWithId[];
}

export interface FetchAllTopicsError {
    type: typeof FETCH_ALL_TOPICS_ERROR;
    payload: object;
}

export type TopicsActionTypes =
    | AddTopic
    | AddTopicSuccess
    | AddTopicError
    | FetchAllTopics
    | FetchAllTopicsSuccess
    | FetchAllTopicsError;