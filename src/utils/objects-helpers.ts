export function updateValues<T extends object, K extends T>(
    origin: T,
    source: K
): T {
    let updatedOrigin = {} as T;
    for (const field in origin) {
        if (origin.hasOwnProperty(field) && source.hasOwnProperty(field)) {
            updatedOrigin[field] = source[field];
        }
    }
    return updatedOrigin;
}
