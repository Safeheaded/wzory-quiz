import {
    AddEquation,
    EquationWithId,
    AddEquationSuccess,
    AddEquationError,
    ExtendedEquation,
    FetchAllEquations,
    FetchAllEquationsSuccess,
    FetchAllEquationsError,
    FetchEquation,
    ExtendedEquationWithId,
    FetchEquationSuccess,
    FetchEquationError,
    UpdateEquation,
    UpdateEquationSuccess,
    UpdateEquationError,
    DeleteEquation,
    DeleteEquationSuccess,
    DeleteEquationError,
    FetchEquations,
    FetchEquationsSuccess,
    FetchEquationsError,
    FetchEquationsDone,
    FetchAllEquationsDone,
    FetchEquationDone
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
    UPDATE_EQUATION_ERROR,
    DELETE_EQUATION,
    DELETE_EQUATION_SUCCESS,
    DELETE_EQUATION_ERROR,
    FETCH_EQUATIONS,
    FETCH_EQUATIONS_SUCCESS,
    FETCH_EQUATIONS_ERROR,
    FETCH_EQUATIONS_DONE,
    FETCH_ALL_EQUATIONS_DONE,
    FETCH_EQUATION_DONE
} from '../constants/Equations';

export function addEquation(equation: ExtendedEquation): AddEquation {
    return {
        type: ADD_EQUATION,
        payload: equation
    };
}

export function addEquationSuccess(
    equation: EquationWithId
): AddEquationSuccess {
    return {
        type: ADD_EQUATION_SUCCESS,
        payload: equation
    };
}

export function addEquationError(error: object): AddEquationError {
    return {
        type: ADD_EQUATION_ERROR,
        payload: error
    };
}

export function fetchAllEquations(): FetchAllEquations {
    return { type: FETCH_ALL_EQUATIONS };
}

export function fetchAllEquationsSuccess(
    equations: ExtendedEquationWithId[]
): FetchAllEquationsSuccess {
    return { type: FETCH_ALL_EQUATIONS_SUCCESS, payload: equations };
}

export function fetchAllEquationsError(error: object): FetchAllEquationsError {
    return { type: FETCH_ALL_EQUATIONS_ERROR, payload: error };
}

export function fetchAllEquationsDone(): FetchAllEquationsDone {
    return { type: FETCH_ALL_EQUATIONS_DONE };
}

export function fetchEquation(id: string): FetchEquation {
    return { type: FETCH_EQUATION, payload: id };
}

export function fetchEquationSuccess(
    equation: ExtendedEquationWithId
): FetchEquationSuccess {
    return { type: FETCH_EQUATION_SUCCESS, payload: equation };
}

export function fetchEquationError(error: object): FetchEquationError {
    return { type: FETCH_EQUATION_ERROR, payload: error };
}

export function updateEquation(
    equation: ExtendedEquationWithId
): UpdateEquation {
    return { type: UPDATE_EQUATION, payload: equation };
}

export function updateEquationSuccess(
    equation: ExtendedEquationWithId
): UpdateEquationSuccess {
    return { type: UPDATE_EQUATION_SUCCESS, payload: equation };
}

export function updateEquationError(error: object): UpdateEquationError {
    return { type: UPDATE_EQUATION_ERROR, payload: error };
}

export function deleteEquation(id: string): DeleteEquation {
    return { type: DELETE_EQUATION, payload: id };
}

export function deleteEquationSuccess(id: string): DeleteEquationSuccess {
    return { type: DELETE_EQUATION_SUCCESS, payload: id };
}

export function deleteEquationError(error: object): DeleteEquationError {
    return { type: DELETE_EQUATION_ERROR, payload: error };
}

export function fetchEquations(id: string): FetchEquations {
    return { type: FETCH_EQUATIONS, payload: id };
}

export function fetchEquationsSuccess(
    equations: ExtendedEquationWithId[]
): FetchEquationsSuccess {
    return { type: FETCH_EQUATIONS_SUCCESS, payload: equations };
}

export function fetchEquationsError(error: object): FetchEquationsError {
    return { type: FETCH_EQUATIONS_ERROR, payload: error };
}

export function fetchEquationsDone(): FetchEquationsDone {
    return { type: FETCH_EQUATIONS_DONE };
}

export function fetchEquationDone(): FetchEquationDone {
    return { type: FETCH_EQUATION_DONE };
}
