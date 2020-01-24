import React, { Component, Fragment } from 'react';
import { TextField, FormControl } from '@material-ui/core';
import Latex from 'react-latex';
import styles from './MathInput.module.sass';

interface Props {
    value: string;
    onValueChange: Function;
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
            />
            <Latex displayMode={true}>{displayValue}</Latex>
        </FormControl>
    );
};

export default MathInput;
