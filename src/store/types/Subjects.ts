import {
    ADD_SUBJECT,
    ADD_SUBJECT_ERROR,
    ADD_SUBJECT_SUCCESS,
    FETCH_ALL_SUBJECTS,
    FETCH_ALL_SUBJECTS_SUCCESS,
    FETCH_ALL_SUBJECTS_ERROR
} from '../constants/Subjects';

export interface SubjectsState {
    subjects: SubjectWithId[];
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

export type SubjectsActionTypes =
    | AddSubjectActionType
    | AddSubjectErrorActionType
    | AddSubjectSuccessActionType
    | FetchAllSubjectsActionType
    | FetchAllSubjectsSuccessActionType
    | FetchAllSubjectsErrorActionType;
