import React, { Component, Fragment, ComponentState } from 'react';
import MathInput from '../MathInput/MathInput';
import { MenuItem } from '@material-ui/core';
import { Dispatch } from 'redux';
import {
    AddEquation,
    ExtendedEquation,
    ExtendedEquationWithId,
    FetchEquation,
    UpdateEquation,
    DeleteEquation
} from '../../../store/types/Equations';
import {
    fetchEquation,
    updateEquation,
    addEquation,
    deleteEquation
} from '../../../store/actions/Equations';
import { connect } from 'react-redux';
import styles from './MainPage.module.sass';
import AddIcon from '@material-ui/icons/Add';
import FormInput from '../FormInput/FormInput';
import FormSelect from '../FormSelect/FormSelect';
import { onChangeType, WriteMode } from '../../../types/admin';
import AddDialog from '../AddDialog/AddDialog';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { mapEqState, EqStateProps } from '../../../utils/StatesPropsToMap';
import FormActions from './FormActions/FormActions';
import {
    SubjectWithId,
    FetchAllSubjects,
    Subject,
    AddSubject
} from '../../../store/types/Subjects';
import {
    ExtendedTopicWithId,
    FetchAllTopics,
    ExtendedTopic,
    AddTopic
} from '../../../store/types/Topics';
import { fetchAllSubjects, addSubject } from '../../../store/actions/Subjects';
import { fetchAllTopics, addTopic } from '../../../store/actions/Topics';

export interface Props extends RouteComponentProps, EqStateProps {
    url: string;
    addEquation: (equation: ExtendedEquation) => AddEquation;
    fetchAllSubjects: () => FetchAllSubjects;
    addSubject: (subject: Subject) => AddSubject;
    fetchAllTopics: (subjectRef: string) => FetchAllTopics;
    addTopic: (topic: ExtendedTopic) => AddTopic;
    fetchEquation: (id: string) => FetchEquation;
    updateEquation: (equation: ExtendedEquationWithId) => UpdateEquation;
    deleteEquation: (id: string) => DeleteEquation;
}

type params = { id: string };

export interface State {
    subjectDialogState: boolean;
    topicDialogState: boolean;
    subjectRef: string;
    topicRef: string;
    equationId?: string;
    mode: WriteMode;
    explanation: string;
    equation: string;
}

type inputTypes = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;

export class EditPage extends Component<Props, State> {
    state: State = {
        subjectDialogState: false,
        subjectRef: '',
        topicRef: '',
        topicDialogState: false,
        mode: WriteMode.Add,
        equation: '',
        explanation: ''
    };

    componentDidMount() {
        this.props.fetchAllSubjects();
        const equationId = (this.props.match.params as params).id;
        if (equationId) {
            this.setState({
                mode: WriteMode.Edit,
                equationId
            });
            this.extractEquation(equationId);
        }
    }

    private extractEquation(equationId: string) {
        if (this.props.equations.length === 0) {
            this.props.fetchEquation(equationId);
        } else {
            this.getEquation(equationId);
        }
    }

    private getEquation(equationId: string) {
        const equation = this.findEquation(equationId);
        this.handleEquationData(equation);
    }

    private handleEquationData(equation: ExtendedEquationWithId | undefined) {
        if (equation) {
            this.props.fetchAllTopics(equation.subjectRef);
            this.setState({
                subjectRef: equation.subjectRef,
                explanation: equation.explanation,
                equation: equation.equation
            });
        }
    }

    private findEquation(equationId: string) {
        return this.props.equations.find(
            equation => equation.id === equationId
        );
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        const equationFetched = prevProps.equations !== this.props.equations;
        if (equationFetched && prevState.equationId) {
            this.getEquation(prevState.equationId);
        }
        if (prevProps.topics !== this.props.topics) {
            this.setTopic();
        }
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
        if (this.state.mode === WriteMode.Add) {
            this.props.addEquation(equation);
        } else {
            this.props.updateEquation({
                ...equation,
                id: this.state.equationId as string
            });
        }
    };

    addSubjectHandler = () => {
        this.setState({ subjectDialogState: true });
    };

    onSelectChange = (event: onChangeType, lastItemValue?: string) => {
        const value = (event.target as inputTypes).value;
        const target = (event.target as inputTypes).name as keyof State;
        if (lastItemValue) {
            this.setValueOrOpenDialog(value, lastItemValue, target);
        } else {
            this.setState({ [target]: value } as ComponentState);
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
            subjectRef: this.state.subjectRef
        };
        this.props.addTopic(topic);
    };

    private setTopic() {
        const equation = this.props.equations.find(
            equation => equation.id === this.state.equationId
        );
        if (equation) {
            this.setState({ topicRef: equation.topicRef });
        }
    }

    private setValueOrOpenDialog(
        value: string,
        lastItemValue: string | undefined,
        fieldToUpdate: keyof State
    ) {
        const dialog =
            lastItemValue === 'add_subject'
                ? 'subjectDialogState'
                : 'topicDialogState';
        if (value === lastItemValue) {
            this.setState({ [dialog]: true } as ComponentState);
        } else {
            this.setSubjectOrTopic(fieldToUpdate, value);
        }
    }

    private setSubjectOrTopic(fieldToUpdate: string, value: string) {
        if (fieldToUpdate === 'subjectRef') {
            this.updateSubject(value);
        } else {
            this.setState({ topicRef: value });
        }
    }

    private updateSubject(value: string) {
        const subject: SubjectWithId | undefined = this.props.subjects.find(
            subject => subject.id === value
        );
        if (subject) {
            this.props.fetchAllTopics(subject.id);
        }
        this.setState({ subjectRef: value });
    }

    toggleDialog = (field: string) => {
        const fieldToUpdate = field as keyof State;
        this.setState(
            prevState =>
                ({
                    [fieldToUpdate]: !prevState[fieldToUpdate]
                } as ComponentState)
        );
    };

    deleteEquationHandler = () => {
        this.props.deleteEquation(this.state.equationId as string);
        this.props.history.replace('/admin');
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
                    <MathInput
                        value={this.state.equation}
                        onValueChange={(e: onChangeType) =>
                            this.onSelectChange(e)
                        }
                    />
                    <FormInput
                        label="Znaczenie równania"
                        rows="5"
                        fullWidth
                        multiline
                        name="explanation"
                        onValueChange={(e: onChangeType) =>
                            this.onSelectChange(e)
                        }
                        value={this.state.explanation}
                    />
                    <FormSelect
                        value={this.state.subjectRef}
                        name="subjectRef"
                        id="subject"
                        lastItem={subjectLastItem}
                        label="Przedmioty"
                        onValueChange={(e: onChangeType) =>
                            this.onSelectChange(e, 'add_subject')
                        }
                        values={this.props.subjects}
                    />

                    <FormSelect
                        value={this.state.topicRef}
                        name="topicRef"
                        id="topic"
                        lastItem={topicLastItem}
                        label="Tematy"
                        onValueChange={(e: onChangeType) =>
                            this.onSelectChange(e, 'add_topic')
                        }
                        values={this.props.topics}
                        disabled={this.state.subjectRef === '' ? true : false}
                    />

                    <FormActions
                        secondaryButtonAction={this.deleteEquationHandler}
                        mode={this.state.mode}
                    />
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
    addTopic: (topic: ExtendedTopic) => dispatch(addTopic(topic)),
    fetchEquation: (id: string) => dispatch(fetchEquation(id)),
    updateEquation: (equation: ExtendedEquationWithId) =>
        dispatch(updateEquation(equation)),
    deleteEquation: (id: string) => dispatch(deleteEquation(id))
});

export default withRouter(connect(mapEqState, mapDispatchToProps)(EditPage));
