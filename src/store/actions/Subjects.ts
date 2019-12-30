import {
    Subject,
    AddSubject,
    SubjectWithId,
    AddSubjectSuccess,
    AddSubjectError,
    FetchAllSubjects,
    FetchAllSubjectsSuccess,
    FetchAllSubjectsError
} from '../types/Subjects';

import {
    ADD_SUBJECT,
    ADD_SUBJECT_SUCCESS,
    ADD_SUBJECT_ERROR,
    FETCH_ALL_SUBJECTS,
    FETCH_ALL_SUBJECTS_SUCCESS,
    FETCH_ALL_SUBJECTS_ERROR
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
