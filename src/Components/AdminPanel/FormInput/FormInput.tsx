import React from 'react';
import {
    FormControl,
    StandardTextFieldProps,
    TextField
} from '@material-ui/core';

const FormInput: React.SFC<StandardTextFieldProps> = (
    props: StandardTextFieldProps
) => {
    const error = props.helperText ? true : false;
    return (
        <FormControl fullWidth={!!props.fullWidth}>
            <TextField {...props} error={error} />
        </FormControl>
    );
};

export default FormInput;
