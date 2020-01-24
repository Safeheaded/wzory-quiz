import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Typography
} from '@material-ui/core';
import { ExtendedEquationWithId } from '../../../../store/types/Equations';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Latex from 'react-latex';

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
            <DialogTitle>{equation ? equation.explanation : ''}</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ lineHeight: '120%' }}>
                    <Latex>{equation ? `$${equation.equation}$` : ''}</Latex>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default withRouter(EquationDialog);
