import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Typography
} from '@material-ui/core';
import MathJax from 'react-mathjax2';
import { ExtendedEquationWithId } from '../../../../store/types/Equations';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
    equation: ExtendedEquationWithId;
}

type Params = { subjectName: string; topicName: string };

const EquationDialog = (props: Props) => {
    const equation = props.equation ? props.equation : null;

    const onCloseHandler = () => {
        const params: Params = props.match.params as Params;
        props.history.push(`/${params.subjectName}/${params.topicName}`);
    };

    return (
        <Dialog onClose={onCloseHandler} open={equation ? true : false}>
            <DialogTitle>Równanie</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <MathJax.Context>
                        <MathJax.Node>
                            {equation ? equation.equation : ''}
                        </MathJax.Node>
                    </MathJax.Context>
                </DialogContentText>
                <Typography>Wyjaśnienie:</Typography>
                <DialogContentText>
                    {equation ? equation.explanation : ''}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default withRouter(EquationDialog);
