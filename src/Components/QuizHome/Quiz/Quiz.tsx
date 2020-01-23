import React, { Component, Fragment } from 'react';
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
import { sleep } from '../../../utils/general';

interface Props extends WithStyles<typeof classes> {
    equations: ExtendedEquationWithId[];
}

interface State {
    selectedEquation: ExtendedEquationWithId;
    mode: QuizMode;
    wrongAnswerId: string;
    answers: ExtendedEquationWithId[];
    counter: number;
    isFinish: boolean;
    wrongAnswersCount: number;
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
    }

    private setFirstEquation() {
        if (this.props.equations.length !== 0) {
            const firstEquation = this.props.equations[0];
            const wrongAnswers = this.generateUniqueRandoms(
                this.props.equations,
                3,
                firstEquation
            );
            const answers = shuffle([...wrongAnswers, firstEquation]);
            this.setState({
                selectedEquation: firstEquation,
                answers,
                counter: 0,
                mode: QuizMode.Answering,
                isFinish: false,
                wrongAnswersCount: 0
            });
        }
    }

    async componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.equations !== this.props.equations) {
            this.setFirstEquation();
        }
        if (
            prevState?.mode === QuizMode.Answering &&
            this.state?.mode === QuizMode.Answered
        ) {
            await sleep(1500);
            const counter = this.state.counter + 1;
            const equation = this.props.equations.find(
                eq => eq.id === this.state.wrongAnswerId
            );
            let wrongAnswersCount = this.state.wrongAnswersCount;
            if (equation?.id !== this.state.selectedEquation.id) {
                wrongAnswersCount++;
            }
            if (counter < this.props.equations.length) {
                const newAnswer = this.props.equations[counter];
                const wrongAnswers = this.generateUniqueRandoms(
                    this.props.equations,
                    3,
                    newAnswer
                );
                const answers = shuffle([...wrongAnswers, newAnswer]);
                this.setState({
                    answers,
                    counter,
                    selectedEquation: newAnswer,
                    mode: QuizMode.Answering,
                    wrongAnswersCount
                });
            } else {
                this.setState({ isFinish: true, wrongAnswersCount });
            }
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
        const answersToDisplay = this.state?.answers?.map((eq, index) => {
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
        const quizContent = (
            <Fragment>
                <Grid item xs={12}>
                    <Paper className={this.props.classes.paper}>
                        <Typography variant="h4">
                            {this.state?.selectedEquation?.explanation}
                        </Typography>
                    </Paper>
                </Grid>
                {answersToDisplay}
            </Fragment>
        );
        const quizResult = (
            <Grid item xs={12}>
                <Paper className={this.props.classes.paper}>
                    <Typography variant="h4">
                        Wynik:{' '}
                        {this.props.equations.length -
                            this.state?.wrongAnswersCount}
                        /{this.props.equations.length}
                    </Typography>
                </Paper>
            </Grid>
        );
        return (
            <Grid container spacing={3}>
                {this.state?.isFinish ? quizResult : quizContent}
            </Grid>
        );
    }
}

export default withStyles(classes)(Quiz);
