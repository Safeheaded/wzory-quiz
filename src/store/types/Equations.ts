import {
    ADD_EQUATION,
    ADD_EQUATION_SUCCESS,
    ADD_EQUATION_ERROR,
    FETCH_ALL_EQUATIONS,
    FETCH_ALL_EQUATIONS_SUCCESS,
    FETCH_ALL_EQUATIONS_ERROR,
    FETCH_EQUATION,
    FETCH_EQUATION_SUCCESS,
    FETCH_EQUATION_ERROR,
    UPDATE_EQUATION,
    UPDATE_EQUATION_SUCCESS,
    UPDATE_EQUATION_ERROR,
    DELETE_EQUATION,
    DELETE_EQUATION_SUCCESS,
    DELETE_EQUATION_ERROR,
    FETCH_EQUATIONS_ERROR,
    FETCH_EQUATIONS_DONE,
    FETCH_EQUATIONS,
    FETCH_EQUATIONS_SUCCESS,
    FETCH_ALL_EQUATIONS_DONE
} from '../constants/Equations';

export interface EquationsState {
    equations: Array<ExtendedEquationWithId>;
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

export interface AddEquation {
    type: typeof ADD_EQUATION;
    payload: ExtendedEquation;
}

export interface AddEquationSuccess {
    type: typeof ADD_EQUATION_SUCCESS;
    payload: EquationWithId;
}

export interface AddEquationError {
    type: typeof ADD_EQUATION_ERROR;
    payload: object;
}

export interface FetchAllEquations {
    type: typeof FETCH_ALL_EQUATIONS;
}

export interface FetchAllEquationsSuccess {
    type: typeof FETCH_ALL_EQUATIONS_SUCCESS;
    payload: ExtendedEquationWithId[];
}

export interface FetchAllEquationsError {
    type: typeof FETCH_ALL_EQUATIONS_ERROR;
    payload: object;
}

export interface FetchAllEquationsDone {
    type: typeof FETCH_ALL_EQUATIONS_DONE;
}

export interface FetchEquation {
    type: typeof FETCH_EQUATION;
    payload: string;
}

export interface FetchEquationSuccess {
    type: typeof FETCH_EQUATION_SUCCESS;
    payload: ExtendedEquationWithId;
}

export interface FetchEquationError {
    type: typeof FETCH_EQUATION_ERROR;
    payload: object;
}

export interface UpdateEquation {
    type: typeof UPDATE_EQUATION;
    payload: ExtendedEquationWithId;
}

export interface UpdateEquationSuccess {
    type: typeof UPDATE_EQUATION_SUCCESS;
    payload: ExtendedEquationWithId;
}

export interface UpdateEquationError {
    type: typeof UPDATE_EQUATION_ERROR;
    payload: object;
}

export interface DeleteEquation {
    type: typeof DELETE_EQUATION;
    payload: string;
}

export interface DeleteEquationSuccess {
    type: typeof DELETE_EQUATION_SUCCESS;
    payload: string;
}

export interface DeleteEquationError {
    type: typeof DELETE_EQUATION_ERROR;
    payload: object;
}

export interface FetchEquations {
    type: typeof FETCH_EQUATIONS;
    payload: string;
}

export interface FetchEquationsSuccess {
    type: typeof FETCH_EQUATIONS_SUCCESS;
    payload: ExtendedEquationWithId[];
}

export interface FetchEquationsError {
    type: typeof FETCH_EQUATIONS_ERROR;
    payload: object;
}

export interface FetchEquationsDone {
    type: typeof FETCH_EQUATIONS_DONE;
}

export type EqActionTypes =
    | AddEquation
    | AddEquationError
    | AddEquationSuccess
    | FetchAllEquations
    | FetchAllEquationsSuccess
    | FetchAllEquationsError
    | FetchEquation
    | FetchEquationSuccess
    | FetchEquationError
    | UpdateEquation
    | UpdateEquationSuccess
    | UpdateEquationError
    | DeleteEquation
    | DeleteEquationSuccess
    | DeleteEquationError
    | FetchEquations
    | FetchEquationsSuccess
    | FetchEquationsError
    | FetchEquationsDone;
