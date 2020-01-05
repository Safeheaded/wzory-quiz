import {
    SubjectsState,
    SubjectsActionTypes,
    SubjectWithId,
    AddSubjectSuccess
} from '../types/Subjects';
import {
    ADD_SUBJECT_SUCCESS,
    FETCH_ALL_SUBJECTS_SUCCESS,
    UPDATE_SUBJECT_SUCCESS
} from '../constants/Subjects';
import { AddEquationError } from '../types/Equations';

const initState = { subjects: [] };

const SubjectsReducer = (
    state: SubjectsState = initState,
    action: SubjectsActionTypes
): SubjectsState => {
    switch (action.type) {
        case ADD_SUBJECT_SUCCESS:
            return addSubjectSuccessHandler(state, action);
        case FETCH_ALL_SUBJECTS_SUCCESS:
            return { ...state, subjects: action.payload };
        case UPDATE_SUBJECT_SUCCESS:
            const updatedSubjects = state.subjects.map(subject => {
                if (subject.id === action.payload.id) {
                    return action.payload;
                }
                return subject;
            });
            return { ...state, subjects: updatedSubjects };
    }
    return state;
};

function addSubjectSuccessHandler(
    state: SubjectsState,
    action: AddEquationError | AddSubjectSuccess
) {
    const subjects = [...state.subjects, action.payload as SubjectWithId];
    return { ...state, subjects };
}

export default SubjectsReducer;
