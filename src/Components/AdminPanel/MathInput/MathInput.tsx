import React, { Component, Fragment } from 'react';
import MathJax from 'react-mathjax2';
import { TextField, FormControl } from '@material-ui/core';

interface Props {
    value: string;
    onValueChange: Function;
}

const MathInput: React.FC<Props> = (props: Props) => {
    return (
        <FormControl>
            <TextField
                label="Równanie"
                name="equation"
                value={props.value}
                onChange={e => props.onValueChange(e)}
            />
            <MathJax.Context input="ascii">
                <MathJax.Node>{props.value}</MathJax.Node>
            </MathJax.Context>
        </FormControl>
    );
};

export default MathInput;
