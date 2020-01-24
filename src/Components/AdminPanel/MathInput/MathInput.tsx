import React, { Component, Fragment } from 'react';
import { TextField, FormControl } from '@material-ui/core';
import Latex from 'react-latex';
import styles from './MathInput.module.sass';

interface Props {
    value: string;
    onValueChange: Function;
    onBlur?: () => void;
    helperText?: string;
}

const MathInput: React.FC<Props> = (props: Props) => {
    const displayValue = props.value.length !== 0 ? `$$${props.value}$$` : '';
    return (
        <FormControl fullWidth>
            <TextField
                label="Równanie"
                name="equation"
                value={props.value}
                onChange={e => props.onValueChange(e)}
                error={!!props.helperText}
                helperText={props.helperText}
                onBlur={props.onBlur}
            />
            <Latex displayMode={true}>{displayValue}</Latex>
        </FormControl>
    );
};

export default MathInput;
