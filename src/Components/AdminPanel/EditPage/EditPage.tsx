import React, { Fragment, useState, useEffect } from 'react';
import MathInput from '../MathInput/MathInput';
import { MenuItem, Grid } from '@material-ui/core';
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
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import FormInput from '../FormInput/FormInput';
import FormSelect from '../FormSelect/FormSelect';
import { WriteMode } from '../../../types/admin';
import AddDialog from '../AddDialog/AddDialog';
import { useParams, useHistory } from 'react-router-dom';
import FormActions from './FormActions/FormActions';
import { Subject, SubjectWithId } from '../../../store/types/Subjects';
import {
    ExtendedTopic,
    ExtendedTopicWithId
} from '../../../store/types/Topics';
import { fetchAllSubjects, addSubject } from '../../../store/actions/Subjects';
import { addTopic, fetchTopics } from '../../../store/actions/Topics';
import Explanations from './Explanations/Explanations';
import { Formik, FormikProps, Form, FormikHelpers } from 'formik';
import { EditValues, editSchema } from '../../../utils/validationSchemas';
import { RootReducer } from '../../../store/types/main';
import { updateValues } from '../../../utils/objects-helpers';

type Props = { url: string };

type Params = { id?: string };

type FormValues = {} & typeof initialValues;

const initialValues = {
    equation: '',
    name: '',
    subjectRef: '',
    topicRef: '',
    explanations: [] as string[]
};

const EditPage = (props: Props) => {
    const { id } = useParams<Params>();
    const history = useHistory();

    const dispatch = useDispatch();

    const subjects = useSelector<RootReducer, SubjectWithId[]>(
        state => state.subjectsReducer.subjects
    );

    const equations = useSelector<RootReducer, ExtendedEquationWithId[]>(
        state => state.eqReducer.equations
    );

    const rawTopics = useSelector<RootReducer, ExtendedTopicWithId[]>(
        state => state.topicsReducer.topics
    );

    const [subjectDialogOpen, setSubjectDialogOpen] = useState(false);
    const [topicDialogOpen, setTopicDialogOpen] = useState(false);
    const [equation, setEquation] = useState<
        ExtendedEquationWithId | undefined
    >();
    const mode = id ? WriteMode.Edit : WriteMode.Add;
    const [topics, setTopics] = useState<ExtendedTopicWithId[]>([]);

    let values: FormValues = initialValues;
    if (equation && mode === WriteMode.Edit) {
        values = updateValues(initialValues, equation);
    } else {
        values = initialValues;
    }

    useEffect(() => {
        dispatch(fetchAllSubjects());
        if (id) {
            dispatch(fetchEquation(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        const equation = equations.find(eq => eq.id === id);
        setEquation(equation);
    }, [equations, id]);

    useEffect(() => {
        if (equation) {
            dispatch(fetchTopics(equation?.subjectRef));
        }
    }, [equation, dispatch]);

    useEffect(() => {
        setTopics(
            rawTopics.filter(topic => topic.subjectRef === equation?.subjectRef)
        );
    }, [rawTopics, equation]);

    const onSubmitHandler = (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        const newEquation: ExtendedEquation = { ...values };
        if (mode === WriteMode.Add) {
            dispatch(addEquation(newEquation));
        } else {
            dispatch(
                updateEquation({
                    ...newEquation,
                    id: equation?.id as string
                })
            );
        }
        actions.resetForm();
    };

    const changeHandler = (
        e: React.ChangeEvent<any>,
        callback: (e: React.ChangeEvent<any>) => void,
        props: FormikProps<EditValues>
    ) => {
        const { name, value } = e.target as HTMLSelectElement;
        if (name === 'subjectRef' && value === 'add_subject') {
            setSubjectDialogOpen(true);
        } else if (name === 'subjectRef') {
            props.setFieldValue('topicRef', '');
            dispatch(fetchTopics(value));
            const newEquation = {
                ...(equation ? equation : {}),
                subjectRef: value,
                topicRef: ''
            } as ExtendedEquationWithId;
            setEquation(newEquation);
            callback(e);
        } else if (name === 'topicRef' && value === 'add_topic') {
            setTopicDialogOpen(true);
        } else {
            callback(e);
        }
    };

    const onAddSubject = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const subject: Subject = { name: data.get('name') as string };
        dispatch(addSubject(subject));
    };

    const onAddTopic = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        if (equation) {
            const topic: ExtendedTopic = {
                name: data.get('name') as string,
                subjectRef: equation.subjectRef
            };
            dispatch(addTopic(topic));
        }
    };

    const deleteEquationHandler = () => {
        dispatch(deleteEquation(equation?.id as string));
        history.replace('/admin');
    };

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
    //TODO: Delete that or add loader
    const isLoaded = true;

    return (
        <Fragment>
            {isLoaded ? (
                <Formik
                    enableReinitialize={true}
                    initialValues={values}
                    onSubmit={(e, actions) => onSubmitHandler(e, actions)}
                    validationSchema={editSchema()}
                >
                    {(formProps: FormikProps<EditValues>) => (
                        <Form>
                            <Grid container spacing={3}>
                                <Grid item sm={6} xs={12} md={5} lg={3}>
                                    <MathInput
                                        name="equation"
                                        label="Równanie"
                                        onChange={formProps.handleChange}
                                        onBlur={formProps.handleBlur}
                                        value={formProps.values.equation}
                                        helperText={formProps.errors.equation}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={5} lg={3}>
                                    <FormInput
                                        label="Nazwa równania"
                                        fullWidth
                                        name="name"
                                        onChange={formProps.handleChange}
                                        onBlur={formProps.handleBlur}
                                        value={formProps.values.name}
                                        helperText={formProps.errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <FormSelect
                                        fullWidth
                                        name="subjectRef"
                                        id="subject"
                                        lastItem={subjectLastItem}
                                        label="Przedmioty"
                                        values={subjects}
                                        value={formProps.values.subjectRef}
                                        onChange={e =>
                                            changeHandler(
                                                e,
                                                formProps.handleChange,
                                                formProps
                                            )
                                        }
                                        onBlur={formProps.handleBlur}
                                        error={!!formProps.errors.subjectRef}
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
                                        disabled={
                                            formProps.values.subjectRef
                                                .length === 0
                                        }
                                        onChange={e =>
                                            changeHandler(
                                                e,
                                                formProps.handleChange,
                                                formProps
                                            )
                                        }
                                        onBlur={formProps.handleBlur}
                                        value={formProps.values.topicRef}
                                        error={!!formProps.errors.topicRef}
                                    />
                                </Grid>
                                <Grid md={6} sm={6} item xs={12} lg={12}>
                                    <Explanations
                                        values={formProps.values.explanations}
                                        onChange={formProps.handleChange}
                                        onBlur={formProps.handleBlur}
                                    />
                                </Grid>

                                <Grid item>
                                    <FormActions
                                        mainDisabled={!formProps.isValid}
                                        secondaryButtonAction={
                                            deleteEquationHandler
                                        }
                                        mode={mode}
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            ) : null}
            <AddDialog
                label="Przedmiot"
                title="Dodaj przedmiot"
                toggleDialog={() => setSubjectDialogOpen(false)}
                stateField={subjectDialogOpen}
                onSubmit={onAddSubject}
            />
            <AddDialog
                label="Temat"
                title="Dodaj temat"
                toggleDialog={() => setTopicDialogOpen(false)}
                stateField={topicDialogOpen}
                onSubmit={onAddTopic}
            />
        </Fragment>
    );
};

export default EditPage;
