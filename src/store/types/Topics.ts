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

export interface AddTopicActionType {
    type: typeof ADD_TOPIC;
    payload: ExtendedTopic;
}

export interface AddTopicSuccessActionType {
    type: typeof ADD_TOPIC_SUCCESS;
    payload: TopicWithId;
}

export interface AddTopicErrorActionType {
    type: typeof ADD_TOPIC_ERROR;
    payload: object;
}

export interface FetchAllTopicsActionType {
    type: typeof FETCH_ALL_TOPICS;
    payload: string;
}

export interface FetchAllTopicsSuccessActionType {
    type: typeof FETCH_ALL_TOPICS_SUCCESS;
    payload: ExtendedTopicWithId[];
}

export interface FetchAllTopicsErrorActionType {
    type: typeof FETCH_ALL_TOPICS_ERROR;
    payload: object;
}

export type TopicsActionTypes =
    | AddTopicActionType
    | AddTopicSuccessActionType
    | AddTopicErrorActionType
    | FetchAllTopicsActionType
    | FetchAllTopicsSuccessActionType
    | FetchAllTopicsErrorActionType;
