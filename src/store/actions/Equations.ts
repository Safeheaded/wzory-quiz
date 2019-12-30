import {
    AddEquationActionType,
    EquationWithId,
    AddEquationSuccessActionType,
    AddEquationErrorActionType,
    ExtendedEquation,
    FetchAllEquationsActionType,
    FetchAllEquationsSuccessActionType,
    FetchAllEquationsErrorActionType,
    FetchEquationActionType,
    ExtendedEquationWithId,
    FetchEquationSuccessActionType,
    FetchEquationErrorActionType,
    UpdateEquationActionType,
    UpdateEquationSuccessActionType,
    UpdateEquationErrorActionType
} from '../types/Equations';
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

export function fetchAllEquations(): FetchAllEquationsActionType {
    return { type: FETCH_ALL_EQUATIONS };
}

export function fetchAllEquationsSuccess(
    equations: ExtendedEquationWithId[]
): FetchAllEquationsSuccessActionType {
    return { type: FETCH_ALL_EQUATIONS_SUCCESS, payload: equations };
}

export function fetchAllEquationsError(
    error: object
): FetchAllEquationsErrorActionType {
    return { type: FETCH_ALL_EQUATIONS_ERROR, payload: error };
}

export function fetchEquation(id: string): FetchEquationActionType {
    return { type: FETCH_EQUATION, payload: id };
}

export function fetchEquationSuccess(
    equation: ExtendedEquationWithId
): FetchEquationSuccessActionType {
    return { type: FETCH_EQUATION_SUCCESS, payload: equation };
}

export function fetchEquationError(
    error: object
): FetchEquationErrorActionType {
    return { type: FETCH_EQUATION_ERROR, payload: error };
}

export function updateEquation(
    equation: ExtendedEquationWithId
): UpdateEquationActionType {
    return { type: UPDATE_EQUATION, payload: equation };
}

export function updateEquationSuccess(
    equation: ExtendedEquationWithId
): UpdateEquationSuccessActionType {
    return { type: UPDATE_EQUATION_SUCCESS, payload: equation };
}

export function updateEquationError(
    error: object
): UpdateEquationErrorActionType {
    return { type: UPDATE_EQUATION_ERROR, payload: error };
}
