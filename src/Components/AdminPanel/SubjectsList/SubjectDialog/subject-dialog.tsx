import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';

type Props = {
    children?: import('react').ReactElement;
    isOpen: boolean;
    title: string;
    redirectPath: string;
};

const SubjectDialog = (props: Props) => {
    const { isOpen, title, redirectPath, children } = props;

    const history = useHistory();

    const onCloseHandler = () => {
        history.push(redirectPath);
    };

    return (
        <Dialog onClose={onCloseHandler} open={isOpen}>
            <DialogTitle>{title}</DialogTitle>
            {children}
        </Dialog>
    );
};

export default SubjectDialog;
