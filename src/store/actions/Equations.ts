import {
    Equation,
    AddEquationActionType,
    EquationWithId,
    AddEquationSuccessActionType,
    AddEquationErrorActionType,
    ExtendedEquation
} from '../types/Equations';
import {
    ADD_EQUATION,
    ADD_EQUATION_SUCCESS,
    ADD_EQUATION_ERROR
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
