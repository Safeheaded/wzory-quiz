import {
    EquationsState,
    EqActionTypes,
    SubjectWithId,
    EquationWithId
} from '../types/Equations';
import {
    ADD_EQUATION,
    ADD_EQUATION_SUCCESS,
    ADD_EQUATION_ERROR,
    ADD_SUBJECT_SUCCESS
} from '../constants/Equations';

const initState: EquationsState = { equations: [], subjects: [] };

const EquationsReducer = (
    state: EquationsState = initState,
    action: EqActionTypes
): EquationsState => {
    switch (action.type) {
        case ADD_EQUATION_SUCCESS:
            return addEquationSuccessHandler(state, action);
        case ADD_EQUATION_ERROR:
            console.log(action.payload);
        case ADD_SUBJECT_SUCCESS:
            return addSubjectSuccessHandler(state, action);
    }
    return state;
};

export default EquationsReducer;

function addEquationSuccessHandler(
    state: EquationsState,
    action: import('d:/React/wzory-quiz/src/store/types/Equations').AddEquationSuccessActionType
) {
    const equations = [...state.equations, action.payload as EquationWithId];
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
