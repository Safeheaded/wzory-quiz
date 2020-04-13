import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

type Props = {
    children?: import('react').ReactElement;
    isOpen: boolean;
    title: string;
    redirectPath: string;
};

const EditDialog = (props: Props) => {
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

export default EditDialog;
