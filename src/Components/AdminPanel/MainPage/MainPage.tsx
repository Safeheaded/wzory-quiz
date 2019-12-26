import React, { Component, Fragment, FormEvent } from 'react';
import MathInput from '../MathInput/MathInput';
import { Button, MenuItem, FormControl } from '@material-ui/core';
import { Dispatch } from 'redux';
import {
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
import AddDialog from '../AddDialog/AddDialog';

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

    onSelectChange = (
        event: onChangeType,
        {
            lastItemAction,
            fieldToUpdate
        }: { lastItemAction: string; fieldToUpdate: string }
    ) => {
        const value = (event.target as inputTypes).value;
        if (value === lastItemAction) {
            this.setState({ [fieldToUpdate as 'subjectDialogState']: true });
        } else {
            this.setSubjectOrTopic(fieldToUpdate, value);
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

    private setSubjectOrTopic(fieldToUpdate: string, value: string) {
        if (fieldToUpdate === 'subjectDialogState') {
            this.updateSubject(value);
        } else {
            this.updateTopic(value);
        }
    }

    private updateTopic(value: string) {
        if (value === 'add_topic') {
            this.setState({ topicDialogState: true });
        } else {
            this.setState({ topicValue: value });
        }
    }

    private updateSubject(value: string) {
        const subject: SubjectWithId | undefined = this.props.subjects.find(
            subject => subject.id === value
        );
        if (subject) {
            this.props.fetchAllTopics(subject.id);
        }
        this.setState({ subjectValue: value });
    }

    toggleDialog = (field: string) => {
        const fieldToUpdate = field as
            | 'subjectDialogState'
            | 'topicDialogState';
        this.setState(prevState => ({
            [fieldToUpdate as 'subjectDialogState']: !prevState[
                fieldToUpdate as 'subjectDialogState'
            ]
        }));
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
                        onValueChange={(e: onChangeType) =>
                            this.onSelectChange(e, {
                                lastItemAction: 'add_subject',
                                fieldToUpdate: 'subjectDialogState'
                            })
                        }
                        values={this.props.subjects}
                    />

                    <FormSelect
                        value={this.state.topicValue}
                        name="topicRef"
                        id="topic"
                        lastItem={topicLastItem}
                        label="Tematy"
                        onValueChange={(e: onChangeType) =>
                            this.onSelectChange(e, {
                                lastItemAction: 'add_topic',
                                fieldToUpdate: 'topicDialogState'
                            })
                        }
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

                <AddDialog
                    label="Przedmiot"
                    title="Dodaj przedmiot"
                    toggleDialog={() => this.toggleDialog('subjectDialogState')}
                    stateField={this.state.subjectDialogState}
                    onSubmit={this.onAddSubject}
                />

                <AddDialog
                    label="Temat"
                    title="Dodaj temat"
                    toggleDialog={() => this.toggleDialog('topicDialogState')}
                    stateField={this.state.topicDialogState}
                    onSubmit={this.onAddTopic}
                />
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
