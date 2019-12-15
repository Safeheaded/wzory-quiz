import {
    ADD_EQUATION,
    ADD_EQUATION_SUCCESS,
    ADD_EQUATION_ERROR
} from '../constants/Equations';

export interface EquationsState {
    equations: Array<Equation>;
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

export type EqActionTypes =
    | AddEquationActionType
    | AddEquationErrorActionType
    | AddEquationSuccessActionType;
