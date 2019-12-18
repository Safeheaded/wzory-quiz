import {
    Equation,
    AddEquationActionType,
    EquationWithId,
    AddEquationSuccessActionType,
    AddEquationErrorActionType,
    ExtendedEquation,
    AddSubjectActionType,
    Subject,
    SubjectWithId,
    AddSubjectSuccessActionType,
    AddSubjectErrorActionType,
    FetchAllSubjectsActionType,
    FetchAllSubjectsSuccessActionType,
    FetchAllSubjectsErrorActionType
} from '../types/Equations';
import {
    ADD_EQUATION,
    ADD_EQUATION_SUCCESS,
    ADD_EQUATION_ERROR,
    ADD_SUBJECT,
    ADD_SUBJECT_SUCCESS,
    ADD_SUBJECT_ERROR,
    FETCH_ALL_SUBJECTS,
    FETCH_ALL_SUBJECTS_SUCCESS,
    FETCH_ALL_SUBJECTS_ERROR
} from '../constants/Equations';

export function addEquation(equation: ExtendedEquation): AddEquationActionType {
    return {
        type: ADD_EQUATION,
        payload: equation
    };
}

export function addEquationSuccess(
    equation: EquationWithId
): AddEquationSuccessActionType {
    return {
        type: ADD_EQUATION_SUCCESS,
        payload: equation
    };
}

export function addEquationError(error: object): AddEquationErrorActionType {
    return {
        type: ADD_EQUATION_ERROR,
        payload: error
    };
}

export function addSubject(subject: Subject): AddSubjectActionType {
    return { type: ADD_SUBJECT, payload: subject };
}

export function addSubjectSuccess(
    subject: SubjectWithId
): AddSubjectSuccessActionType {
    return { type: ADD_SUBJECT_SUCCESS, payload: subject };
}

export function addSubjectError(error: object): AddSubjectErrorActionType {
    return { type: ADD_SUBJECT_ERROR, payload: error };
}

export function fetchAllSubjects(): FetchAllSubjectsActionType {
    return { type: FETCH_ALL_SUBJECTS };
}

export function fetchAllSubjectsSuccess(
    subjects: SubjectWithId[]
): FetchAllSubjectsSuccessActionType {
    return { type: FETCH_ALL_SUBJECTS_SUCCESS, payload: subjects };
}

export function fetchAllSubjectsError(
    error: object
): FetchAllSubjectsErrorActionType {
    return {
        type: FETCH_ALL_SUBJECTS_ERROR,
        payload: error
    };
}
