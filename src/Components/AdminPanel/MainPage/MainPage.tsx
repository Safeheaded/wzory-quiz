import React, { Component, Fragment, FormEvent } from 'react';
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
    FormLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import { Dispatch } from 'redux';
import {
    Equation,
    AddEquationActionType,
    ExtendedEquation,
    FetchAllSubjectsActionType,
    SubjectWithId,
    Subject,
    AddSubjectActionType
} from '../../../store/types/Equations';
import {
    addEquation,
    fetchAllSubjects,
    addSubject
} from '../../../store/actions/Equations';
import { connect } from 'react-redux';
import styles from './MainPage.module.sass';
import AddIcon from '@material-ui/icons/Add';
import FormInput from '../FormInput/FormInput';
import FormSelect from '../FormSelect/FormSelect';
import { onChangeType } from '../../../types/admin';
import { RootReducer } from '../../../store/types/main';

interface Props {
    addEquation: (equation: ExtendedEquation) => AddEquationActionType;
    fetchAllSubjects: () => FetchAllSubjectsActionType;
    subjects: SubjectWithId[];
    addSubject: (subject: Subject) => AddSubjectActionType;
}

interface State {
    subjectDialogState: boolean;
    subjectValue: string;
    topicValue: string;
}

type inputValuesType = 'subjectValue' | 'topicValue';
type inputTypes = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;

class MainPage extends Component<Props, State> {
    state: State = {
        subjectDialogState: false,
        subjectValue: '',
        topicValue: ''
    };

    componentDidMount() {
        this.props.fetchAllSubjects();
    }

    onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const equation: ExtendedEquation = {
            equation: data.get('equation') as string,
            explanation: data.get('explanation') as string,
            subjectRef: 'subRef',
            topicRef: 'topicRef'
        };
        this.props.addEquation(equation);
    };

    addSubjectHandler = () => {
        this.setState({ subjectDialogState: true });
    };

    onSubjectDialogClose = () => {
        this.setState({ subjectDialogState: false });
    };

    onChangeHandler = (e: onChangeType, field: inputValuesType) => {
        const value = (e.target as inputTypes).value;
        if (value === 'add_subject') {
            this.setState({ subjectDialogState: true });
        } else {
            this.setState({ [field as 'subjectValue']: value });
        }
    };

    onAddSubject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const subject: Subject = { name: data.get('name') as string };
        this.props.addSubject(subject);
    };

    render() {
        const subjectLastItem = (
            <MenuItem value="add_subject">
                Dodaj przedmiot <AddIcon />
            </MenuItem>
        );

        return (
            <Fragment>
                <form
                    className={styles.Form}
                    onSubmit={e => this.onSubmitHandler(e)}
                >
                    <MathInput />
                    <FormInput
                        label="Znaczenie równania"
                        rows="5"
                        fullWidth
                        multiline
                        name="explanation"
                    />
                    <FormSelect
                        value={this.state.subjectValue}
                        name="subjectRef"
                        id="subject"
                        lastItem={subjectLastItem}
                        label="Przedmioty"
                        onValueChange={this.onChangeHandler}
                        stateValue="subjectValue"
                        defaultValue="add_subject"
                        values={this.props.subjects}
                    />

                    {/* <FormSelect
                        name="topicRef"
                        id="topic"
                        lastItem={<MenuItem value="Test">Test</MenuItem>}
                        label="Tematy"
                        onValueChange={this.onChangeHandler}
                        stateValue="topicValue"
                        disabled
                    /> */}

                    <FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Wyślij
                        </Button>
                    </FormControl>
                </form>
                <Dialog
                    onClose={this.onSubjectDialogClose}
                    open={this.state.subjectDialogState}
                >
                    <DialogTitle>Dodaj przedmiot</DialogTitle>
                    <form onSubmit={e => this.onAddSubject(e)}>
                        <DialogContent>
                            <TextField
                                label="Przedmiot"
                                type="text"
                                autoFocus
                                name="name"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button>Anuluj</Button>
                            <Button type="submit">Dodaj</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addEquation: (equation: ExtendedEquation) =>
        dispatch(addEquation(equation)),
    fetchAllSubjects: () => dispatch(fetchAllSubjects()),
    addSubject: (subject: Subject) => dispatch(addSubject(subject))
});

const mapStateToProps = (state: RootReducer) => ({
    subjects: state.eqReducer.subjects
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
