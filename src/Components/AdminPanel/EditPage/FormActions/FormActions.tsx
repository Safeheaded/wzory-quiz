import React, { Fragment } from 'react';
import { WriteMode } from '../../../../types/admin';
import { FormControl, Button } from '@material-ui/core';

interface Props {
    mode: WriteMode;
}

const FormActions: React.FC<Props> = (props: Props) => {
    const deleteButton =
        props.mode === WriteMode.Edit ? (
            <FormControl>
                <Button>Usuń</Button>
            </FormControl>
        ) : null;

    return (
        <Fragment>
            <FormControl>
                <Button variant="contained" color="primary" type="submit">
                    {props.mode === WriteMode.Add ? 'Dodaj' : 'Edytuj'}
                </Button>
            </FormControl>
            {deleteButton}
        </Fragment>
    );
};

export default FormActions;
