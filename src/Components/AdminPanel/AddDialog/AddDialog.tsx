import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';

interface Props {
    title: string;
    stateField: boolean;
    onSubmit: Function;
    toggleDialog: Function;
    label: string;
}

const AddDialog: React.SFC<Props> = (props: Props) => {
    return (
        <Dialog open={props.stateField} onClose={() => props.toggleDialog()}>
            <DialogTitle>{props.title}</DialogTitle>
            <form onSubmit={e => props.onSubmit(e)}>
                <DialogContent>
                    <TextField
                        label={props.label}
                        type="text"
                        autoFocus
                        name="name"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.toggleDialog()}>Anuluj</Button>
                    <Button type="submit">Dodaj</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddDialog;
