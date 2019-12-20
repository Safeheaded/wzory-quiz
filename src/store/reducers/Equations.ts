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
    ADD_SUBJECT_SUCCESS,
    FETCH_ALL_EQUATIONS,
    FETCH_ALL_SUBJECTS,
    FETCH_ALL_SUBJECTS_SUCCESS,
    FETCH_ALL_TOPICS_SUCCESS
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
            console.log(action.payload);
        case ADD_SUBJECT_SUCCESS:
            return addSubjectSuccessHandler(state, action);
        case FETCH_ALL_SUBJECTS_SUCCESS:
            return { ...state, subjects: action.payload };
        case FETCH_ALL_TOPICS_SUCCESS:
            return { ...state, topics: action.payload };
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
