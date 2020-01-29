import React from 'react';
import { FormControl, StandardTextFieldProps } from '@material-ui/core';
import { TextField, TextFieldProps } from 'formik-material-ui';

const FormInput: React.SFC<TextFieldProps> = (props: TextFieldProps) => {
    return (
        <FormControl fullWidth={!!props.fullWidth}>
            <TextField {...props} />
        </FormControl>
    );
};

export default FormInput;
