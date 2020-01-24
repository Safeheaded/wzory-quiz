import React, { Fragment } from 'react';
import { WriteMode } from '../../../../types/admin';
import { FormControl, Button } from '@material-ui/core';

interface Props {
    mode: WriteMode;
    secondaryButtonAction: Function;
    mainDisabled: boolean;
}

const FormActions: React.FC<Props> = (props: Props) => {
    const deleteButton =
        props.mode === WriteMode.Edit ? (
            <FormControl>
                <Button onClick={() => props.secondaryButtonAction()}>
                    Usuń
                </Button>
            </FormControl>
        ) : null;

    return (
        <Fragment>
            <FormControl>
                <Button
                    disabled={props.mainDisabled}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    {props.mode === WriteMode.Add ? 'Dodaj' : 'Edytuj'}
                </Button>
            </FormControl>
            {deleteButton}
        </Fragment>
    );
};

export default FormActions;
