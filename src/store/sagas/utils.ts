import { firestore } from 'firebase';

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
