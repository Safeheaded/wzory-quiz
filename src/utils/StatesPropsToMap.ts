import { EquationsState } from '../store/types/Equations';
import { RootReducer } from '../store/types/main';

export const mapEqState = (state: RootReducer) => ({
    subjects: state.subjectsReducer.subjects,
    topics: state.topicsReducer.topics,
    equations: state.eqReducer.equations
});
