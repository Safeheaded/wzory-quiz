import React, { Component, Fragment, ComponentState } from 'react';
import MathInput from '../MathInput/MathInput';
import { MenuItem, Grid, CircularProgress } from '@material-ui/core';
import { Dispatch } from 'redux';
import {
    ExtendedEquation,
    ExtendedEquationWithId
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
import { SelectChangeEvent, WriteMode } from '../../../types/admin';
import AddDialog from '../AddDialog/AddDialog';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { mapEqState, EqStateProps } from '../../../utils/StatesPropsToMap';
import FormActions from './FormActions/FormActions';
import { SubjectWithId, Subject } from '../../../store/types/Subjects';
import { ExtendedTopic } from '../../../store/types/Topics';
import { fetchAllSubjects, addSubject } from '../../../store/actions/Subjects';
import { addTopic, fetchTopics } from '../../../store/actions/Topics';
import Explanations from './Explanations/Explanations';
import SimpleReactValidator from 'simple-react-validator';
import { Formik, FormikProps, Form } from 'formik';
import { EditValues, editSchema } from '../../../utils/validationSchemas';

export interface Props extends RouteComponentProps, EqStateProps {
    url: string;
    addEquation: typeof addEquation;
    fetchAllSubjects: typeof fetchAllSubjects;
    addSubject: typeof addSubject;
    fetchTopics: typeof fetchTopics;
    addTopic: typeof addTopic;
    fetchEquation: typeof fetchEquation;
    updateEquation: typeof updateEquation;
    deleteEquation: typeof deleteEquation;
}

type Params = { id?: string };

export interface State {
    subjectDialogState: boolean;
    topicDialogState: boolean;
    equation?: ExtendedEquationWithId;
    mode: WriteMode;
}

type inputTypes = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;

export class EditPage extends Component<Props, State> {
    state: State = {
        subjectDialogState: false,
        topicDialogState: false,
        mode: WriteMode.Add
    };

    componentDidMount() {
        this.props.fetchAllSubjects();
        this.provideEquation(this.props.equations);
    }

    private provideEquation(equations: ExtendedEquationWithId[]) {
        const equationId = this.getId();
        if (equationId) {
            const equation = equations.find(eq => eq.id === equationId);
            this.getEquationAndFetchTopics(equation, equationId);
        }
    }

    private getEquationAndFetchTopics(
        equation: ExtendedEquationWithId | undefined,
        equationId: string
    ) {
        if (equation) {
            this.props.fetchTopics(equation.subjectRef);
            this.setState({ equation });
        } else {
            this.props.fetchEquation(equationId);
        }
    }

    private getId() {
        return (this.props.match.params as Params).id;
    }

    private getEditMode() {
        return this.getId() ? WriteMode.Edit : WriteMode.Add;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.equations !== this.props.equations) {
            this.provideEquation(this.props.equations);
        }
    }

    onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const equation: ExtendedEquation = this.gatherEquationData(event);
        const editMode = this.getEditMode();
        if (editMode === WriteMode.Add) {
            this.props.addEquation(equation);
        } else {
            this.props.updateEquation({
                ...equation,
                id: this.state.equation?.id as string
            });
        }
    };

    private gatherEquationData(event: React.FormEvent<HTMLFormElement>) {
        const data = new FormData(event.target as HTMLFormElement);
        const explanations = this.sanitizeExplanations();
        const equation: ExtendedEquation = {
            name: data.get('name') as string,
            equation: (data.get('equation') as string) || '',
            subjectRef: data.get('subjectRef') as string,
            topicRef: data.get('topicRef') as string,
            explanations: explanations
        };
        return equation;
    }

    private sanitizeExplanations() {
        return this.state.equation?.explanations.filter(exp => {
            const newExp = exp.trim();
            return newExp.length !== 0;
        }) as string[];
    }

    addSubjectHandler = () => {
        this.setState({ subjectDialogState: true });
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
        //TODO: Add check if this.state.equation exists
        const topic: ExtendedTopic = {
            name: data.get('name') as string,
            subjectRef: this.state.equation?.subjectRef || ''
        };
        this.props.addTopic(topic);
    };

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
        this.props.deleteEquation(this.state.equation?.id as string);
        this.props.history.replace('/admin');
    };

    private addExplanationHandler = (explanation: string) => {
        this.setState({
            equation: {
                ...this.state.equation,
                explanations: [
                    ...this.state.equation?.explanations,
                    explanation
                ]
            } as ExtendedEquationWithId
        });
    };

    private deleteExplanationHandler = (index: number) => {
        const newExplanations = this.state.equation?.explanations.filter(
            (explanation, eqIndex) => index !== eqIndex
        );
        this.setState({
            equation: {
                ...this.state.equation,
                explanations: newExplanations
            } as ExtendedEquationWithId
        });
    };

    explanationChangeHandler = (value: string, index: number) => {
        const newExplanations = [...this.state.equation?.explanations];
        newExplanations[index] = value;
        this.setState({
            equation: {
                ...this.state.equation,
                explanations: newExplanations
            } as ExtendedEquationWithId
        });
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

        const editMode = this.getEditMode();

        const subjects = this.props.subjects;

        const topics = this.props.topics.filter(
            topic => topic.subjectRef === this.state.equation?.subjectRef
        );

        const initValues = {
            name: this.state.equation?.name || '',
            equation: this.state.equation?.equation || '',
            topicRef: this.state.equation?.topicRef || '',
            subjectRef: this.state.equation?.subjectRef || ''
        };

        const areThingsLoading =
            this.state.equation && subjects.length !== 0 && topics.length !== 0
                ? false
                : true;

        const isLoading =
            areThingsLoading && editMode === WriteMode.Edit ? true : false;

        return (
            <Fragment>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Formik
                        initialValues={initValues}
                        onSubmit={() => {}}
                        validationSchema={editSchema()}
                        enableReinitialize={true}
                    >
                        {(formProps: FormikProps<EditValues>) => (
                            <Form onSubmit={e => this.onSubmitHandler(e)}>
                                <Grid container spacing={3}>
                                    <Grid item sm={6} xs={12} md={5} lg={3}>
                                        <MathInput
                                            name="equation"
                                            label="Równanie"
                                            value={formProps.values.equation}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={5} lg={3}>
                                        <FormInput
                                            label="Nazwa równania"
                                            fullWidth
                                            name="name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <FormSelect
                                            fullWidth
                                            name="subjectRef"
                                            id="subject"
                                            lastItem={subjectLastItem}
                                            label="Przedmioty"
                                            values={this.props.subjects}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={3} lg={3}>
                                        <FormSelect
                                            fullWidth
                                            name="topicRef"
                                            id="topic"
                                            lastItem={topicLastItem}
                                            label="Tematy"
                                            values={topics}
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
                                            explanations={
                                                this.state.equation
                                                    ?.explanations || []
                                            }
                                            changeExplanationHandler={
                                                this.explanationChangeHandler
                                            }
                                        />
                                    </Grid>

                                    <Grid item>
                                        <FormActions
                                            mainDisabled={!formProps.isValid}
                                            secondaryButtonAction={
                                                this.deleteEquationHandler
                                            }
                                            mode={editMode}
                                        />
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                )}

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
