import React, { Component, Fragment, FormEvent } from 'react';
import MathInput from '../MathInput/MathInput';
import {
    Button,
    TextField,
    MenuItem,
    FormControl,
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
    AddSubjectActionType,
    ExtendedTopicWithId,
    FetchAllTopicsActionType,
    ExtendedTopic,
    AddTopicActionType
} from '../../../store/types/Equations';
import {
    addEquation,
    fetchAllSubjects,
    addSubject,
    fetchAllTopics,
    addTopic
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
    topics: ExtendedTopicWithId[];
    fetchAllTopics: (subjectRef: string) => FetchAllTopicsActionType;
    addTopic: (topic: ExtendedTopic) => AddTopicActionType;
}

interface State {
    subjectDialogState: boolean;
    topicDialogState: boolean;
    subjectValue: string;
    topicValue: string;
}
type inputTypes = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;

class MainPage extends Component<Props, State> {
    state: State = {
        subjectDialogState: false,
        subjectValue: '',
        topicValue: '',
        topicDialogState: false
    };

    componentDidMount() {
        this.props.fetchAllSubjects();
    }

    onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const equation: ExtendedEquation = {
            equation: data.get('equation') as string,
            explanation: data.get('explanation') as string,
            subjectRef: data.get('subjectRef') as string,
            topicRef: data.get('topicRef') as string
        };
        this.props.addEquation(equation);
    };

    addSubjectHandler = () => {
        this.setState({ subjectDialogState: true });
    };

    onSubjectDialogClose = () => {
        this.setState({ subjectDialogState: false });
    };

    onTopicDialogClose = () => {
        this.setState({ topicDialogState: false });
    };

    onSubjectChange = (event: onChangeType) => {
        const value = (event.target as inputTypes).value;
        if (value === 'add_subject') {
            this.setState({ subjectDialogState: true });
        } else {
            const subject: SubjectWithId | undefined = this.props.subjects.find(
                subject => subject.id === value
            );
            if (subject) {
                this.props.fetchAllTopics(subject.id);
            }
            this.setState({ subjectValue: value });
        }
    };

    onTopicChange = (event: onChangeType) => {
        const value = (event.target as inputTypes).value;
        if (value === 'add_topic') {
            this.setState({ topicDialogState: true });
        } else {
            if (value === 'add_topic') {
                this.setState({ topicDialogState: true });
            } else {
                this.setState({ topicValue: value });
            }
        }
    };

    onAddSubject = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const subject: Subject = { name: data.get('name') as string };
        this.props.addSubject(subject);
    };

    onAddTopic = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const topic: ExtendedTopic = {
            name: data.get('name') as string,
            subjectRef: this.state.subjectValue
        };
        this.props.addTopic(topic);
    };

    render() {
        const subjectLastItem = (
            <MenuItem value="add_subject">
                Dodaj przedmiot <AddIcon />
            </MenuItem>
        );

        const topicLastItem = (
            <MenuItem value="add_topic">
                Dodaj temat <AddIcon />
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
                        onValueChange={this.onSubjectChange}
                        values={this.props.subjects}
                    />

                    <FormSelect
                        value={this.state.topicValue}
                        name="topicRef"
                        id="topic"
                        lastItem={topicLastItem}
                        label="Tematy"
                        onValueChange={this.onTopicChange}
                        values={this.props.topics}
                        disabled={this.state.subjectValue === '' ? true : false}
                    />

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
                            <Button
                                onClick={() =>
                                    this.setState({ subjectDialogState: false })
                                }
                            >
                                Anuluj
                            </Button>
                            <Button type="submit">Dodaj</Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Dialog
                    onClose={this.onTopicDialogClose}
                    open={this.state.topicDialogState}
                >
                    <DialogTitle>Dodaj przedmiot</DialogTitle>
                    <form onSubmit={e => this.onAddTopic(e)}>
                        <DialogContent>
                            <TextField
                                label="Temat"
                                type="text"
                                autoFocus
                                name="name"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() =>
                                    this.setState({ topicDialogState: false })
                                }
                            >
                                Anuluj
                            </Button>
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
    addSubject: (subject: Subject) => dispatch(addSubject(subject)),
    fetchAllTopics: (subjectRef: string) =>
        dispatch(fetchAllTopics(subjectRef)),
    addTopic: (topic: ExtendedTopic) => dispatch(addTopic(topic))
});

const mapStateToProps = (state: RootReducer) => ({
    subjects: state.eqReducer.subjects,
    topics: state.eqReducer.topics
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
