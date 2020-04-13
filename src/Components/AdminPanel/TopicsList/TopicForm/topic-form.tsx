import React from 'react';
import { DialogContent } from '@material-ui/core';
import { Formik, FormikProps, Form } from 'formik';
import { topicSchema } from '../../../../utils/validationSchemas';
import FormSelect from '../../FormSelect/FormSelect';
import FormInput from '../../FormInput/FormInput';
import { SubjectWithId } from '../../../../store/types/Subjects';
import styles from './topic-form.module.sass';
import EditDialogActions from '../../EditList/EditDialog/EditDialogActions/edit-dialog-actions';
import { ExtendedTopicWithId } from '../../../../store/types/Topics';
import { useDispatch } from 'react-redux';
import { updateValues } from '../../../../utils/objects-helpers';
import {
    updateTopic,
    addTopic,
    deleteTopic
} from '../../../../store/actions/Topics';

type Props = { subjects: SubjectWithId[]; topic?: ExtendedTopicWithId };
type FormValues = {} & typeof initialValues;

const initialValues = { name: '', subjectRef: '' };

const TopicForm = (props: Props) => {
    const { subjects, topic } = props;
    const id = topic?.id;
    const dispatch = useDispatch();
    let values = initialValues;
    if (topic) {
        values = updateValues(initialValues, topic);
    } else {
        values = initialValues;
    }

    const onSubmitHandler = (values: FormValues) => {
        const topic = { ...values, id } as ExtendedTopicWithId;
        if (id) {
            dispatch(updateTopic(topic));
        } else {
            delete topic.id;
            dispatch(addTopic(topic));
        }
    };

    const deleteTopicHandler = (id: string) => {
        dispatch(deleteTopic(id));
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={values}
            validationSchema={topicSchema()}
            onSubmit={val => onSubmitHandler(val)}
        >
            {({
                handleChange,
                handleBlur,
                errors,
                values,
                isValid
            }: FormikProps<FormValues>) => (
                <Form className={styles.dialogContent}>
                    <DialogContent className={styles.dialogContent}>
                        <FormSelect
                            values={subjects}
                            label="Przedmiot"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.subjectRef}
                            name="subjectRef"
                            error={!!errors.subjectRef}
                        />
                        <FormInput
                            label="Nazwa"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </DialogContent>
                    <EditDialogActions
                        isValid={isValid}
                        secondaryAction={deleteTopicHandler}
                        id={id}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default TopicForm;
