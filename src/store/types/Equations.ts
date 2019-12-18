import {
    ADD_EQUATION,
    ADD_EQUATION_SUCCESS,
    ADD_EQUATION_ERROR,
    ADD_SUBJECT,
    ADD_SUBJECT_ERROR,
    ADD_SUBJECT_SUCCESS,
    FETCH_ALL_SUBJECTS,
    FETCH_ALL_SUBJECTS_SUCCESS,
    FETCH_ALL_SUBJECTS_ERROR
} from '../constants/Equations';

export interface EquationsState {
    equations: Array<EquationWithId>;
    subjects: Array<SubjectWithId>;
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

export type EqActionTypes =
    | AddEquationActionType
    | AddEquationErrorActionType
    | AddEquationSuccessActionType
    | AddSubjectActionType
    | AddSubjectSuccessActionType
    | AddSubjectErrorActionType
    | FetchAllSubjectsActionType
    | FetchAllSubjectsSuccessActionType
    | FetchAllSubjectsErrorActionType;
