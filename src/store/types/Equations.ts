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
    UPDATE_EQUATION_ERROR
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

export interface FetchAllEquationsActionType {
    type: typeof FETCH_ALL_EQUATIONS;
}

export interface FetchAllEquationsSuccessActionType {
    type: typeof FETCH_ALL_EQUATIONS_SUCCESS;
    payload: ExtendedEquationWithId[];
}

export interface FetchAllEquationsErrorActionType {
    type: typeof FETCH_ALL_EQUATIONS_ERROR;
    payload: object;
}

export interface FetchEquationActionType {
    type: typeof FETCH_EQUATION;
    payload: string;
}

export interface FetchEquationSuccessActionType {
    type: typeof FETCH_EQUATION_SUCCESS;
    payload: ExtendedEquationWithId;
}

export interface FetchEquationErrorActionType {
    type: typeof FETCH_EQUATION_ERROR;
    payload: object;
}

export interface UpdateEquationActionType {
    type: typeof UPDATE_EQUATION;
    payload: ExtendedEquationWithId;
}

export interface UpdateEquationSuccessActionType {
    type: typeof UPDATE_EQUATION_SUCCESS;
    payload: ExtendedEquationWithId;
}

export interface UpdateEquationErrorActionType {
    type: typeof UPDATE_EQUATION_ERROR;
    payload: object;
}

export type EqActionTypes =
    | AddEquationActionType
    | AddEquationErrorActionType
    | AddEquationSuccessActionType
    | FetchAllEquationsActionType
    | FetchAllEquationsSuccessActionType
    | FetchAllEquationsErrorActionType
    | FetchEquationActionType
    | FetchEquationSuccessActionType
    | FetchEquationErrorActionType
    | UpdateEquationActionType
    | UpdateEquationSuccessActionType
    | UpdateEquationErrorActionType;
