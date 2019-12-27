import React from 'react';
import { FormControl, TextField } from '@material-ui/core';

interface Props {
    name: string;
    label: string;
    multiline?: boolean;
    fullWidth?: boolean;
    rows?: string;
    disabled?: boolean;
}

const FormInput: React.SFC<Props> = (props: Props) => {
    return (
        <FormControl disabled={props.disabled}>
            <TextField {...props} />
        </FormControl>
    );
};

export default FormInput;
