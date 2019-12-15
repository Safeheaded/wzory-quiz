import React from 'react';
import MathInput from '../MathInput/MathInput';
import { Button, TextField } from '@material-ui/core';
import { Dispatch } from 'redux';
import {
    Equation,
    AddEquationActionType,
    ExtendedEquation
} from '../../../store/types/Equations';
import { addEquation } from '../../../store/actions/Equations';
import { connect } from 'react-redux';

interface Props {
    addEquation: (equation: ExtendedEquation) => AddEquationActionType;
}

const MainPage: React.SFC<Props> = (props: Props) => {
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const equation: ExtendedEquation = {
            equation: data.get('equation') as string,
            explanation: data.get('explanation') as string,
            subjectRef: '',
            topicRef: ''
        };
        props.addEquation(equation);
    };

    return (
        <form onSubmit={e => onSubmitHandler(e)}>
            <MathInput />
            <TextField
                label="Znaczenie równania"
                rows="5"
                fullWidth
                multiline
                name="explanation"
            />
            <Button type="submit">Wyślij</Button>
        </form>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addEquation: (equation: ExtendedEquation) => dispatch(addEquation(equation))
});

export default connect(null, mapDispatchToProps)(MainPage);
