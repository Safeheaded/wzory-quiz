import React, { Component, Fragment, ComponentState } from 'react';
import MathInput from '../MathInput/MathInput';
import { MenuItem, Grid } from '@material-ui/core';
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
    ExtendedTopic,
    AddTopic,
    FetchTopics
} from '../../../store/types/Topics';
import { fetchAllSubjects, addSubject } from '../../../store/actions/Subjects';
import { addTopic, fetchTopics } from '../../../store/actions/Topics';
import Explanations from './Explanations/Explanations';

export interface Props extends RouteComponentProps, EqStateProps {
    url: string;
    addEquation: (equation: ExtendedEquation) => AddEquation;
    fetchAllSubjects: () => FetchAllSubjects;
    addSubject: (subject: Subject) => AddSubject;
    fetchTopics: (subjectRef: string) => FetchTopics;
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
    explanations: string[];
    equation: string;
    name: string;
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
        explanations: [],
        name: ''
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
            this.props.fetchTopics(equation.subjectRef);
            this.setState({
                subjectRef: equation.subjectRef,
                equation: equation.equation,
                topicRef: equation.topicRef,
                name: equation.name,
                explanations: equation.explanations
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
    }

    onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const equation: ExtendedEquation = {
            name: data.get('name') as string,
            equation: (data.get('equation') as string) || '',
            subjectRef: data.get('subjectRef') as string,
            topicRef: data.get('topicRef') as string,
            explanations: this.state.explanations
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
            this.props.fetchTopics(subject.id);
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

    private addExplanationHandler = (explanation: string) => {
        this.setState({
            explanations: [...this.state.explanations, explanation]
        });
    };

    private deleteExplanationHandler = (index: number) => {
        const newExplanations = this.state.explanations.filter(
            (explanation, eqIndex) => index !== eqIndex
        );
        this.setState({ explanations: newExplanations });
    };

    explanationChangeHandler = (value: string, index: number) => {
        const newExplanations = [...this.state.explanations];
        newExplanations[index] = value;
        this.setState({ explanations: newExplanations });
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

        const topics = this.props.topics.filter(
            topic => topic.subjectRef === this.state.subjectRef
        );

        return (
            <Fragment>
                <form
                    className={styles.Form}
                    onSubmit={e => this.onSubmitHandler(e)}
                >
                    <Grid container spacing={3}>
                        <Grid item sm={6} xs={12} md={5} lg={3}>
                            <MathInput
                                value={this.state.equation}
                                onValueChange={(e: onChangeType) =>
                                    this.onSelectChange(e)
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} lg={3}>
                            <FormInput
                                label="Nazwa równania"
                                fullWidth
                                name="name"
                                onValueChange={(e: onChangeType) =>
                                    this.onSelectChange(e)
                                }
                                value={this.state.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3} lg={3}>
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
                        </Grid>

                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <FormSelect
                                value={this.state.topicRef}
                                name="topicRef"
                                id="topic"
                                lastItem={topicLastItem}
                                label="Tematy"
                                onValueChange={(e: onChangeType) =>
                                    this.onSelectChange(e, 'add_topic')
                                }
                                values={topics}
                                disabled={
                                    this.state.subjectRef === '' ? true : false
                                }
                            />
                        </Grid>
                        <Grid md={6} sm={6} item xs={12} lg={12}>
                            <Explanations
                                deleteExplanationHandler={
                                    this.deleteExplanationHandler
                                }
                                addExplanationHandler={
                                    this.addExplanationHandler
                                }
                                explanations={this.state.explanations}
                                changeExplanationHandler={
                                    this.explanationChangeHandler
                                }
                            />
                        </Grid>

                        <Grid item>
                            <FormActions
                                secondaryButtonAction={
                                    this.deleteEquationHandler
                                }
                                mode={this.state.mode}
                            />
                        </Grid>
                    </Grid>
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
    fetchTopics: (subjectRef: string) => dispatch(fetchTopics(subjectRef)),
    addTopic: (topic: ExtendedTopic) => dispatch(addTopic(topic)),
    fetchEquation: (id: string) => dispatch(fetchEquation(id)),
    updateEquation: (equation: ExtendedEquationWithId) =>
        dispatch(updateEquation(equation)),
    deleteEquation: (id: string) => dispatch(deleteEquation(id))
});

export default withRouter(connect(mapEqState, mapDispatchToProps)(EditPage));
