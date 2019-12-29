import { EquationsState } from '../store/types/Equations';

export const mapEqState = ({ eqReducer }: { eqReducer: EquationsState }) => ({
    subjects: eqReducer.subjects,
    topics: eqReducer.topics,
    equations: eqReducer.equations
});
