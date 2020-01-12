import {
    ADD_SUBJECT,
    ADD_SUBJECT_ERROR,
    ADD_SUBJECT_SUCCESS,
    FETCH_ALL_SUBJECTS,
    FETCH_ALL_SUBJECTS_SUCCESS,
    FETCH_ALL_SUBJECTS_ERROR,
    UPDATE_SUBJECT,
    UPDATE_SUBJECT_SUCCESS,
    UPDATE_SUBJECT_ERROR
} from '../constants/Subjects';
import { BaseType } from './main';

export interface SubjectsState {
    subjects: SubjectWithId[];
}

export interface Subject extends BaseType {}

export interface SubjectWithId extends Subject {
    id: string;
}

export interface AddSubject {
    payload: Subject;
    type: typeof ADD_SUBJECT;
}

export interface AddSubjectError {
    type: typeof ADD_SUBJECT_ERROR;
    payload: object;
}

export interface AddSubjectSuccess {
    type: typeof ADD_SUBJECT_SUCCESS;
    payload: SubjectWithId;
}

export interface FetchAllSubjects {
    type: typeof FETCH_ALL_SUBJECTS;
}

export interface FetchAllSubjectsSuccess {
    type: typeof FETCH_ALL_SUBJECTS_SUCCESS;
    payload: Array<SubjectWithId>;
}

export interface FetchAllSubjectsError {
    type: typeof FETCH_ALL_SUBJECTS_ERROR;
    payload: object;
}

export interface UpdateSubject {
    type: typeof UPDATE_SUBJECT;
    payload: SubjectWithId;
}

export interface UpdateSubjectSuccess {
    type: typeof UPDATE_SUBJECT_SUCCESS;
    payload: SubjectWithId;
}

export interface UpdateSubjectError {
    type: typeof UPDATE_SUBJECT_ERROR;
    payload: object;
}

export type SubjectsActionTypes =
    | AddSubject
    | AddSubjectError
    | AddSubjectSuccess
    | FetchAllSubjects
    | FetchAllSubjectsSuccess
    | FetchAllSubjectsError
    | UpdateSubject
    | UpdateSubjectSuccess
    | UpdateSubjectError;
