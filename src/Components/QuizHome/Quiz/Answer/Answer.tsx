import React from 'react';
import { Answer } from '../../../../types/General';
import { Grid, Button, Paper } from '@material-ui/core';
import { useStyles } from '../Quiz';
import MathJax from 'react-mathjax2';

interface Props {
    answerType: Answer;
    answer: string;
}

const xsSize = 12;
const smSize = 6;

const QuizAnswer: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    return (
        <Grid xs={xsSize} sm={smSize} item>
            <Button className={styles.button}>
                <Paper className={styles.paper}>
                    <MathJax.Context
                        options={{
                            menuSettings: { inTabOrder: false }
                        }}
                    >
                        <MathJax.Node inline>(1+3)/4</MathJax.Node>
                    </MathJax.Context>
                </Paper>
            </Button>
        </Grid>
    );
};

export default QuizAnswer;
