import {
    EquationsState,
    EqActionTypes,
    ExtendedEquationWithId,
    AddEquationSuccess
} from '../types/Equations';
import {
    ADD_EQUATION,
    ADD_EQUATION_SUCCESS,
    ADD_EQUATION_ERROR,
    FETCH_ALL_EQUATIONS_SUCCESS,
    FETCH_EQUATION_SUCCESS,
    UPDATE_EQUATION_ERROR,
    UPDATE_EQUATION_SUCCESS,
    DELETE_EQUATION_SUCCESS,
    FETCH_EQUATIONS_SUCCESS,
    FETCH_EQUATIONS_ERROR,
    FETCH_ALL_EQUATIONS_ERROR
} from '../constants/Equations';

const initState: EquationsState = { equations: [] };

const EquationsReducer = (
    state: EquationsState = initState,
    action: EqActionTypes
): EquationsState => {
    switch (action.type) {
        case ADD_EQUATION_SUCCESS:
            return addEquationSuccessHandler(state, action);
        case FETCH_ALL_EQUATIONS_SUCCESS:
            return { ...state, equations: action.payload };
        case FETCH_ALL_EQUATIONS_ERROR:
            console.log(action.payload);
            return { ...state };
        case FETCH_EQUATION_SUCCESS:
            return {
                ...state,
                equations: [...state.equations, action.payload]
            };
        case FETCH_EQUATIONS_ERROR:
            console.log(action.payload);
            return { ...state };
        case UPDATE_EQUATION_ERROR:
            return { ...state };
        case UPDATE_EQUATION_SUCCESS:
            const updatedEquations = state.equations.map(equation => {
                if (equation.id === action.payload.id) {
                    return action.payload;
                }
                return equation;
            });
            return { ...state, equations: updatedEquations };
        case DELETE_EQUATION_SUCCESS:
            const equationsAfterDeletion = state.equations.filter(
                equation => equation.id != action.payload
            );
            return { ...state, equations: equationsAfterDeletion };
        case FETCH_EQUATIONS_SUCCESS:
            return {
                ...state,
                equations: [...state.equations, ...action.payload]
            };
    }
    return state;
};

export default EquationsReducer;

function addEquationSuccessHandler(
    state: EquationsState,
    action: AddEquationSuccess
) {
    const equations = [
        ...state.equations,
        action.payload as ExtendedEquationWithId
    ];
    return {
        ...state,
        equations
    };
}
