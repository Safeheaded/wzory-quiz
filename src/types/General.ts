import { TextFieldProps, StandardTextFieldProps } from '@material-ui/core';

export interface ItemOfList {
    name?: string;
    explanation?: string;
    id: string;
}

export enum Answer {
    Right,
    Wrong
}
