import {
    ADD_EQUATION,
    ADD_EQUATION_SUCCESS,
    ADD_EQUATION_ERROR,
    ADD_SUBJECT,
    ADD_SUBJECT_ERROR,
    ADD_SUBJECT_SUCCESS,
    FETCH_ALL_SUBJECTS,
    FETCH_ALL_SUBJECTS_SUCCESS,
    FETCH_ALL_SUBJECTS_ERROR,
    ADD_TOPIC,
    ADD_TOPIC_SUCCESS,
    ADD_TOPIC_ERROR,
    FETCH_ALL_TOPICS,
    FETCH_ALL_TOPICS_SUCCESS,
    FETCH_ALL_TOPICS_ERROR
} from '../constants/Equations';

export interface EquationsState {
    equations: Array<EquationWithId>;
    subjects: Array<SubjectWithId>;
    topics: Array<ExtendedTopicWithId>;
}

export interface Equation {
    explanation: string;
    equation: string;
}

export interface ExtendedEquation extends Equation {
    subjectRef: string;
    topicRef: string;
}

export interface ExtendedEquationWithId
    extends EquationWithId,
        ExtendedEquation {}

export interface EquationWithId extends Equation {
    id: string;
}

export interface AddEquationActionType {
    type: typeof ADD_EQUATION;
    payload: ExtendedEquation;
}

export interface AddEquationSuccessActionType {
    type: typeof ADD_EQUATION_SUCCESS;
    payload: EquationWithId;
}

export interface AddEquationErrorActionType {
    type: typeof ADD_EQUATION_ERROR;
    payload: object;
}

export interface Subject {
    name: string;
}

export interface SubjectWithId extends Subject {
    id: string;
}

export interface AddSubjectActionType {
    payload: Subject;
    type: typeof ADD_SUBJECT;
}

export interface AddSubjectErrorActionType {
    type: typeof ADD_SUBJECT_ERROR;
    payload: object;
}

export interface AddSubjectSuccessActionType {
    type: typeof ADD_SUBJECT_SUCCESS;
    payload: SubjectWithId;
}

export interface FetchAllSubjectsActionType {
    type: typeof FETCH_ALL_SUBJECTS;
}

export interface FetchAllSubjectsSuccessActionType {
    type: typeof FETCH_ALL_SUBJECTS_SUCCESS;
    payload: Array<SubjectWithId>;
}

export interface FetchAllSubjectsErrorActionType {
    type: typeof FETCH_ALL_SUBJECTS_ERROR;
    payload: object;
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

export type EqActionTypes =
    | AddEquationActionType
    | AddEquationErrorActionType
    | AddEquationSuccessActionType
    | AddSubjectActionType
    | AddSubjectSuccessActionType
    | AddSubjectErrorActionType
    | FetchAllSubjectsActionType
    | FetchAllSubjectsSuccessActionType
    | FetchAllSubjectsErrorActionType
    | AddTopicActionType
    | AddTopicSuccessActionType
    | AddTopicErrorActionType
    | FetchAllTopicsActionType
    | FetchAllTopicsSuccessActionType
    | FetchAllTopicsErrorActionType;
