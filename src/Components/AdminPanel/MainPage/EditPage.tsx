import React, { Component, Fragment, ComponentState } from 'react';
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
    AddTopicActionType,
    ExtendedEquationWithId,
    FetchEquationActionType
} from '../../../store/types/Equations';
import {
    addEquation,
    fetchAllSubjects,
    addSubject,
    fetchAllTopics,
    addTopic,
    fetchEquation
} from '../../../store/actions/Equations';
import { connect } from 'react-redux';
import styles from './MainPage.module.sass';
import AddIcon from '@material-ui/icons/Add';
import FormInput from '../FormInput/FormInput';
import FormSelect from '../FormSelect/FormSelect';
import { onChangeType } from '../../../types/admin';
import { RootReducer } from '../../../store/types/main';
import AddDialog from '../AddDialog/AddDialog';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { mapEqState } from '../../../utils/StatesPropsToMap';

interface Props extends RouteComponentProps {
    equations: ExtendedEquationWithId[];
    subjects: SubjectWithId[];
    topics: ExtendedTopicWithId[];
    url: string;
    addEquation: (equation: ExtendedEquation) => AddEquationActionType;
    fetchAllSubjects: () => FetchAllSubjectsActionType;
    addSubject: (subject: Subject) => AddSubjectActionType;
    fetchAllTopics: (subjectRef: string) => FetchAllTopicsActionType;
    addTopic: (topic: ExtendedTopic) => AddTopicActionType;
    fetchEquation: (id: string) => FetchEquationActionType;
}

type params = { id: string };

interface State {
    subjectDialogState: boolean;
    topicDialogState: boolean;
    subjectValue: string;
    topicValue: string;
    equationId?: string;
    mode: Mode;
    explanation: string;
    equation: string;
}

enum Mode {
    Edit,
    Add
}

type inputTypes = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;

class MainPage extends Component<Props, State> {
    state: State = {
        subjectDialogState: false,
        subjectValue: '',
        topicValue: '',
        topicDialogState: false,
        mode: Mode.Add,
        equation: '',
        explanation: ''
    };

    componentDidMount() {
        this.props.fetchAllSubjects();
        const equationId = (this.props.match.params as params).id;
        if (equationId) {
            this.setState({
                mode: Mode.Edit,
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
                subjectValue: equation.subjectRef,
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
        this.props.addEquation(equation);
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
            subjectRef: this.state.subjectValue
        };
        this.props.addTopic(topic);
    };

    private setTopic() {
        const equation = this.props.equations.find(
            equation => equation.id === this.state.equationId
        );
        if (equation) {
            this.setState({ topicValue: equation.topicRef });
        }
    }

    private setValueOrOpenDialog(
        value: string,
        lastItemAction: string | undefined,
        fieldToUpdate: keyof State
    ) {
        if (value === lastItemAction) {
            this.setState({ [fieldToUpdate]: true } as ComponentState);
        } else {
            this.setSubjectOrTopic(fieldToUpdate, value);
        }
    }

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
        const fieldToUpdate = field as keyof State;
        this.setState(
            prevState =>
                ({
                    [fieldToUpdate]: !prevState[fieldToUpdate]
                } as ComponentState)
        );
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
                        value={this.state.subjectValue}
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
                        value={this.state.topicValue}
                        name="topicRef"
                        id="topic"
                        lastItem={topicLastItem}
                        label="Tematy"
                        onValueChange={(e: onChangeType) =>
                            this.onSelectChange(e, 'add_topic')
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
    addTopic: (topic: ExtendedTopic) => dispatch(addTopic(topic)),
    fetchEquation: (id: string) => dispatch(fetchEquation(id))
});

export default withRouter(connect(mapEqState, mapDispatchToProps)(MainPage));
