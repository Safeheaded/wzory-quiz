import {
    EquationsState,
    EqActionTypes,
    SubjectWithId,
    ExtendedEquationWithId,
    AddEquationSuccessActionType
} from '../types/Equations';
import {
    ADD_EQUATION,
    ADD_EQUATION_SUCCESS,
    ADD_EQUATION_ERROR,
    ADD_SUBJECT_SUCCESS,
    FETCH_ALL_SUBJECTS_SUCCESS,
    FETCH_ALL_TOPICS_SUCCESS,
    FETCH_ALL_EQUATIONS_SUCCESS,
    FETCH_EQUATION_SUCCESS,
    UPDATE_EQUATION_ERROR,
    UPDATE_EQUATION_SUCCESS
} from '../constants/Equations';

const initState: EquationsState = { equations: [], subjects: [], topics: [] };

const EquationsReducer = (
    state: EquationsState = initState,
    action: EqActionTypes
): EquationsState => {
    switch (action.type) {
        case ADD_EQUATION_SUCCESS:
            return addEquationSuccessHandler(state, action);
        case ADD_EQUATION_ERROR:
        case ADD_SUBJECT_SUCCESS:
            return addSubjectSuccessHandler(state, action);
        case FETCH_ALL_SUBJECTS_SUCCESS:
            return { ...state, subjects: action.payload };
        case FETCH_ALL_TOPICS_SUCCESS:
            return { ...state, topics: action.payload };
        case FETCH_ALL_EQUATIONS_SUCCESS:
            return { ...state, equations: action.payload };
        case FETCH_EQUATION_SUCCESS:
            return {
                ...state,
                equations: [...state.equations, action.payload]
            };
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
    }
    return state;
};

export default EquationsReducer;

function addEquationSuccessHandler(
    state: EquationsState,
    action: AddEquationSuccessActionType
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

function addSubjectSuccessHandler(
    state: EquationsState,
    action:
        | import('d:/React/wzory-quiz/src/store/types/Equations').AddEquationErrorActionType
        | import('d:/React/wzory-quiz/src/store/types/Equations').AddSubjectSuccessActionType
) {
    const subjects = [...state.subjects, action.payload as SubjectWithId];
    return { ...state, subjects };
}
