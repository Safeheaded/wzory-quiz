import { firestore } from 'firebase';
import { RootReducer } from '../types/main';

export function collectionToArray<T extends K & { id: string }, K>(
    snapshot: firestore.QuerySnapshot
): T[] {
    const items: T[] = [];
    snapshot.forEach(item => {
        const newItem = { id: item.id, ...(item.data() as K) } as T;
        items.push(newItem);
    });
    return items;
}

export const getTopics = (state: RootReducer) => state.topicsReducer.topics;
export const getEquations = (state: RootReducer) => state.eqReducer.equations;
export const getSubjects = (state: RootReducer) =>
    state.subjectsReducer.subjects;
export const getEquation = (id: string) => (state: RootReducer) =>
    state.eqReducer.equations.find(equation => equation.id === id);
