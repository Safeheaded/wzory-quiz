import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { onChangeType } from '../../../types/admin';

interface Props {
    name: string;
    label: string;
    multiline?: boolean;
    fullWidth?: boolean;
    rows?: string;
    disabled?: boolean;
    onValueChange: Function;
    value: string;
}

const FormInput: React.SFC<Props> = (props: Props) => {
    return (
        <FormControl disabled={props.disabled}>
            <TextField
                onChange={(e: onChangeType) => props.onValueChange(e)}
                name={props.name}
                label={props.label}
                multiline={props.multiline}
                fullWidth={props.fullWidth}
                rows={props.rows}
                value={props.value}
            />
        </FormControl>
    );
};

export default FormInput;
