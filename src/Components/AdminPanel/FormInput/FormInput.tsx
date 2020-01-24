import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { onChangeType } from '../../../types/admin';
import { FormInputProps } from '../../../types/General';

const FormInput: React.SFC<FormInputProps> = (props: FormInputProps) => {
    return (
        <FormControl fullWidth disabled={props.disabled}>
            <TextField
                onChange={(e: onChangeType) => props.onValueChange(e)}
                name={props.name}
                label={props.label}
                multiline={props.multiline}
                fullWidth={props.fullWidth}
                rows={props.rows}
                value={props.value}
                helperText={props.helperText}
            />
        </FormControl>
    );
};

export default FormInput;
