/* eslint-disable react/display-name */
import React from 'react';
import { Answer } from '../../../../types/General';
import { Grid, Paper, Theme, ButtonBase } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { QuizMode } from '../Quiz';
import Latex from 'react-latex';

type Props = {
    answerType?: Answer;
    answer: string;
    onClick: (id: string) => void;
    mode?: QuizMode;
    id: string;
};

const xsSize = 12;
const smSize = 6;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: `${theme.spacing(0)}px`,
            textAlign: 'center',
            width: '100%',
            height: '100%'
        },
        button: {
            padding: `${theme.spacing(3)}px`,
            width: '100%',
            textTransform: 'none',
            fontWeight: 'bolder',
            height: '100%'
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
        setAdditionalStyle(props, style, styles);
    }
    return (
        <Grid xs={xsSize} sm={smSize} item>
            <Paper className={style.join(' ')}>
                <ButtonBase
                    onClick={() => props.onClick(props.id)}
                    className={styles.button}
                >
                    <Latex displayMode={true}>
                        {props.answer ? `$$${props.answer}$$` : ''}
                    </Latex>
                </ButtonBase>
            </Paper>
        </Grid>
    );
};

export default QuizAnswer;

function setAdditionalStyle(
    props: Props,
    style: string[],
    styles: Record<'button' | 'paper' | 'correctAnswer' | 'wrongAnswer', string>
) {
    if (props.answerType === Answer.Right) {
        style.push(styles.correctAnswer);
    } else if (props.answerType === Answer.Wrong) {
        style.push(styles.wrongAnswer);
    }
}
