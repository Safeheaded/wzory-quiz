export type SelectChangeEvent = React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
}>;

export enum WriteMode {
    Edit,
    Add
}
