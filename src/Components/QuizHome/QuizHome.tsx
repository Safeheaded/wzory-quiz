import React, { Component, Fragment } from 'react';
import {
    Card,
    CardHeader,
    Typography,
    Grid,
    CardContent,
    Paper,
    Button
} from '@material-ui/core';
import { Theme, createStyles } from '@material-ui/core/styles';
import { WithStyles, withStyles, makeStyles } from '@material-ui/styles';
import MathJax from 'react-mathjax2';
import Quiz from './Quiz/Quiz';

interface Props {}

interface State {}

class QuizHome extends Component<Props, State> {
    render() {
        return (
            <Fragment>
                <Quiz />
            </Fragment>
        );
    }
}

export default QuizHome;
