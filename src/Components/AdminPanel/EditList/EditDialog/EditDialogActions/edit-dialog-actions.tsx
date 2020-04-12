import React from 'react';
import { DialogActions, Button } from '@material-ui/core';

type Props = {
    id?: string;
    secondaryAction: (id: string) => void;
    isValid: boolean;
};

const EditDialogActions = (props: Props) => {
    const { id, secondaryAction, isValid } = props;
    return (
        <DialogActions>
            <Button
                variant="contained"
                type="submit"
                disabled={!isValid}
                color="primary"
            >
                {id ? 'Edytuj' : 'Dodaj'}
            </Button>
            {id ? (
                <Button onClick={() => secondaryAction(id)}>Usuń</Button>
            ) : null}
        </DialogActions>
    );
};

export default EditDialogActions;
