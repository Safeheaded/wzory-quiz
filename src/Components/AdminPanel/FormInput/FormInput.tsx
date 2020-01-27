import React from 'react';
import {
    FormControl,
    TextField,
    StandardTextFieldProps
} from '@material-ui/core';

const FormInput: React.SFC<StandardTextFieldProps> = (
    props: StandardTextFieldProps
) => {
    return (
        <FormControl fullWidth={!!props.fullWidth}>
            <TextField {...props} />
        </FormControl>
    );
};

export default FormInput;
