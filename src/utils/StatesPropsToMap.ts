import {
    EquationsState,
    ExtendedEquationWithId
} from '../store/types/Equations';
import { RootReducer } from '../store/types/main';
import { SubjectWithId } from '../store/types/Subjects';
import { ExtendedTopicWithId } from '../store/types/Topics';

export const mapEqState = (state: RootReducer) => ({
    subjects: state.subjectsReducer.subjects,
    topics: state.topicsReducer.topics,
    equations: state.eqReducer.equations
});

export interface EqStateProps {
    equations: ExtendedEquationWithId[];
    subjects: SubjectWithId[];
    topics: ExtendedTopicWithId[];
}
