import React, { Fragment } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Typography,
    ListItem,
    List,
    Divider
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

    const explanations = equation?.explanations.map((explanation, index) => (
        <Fragment key={index}>
            <ListItem>
                <Typography>
                    <Latex>{explanation}</Latex>
                </Typography>
            </ListItem>
            <Divider />
        </Fragment>
    ));

    return (
        <Dialog onClose={onCloseHandler} open={equation ? true : false}>
            <DialogTitle>{equation?.name || ''}</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ lineHeight: '120%' }}>
                    <Latex>{equation ? `$${equation.equation}$` : ''}</Latex>
                </DialogContentText>
                {equation?.explanations.length !== 0 ? (
                    <DialogContentText variant="h6">
                        Oznaczenia:
                    </DialogContentText>
                ) : null}
                <List>{explanations}</List>
            </DialogContent>
        </Dialog>
    );
};

export default withRouter(EquationDialog);
