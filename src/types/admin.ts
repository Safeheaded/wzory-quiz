export type onChangeType =
    | React.ChangeEvent<{
          name?: string | undefined;
          value: unknown;
      }>
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export enum WriteMode {
    Edit,
    Add
}
