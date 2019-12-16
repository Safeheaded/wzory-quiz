import React from 'react';
import MathInput from '../MathInput/MathInput';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormGroup,
    Divider,
    FormHelperText,
    FormLabel
} from '@material-ui/core';
import { Dispatch } from 'redux';
import {
    Equation,
    AddEquationActionType,
    ExtendedEquation
} from '../../../store/types/Equations';
import { addEquation } from '../../../store/actions/Equations';
import { connect } from 'react-redux';
import styles from './MainPage.module.sass';

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
            subjectRef: 'subRef',
            topicRef: 'topicRef'
        };
        props.addEquation(equation);
    };

    return (
        <form className={styles.Form} onSubmit={e => onSubmitHandler(e)}>
            <FormControl>
                <MathInput />
            </FormControl>
            <FormControl>
                <TextField
                    label="Znaczenie równania"
                    rows="5"
                    fullWidth
                    multiline
                    name="explanation"
                />
            </FormControl>
            <FormControl>
                <InputLabel id="subject-label">Przedmiot</InputLabel>
                <Select labelId="subject-label" id="subject">
                    <MenuItem value="Test">Test</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="topic-label">Temat</InputLabel>
                <Select labelId="topic-label" id="topic">
                    <MenuItem value="Test">Test</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" type="submit">
                    Wyślij
                </Button>
            </FormControl>
        </form>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addEquation: (equation: ExtendedEquation) => dispatch(addEquation(equation))
});

export default connect(null, mapDispatchToProps)(MainPage);
