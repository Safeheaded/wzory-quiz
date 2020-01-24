export interface ItemOfList {
    name?: string;
    explanation?: string;
    id: string;
}

export interface FormInputProps {
    name: string;
    label: string;
    multiline?: boolean;
    fullWidth?: boolean;
    rows?: string;
    disabled?: boolean;
    onValueChange: Function;
    value: string;
    helperText?: string;
}

export enum Answer {
    Right,
    Wrong
}
