import {
    Subject,
    AddSubject,
    SubjectWithId,
    AddSubjectSuccess,
    AddSubjectError,
    FetchAllSubjects,
    FetchAllSubjectsSuccess,
    FetchAllSubjectsError,
    UpdateSubject,
    UpdateSubjectSuccess,
    UpdateSubjectError,
    DeleteSubject,
    DeleteSubjectSuccess,
    DeleteSubjectError,
    FetchAllSubjectsDone
} from '../types/Subjects';

import {
    ADD_SUBJECT,
    ADD_SUBJECT_SUCCESS,
    ADD_SUBJECT_ERROR,
    FETCH_ALL_SUBJECTS,
    FETCH_ALL_SUBJECTS_SUCCESS,
    FETCH_ALL_SUBJECTS_ERROR,
    UPDATE_SUBJECT,
    UPDATE_SUBJECT_SUCCESS,
    UPDATE_SUBJECT_ERROR,
    DELETE_SUBJECT,
    DELETE_SUBJECT_SUCCESS,
    DELETE_SUBJECT_ERROR,
    FETCH_ALL_SUBJECTS_DONE
} from '../constants/Subjects';

export function addSubject(subject: Subject): AddSubject {
    return { type: ADD_SUBJECT, payload: subject };
}

export function addSubjectSuccess(subject: SubjectWithId): AddSubjectSuccess {
    return { type: ADD_SUBJECT_SUCCESS, payload: subject };
}

export function addSubjectError(error: object): AddSubjectError {
    return { type: ADD_SUBJECT_ERROR, payload: error };
}

export function fetchAllSubjects(): FetchAllSubjects {
    return { type: FETCH_ALL_SUBJECTS };
}

export function fetchAllSubjectsSuccess(
    subjects: SubjectWithId[]
): FetchAllSubjectsSuccess {
    return { type: FETCH_ALL_SUBJECTS_SUCCESS, payload: subjects };
}

export function fetchAllSubjectsError(error: object): FetchAllSubjectsError {
    return {
        type: FETCH_ALL_SUBJECTS_ERROR,
        payload: error
    };
}

export function fetchAllSubjectsDone(): FetchAllSubjectsDone {
    return { type: FETCH_ALL_SUBJECTS_DONE };
}

export function updateSubject(subject: SubjectWithId): UpdateSubject {
    return {
        type: UPDATE_SUBJECT,
        payload: subject
    };
}

export function updateSubjectSuccess(
    subject: SubjectWithId
): UpdateSubjectSuccess {
    return {
        type: UPDATE_SUBJECT_SUCCESS,
        payload: subject
    };
}

export function updateSubjectError(error: object): UpdateSubjectError {
    return {
        type: UPDATE_SUBJECT_ERROR,
        payload: error
    };
}

export function deleteSubject(id: string): DeleteSubject {
    return { type: DELETE_SUBJECT, payload: id };
}

export function deleteSubjectSuccess(id: string): DeleteSubjectSuccess {
    return { type: DELETE_SUBJECT_SUCCESS, payload: id };
}

export function deleteSubjectError(error: object): DeleteSubjectError {
    return { type: DELETE_SUBJECT_ERROR, payload: error };
}
