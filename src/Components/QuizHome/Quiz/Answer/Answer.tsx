/* eslint-disable react/display-name */
import React from 'react';
import { Answer } from '../../../../types/General';
import { Grid, Button, Paper, Theme } from '@material-ui/core';
import MathJax from 'react-mathjax2';
import { makeStyles, createStyles } from '@material-ui/styles';
import { classes, QuizMode } from '../Quiz';

interface Props {
    answerType?: Answer;
    answer: string;
    onClick: (id: string) => void;
    mode?: QuizMode;
    id: string;
}

const xsSize = 12;
const smSize = 6;

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
        },
        correctAnswer: {
            backgroundColor: 'green'
        },
        wrongAnswer: {
            backgroundColor: 'red'
        }
    })
);

const QuizAnswer = (props: Props) => {
    const styles = useStyles();
    const style = [styles.paper];
    if (props.mode === QuizMode.Answered) {
        if (props.answerType === Answer.Right) {
            style.push(styles.correctAnswer);
        } else if (props.answerType === Answer.Wrong) {
            style.push(styles.wrongAnswer);
        }
    }
    return (
        <Grid xs={xsSize} sm={smSize} item>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => props.onClick(props.id)}
                className={styles.button}
            >
                <Paper className={style.join(' ')}>
                    <MathJax.Context
                        options={{
                            menuSettings: { inTabOrder: false }
                        }}
                    >
                        <MathJax.Node inline>{props.answer || ''}</MathJax.Node>
                    </MathJax.Context>
                </Paper>
            </Button>
        </Grid>
    );
};

export default QuizAnswer;
