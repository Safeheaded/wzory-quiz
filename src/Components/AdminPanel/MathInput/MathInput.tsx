import React, { Component, Fragment } from 'react';
import MathJax from 'react-mathjax2';
import { TextField, FormControl } from '@material-ui/core';
import styles from './MathInput.module.sass';

class MathInput extends Component {
    state = {
        equation: ''
    };

    render() {
        return (
            <FormControl>
                <TextField
                    label="Równanie"
                    name="equation"
                    value={this.state.equation}
                    onChange={e => this.onChangeHandler(e)}
                />
                <MathJax.Context input="ascii">
                    <MathJax.Node>{this.state.equation}</MathJax.Node>
                </MathJax.Context>
            </FormControl>
        );
    }
    onChangeHandler(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void {
        this.setState({ equation: e.target.value });
    }
}

export default MathInput;
