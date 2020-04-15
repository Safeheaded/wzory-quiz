import React, { Fragment, useState, useEffect } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Theme,
    Button,
    makeStyles
} from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import QuizAnswer from './Answer/Answer';
import { Answer } from '../../../types/General';
import { ExtendedEquationWithId } from '../../../store/types/Equations';
import { shuffle } from 'lodash';
import { sleep } from '../../../utils/general';

type Props = { equations: ExtendedEquationWithId[] };

export enum QuizMode {
    Answering,
    Answered
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: `${theme.spacing(3)}px`,
            textAlign: 'center',
            width: '100%'
        },
        button: {
            padding: 0,
            width: '100%'
        }
    })
);

const pickWrongAnswers = (
    question: ExtendedEquationWithId | undefined,
    equations: ExtendedEquationWithId[]
) => {
    const values: ExtendedEquationWithId[] = [];
    let tempCounter = 0;
    const numberToPick = 3;
    while (tempCounter < numberToPick) {
        const number = Math.floor(Math.random() * equations.length);
        const randVal = equations[number];
        if (question) {
            if (values.indexOf(randVal) === -1 && randVal.id !== question.id) {
                values.push(randVal);
                tempCounter++;
            }
        }
    }
    return values;
};

const Quiz = (props: Props) => {
    const { equations } = props;
    const [question, setQuestion] = useState<ExtendedEquationWithId>();
    const [shuffledEquations, setShuffledEquations] = useState<
        ExtendedEquationWithId[]
    >([]);
    const [answers, setAnswers] = useState<ExtendedEquationWithId[]>([]);
    const [mode, setMode] = useState<QuizMode>(QuizMode.Answering);
    const [wrongAnswerId, setWrongAnswerId] = useState<string>();
    const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
    const [counter, setCounter] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const styles = useStyles();

    useEffect(() => {
        if (equations.length !== 0) {
            setShuffledEquations(shuffle(equations));
        }
    }, [equations]);

    useEffect(() => {
        setQuestion(shuffledEquations[0]);
    }, [shuffledEquations]);

    useEffect(() => {
        if (question) {
            const wrongAnswers = pickWrongAnswers(question, shuffledEquations);
            setAnswers(shuffle([...wrongAnswers, question]));
        }
    }, [question, shuffledEquations]);

    useEffect(() => {
        if (mode === QuizMode.Answered) {
            (async () => {
                await sleep(2000);
                setCounter(counter => counter + 1);
                const equation = shuffledEquations.find(
                    eq => eq.id === wrongAnswerId
                );
                if (equation?.id !== question?.id) {
                    setWrongAnswersCount(c => c + 1);
                }
            })();
        }
    }, [mode, question, wrongAnswerId, shuffledEquations]);

    useEffect(() => {
        if (counter > 0 && counter < shuffledEquations.length) {
            setMode(QuizMode.Answering);
            setQuestion(shuffledEquations[counter]);
        } else if (counter > 0) {
            setIsFinished(true);
        }
    }, [counter, shuffledEquations]);

    const clickHandler = (id: string) => {
        if (mode === QuizMode.Answering) {
            setMode(QuizMode.Answered);
            setWrongAnswerId(id);
        }
    };

    const resetQuiz = () => {
        setShuffledEquations(shuffle(equations));
        setIsFinished(false);
        setMode(QuizMode.Answering);
        setCounter(0);
        setWrongAnswersCount(0);
    };

    const answersToDisplay = answers.map(eq => {
        return (
            <QuizAnswer
                id={eq.id}
                key={eq.id}
                answer={eq.equation}
                onClick={clickHandler}
                answerType={
                    question?.id === eq.id
                        ? Answer.Right
                        : eq.id === wrongAnswerId
                        ? Answer.Wrong
                        : undefined
                }
                mode={mode}
            />
        );
    });

    const quizResult = (
        <Fragment>
            <Grid item xs={12}>
                <Paper className={styles.paper}>
                    <Typography variant="h4">
                        Wynik: {shuffledEquations.length - wrongAnswersCount}/
                        {shuffledEquations.length}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={resetQuiz}>Spróbuj ponownie</Button>
            </Grid>
        </Fragment>
    );

    const quizContent = (
        <Fragment>
            <Grid item xs={12}>
                <Paper className={styles.paper}>
                    <Typography variant="h4">{question?.name}</Typography>
                </Paper>
            </Grid>
            {answersToDisplay}
        </Fragment>
    );

    return (
        <Grid container spacing={3}>
            {isFinished ? quizResult : quizContent}
        </Grid>
    );
};

export default Quiz;
