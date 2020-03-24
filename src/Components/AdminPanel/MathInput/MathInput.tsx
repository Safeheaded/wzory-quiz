import React, { Fragment } from 'react';
import {
    FormControl,
    TextField,
    StandardTextFieldProps
} from '@material-ui/core';
import Latex from 'react-latex';

interface Props extends StandardTextFieldProps {
    mathValue?: string;
}

const MathInput: React.FC<Props> = (props: Props) => {
    const { ...defaultProps } = props;
    const displayValue =
        (props.value as string).length !== 0
            ? `$$${props.value as string}$$`
            : '';
    return (
        <Fragment>
            <FormControl fullWidth>
                <TextField {...defaultProps} error={!!props.helperText} />
            </FormControl>
            <FormControl fullWidth>
                <Latex displayMode={true}>{displayValue}</Latex>
            </FormControl>
        </Fragment>
    );
};

export default MathInput;
