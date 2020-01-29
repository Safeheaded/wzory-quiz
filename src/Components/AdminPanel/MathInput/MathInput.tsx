import React from 'react';
import { FormControl } from '@material-ui/core';
import { TextField, TextFieldProps } from 'formik-material-ui';
import Latex from 'react-latex';

interface Props extends TextFieldProps {
    value?: string;
}

const MathInput: React.FC<Props> = (props: Props) => {
    const { value: mathValue, ...defaultProps } = props;
    const displayValue = mathValue?.length !== 0 ? `$$${mathValue}$$` : '';
    return (
        <FormControl fullWidth>
            <TextField {...defaultProps} />
            <Latex displayMode={true}>{displayValue}</Latex>
        </FormControl>
    );
};

export default MathInput;
