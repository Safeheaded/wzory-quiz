import React, { Component } from 'react';
import { Grid, Paper, Typography, Theme, Button } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import QuizAnswer from './Answer/Answer';
import { Answer } from '../../../types/General';
import {
    ExtendedEquationWithId,
    Equation,
    EquationWithId
} from '../../../store/types/Equations';
import { shuffle } from 'lodash';

interface Props extends WithStyles<typeof classes> {
    equations: ExtendedEquationWithId[];
}

interface State {
    selectedEquation: ExtendedEquationWithId;
    selectionCounter: number;
    mode: QuizMode;
    wrongAnswerId: string;
}

export enum QuizMode {
    Answering,
    Answered
}

export const classes = (theme: Theme) =>
    createStyles({
        paper: {
            padding: `${theme.spacing(3)}px`,
            textAlign: 'center',
            width: '100%'
        },
        button: {
            padding: 0,
            width: '100%'
        },
        wrongButton: {
            backgroundColor: 'red'
        },
        rightButton: {
            backgroundColor: 'green'
        }
    });

class Quiz extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.setFirstEquation();
        this.setState({ mode: QuizMode.Answering });
    }

    private setFirstEquation() {
        const firstEquation = this.props.equations[0];
        this.setState({ selectedEquation: firstEquation, selectionCounter: 0 });
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.equations !== this.props.equations) {
            this.setFirstEquation();
        }
    }

    clickHandler = (id: string) => {
        this.setState({ mode: QuizMode.Answered, wrongAnswerId: id });
    };

    generateUniqueRandoms(
        array: ExtendedEquationWithId[],
        loops: number,
        answer: ExtendedEquationWithId
    ) {
        const values: ExtendedEquationWithId[] = [];
        let counter = 0;
        while (counter < loops) {
            const number = Math.floor(Math.random() * array.length);
            const randVal = array[number];
            if (values.indexOf(randVal) === -1 && randVal.id !== answer.id) {
                values.push(randVal);
                counter++;
            }
        }
        return values;
    }

    render() {
        const rightAnswer = this.state?.selectedEquation;
        let answers: ExtendedEquationWithId[] = [];
        if (rightAnswer) {
            const wrongAnswers = this.generateUniqueRandoms(
                this.props.equations,
                3,
                rightAnswer
            );
            answers.push(...wrongAnswers, rightAnswer);
        }
        answers = shuffle(answers);
        const answersToDisplay = answers.map((eq, index) => {
            return (
                <QuizAnswer
                    id={eq.id}
                    key={eq.id}
                    answer={eq.equation}
                    onClick={this.clickHandler}
                    answerType={
                        this.state?.selectedEquation?.equation === eq.equation
                            ? Answer.Right
                            : eq.id === this.state?.wrongAnswerId
                            ? Answer.Wrong
                            : undefined
                    }
                    mode={this.state.mode}
                />
            );
        });
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={this.props.classes.paper}>
                        <Typography variant="h4">
                            {this.state?.selectedEquation?.explanation}
                        </Typography>
                    </Paper>
                </Grid>
                {answersToDisplay}
            </Grid>
        );
    }
}

export default withStyles(classes)(Quiz);
