import React from 'react';
import { Grid, Paper, Typography, Button, Theme } from '@material-ui/core';
import MathJax from 'react-mathjax2';
import { makeStyles, createStyles } from '@material-ui/styles';
import QuizAnswer from './Answer/Answer';
import { Answer } from '../../../types/General';

interface Props {}

export const useStyles = makeStyles((theme: Theme) =>
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

const Quiz: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={styles.paper}>
                    <Typography variant="h4">Kwadrat sumy</Typography>
                </Paper>
            </Grid>
            <QuizAnswer answer="test" answerType={Answer.Wrong} />
        </Grid>
    );
};

export default Quiz;
