import { AuthState } from './Authentication';
import { EquationsState } from './Equations';
import { SubjectsState } from './Subjects';
import { TopicsState } from './Topics';

export interface RootReducer {
    authReducer: AuthState;
    eqReducer: EquationsState;
    subjectsReducer: SubjectsState;
    topicsReducer: TopicsState;
}

export interface BaseType {
    name: string;
}
