import React from 'react';
import { Formik, FormikProps, Form } from 'formik';
import FormInput from '../../FormInput/FormInput';
import { subjectSchema } from '../../../../utils/validationSchemas';
import { DialogActions, Button, DialogContent } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
    updateSubject,
    addSubject,
    deleteSubject
} from '../../../../store/actions/Subjects';
import { SubjectWithId, Subject } from '../../../../store/types/Subjects';

type Props = { subject?: SubjectWithId };
type FormValues = {} & typeof initialValues;

const initialValues = { name: '' };

const SubjectForm = (props: Props) => {
    const { subject } = props;
    initialValues.name = subject ? subject.name : '';
    const id = subject?.id;
    const dispatch = useDispatch();
    const onSubmitHandler = (values: FormValues) => {
        const subject: SubjectWithId = { id: id ? id : '', name: values.name };
        if (id) {
            dispatch(updateSubject(subject));
        } else {
            delete subject.id;
            dispatch(addSubject(subject));
        }
    };

    const deleteHandler = () => {
        id && dispatch(deleteSubject(id));
    };

    return (
        <Formik
            onSubmit={val => onSubmitHandler(val)}
            initialValues={initialValues}
            validationSchema={subjectSchema()}
        >
            {({
                handleChange,
                handleBlur,
                values,
                errors,
                isValid
            }: FormikProps<FormValues>) => (
                <Form>
                    <DialogContent>
                        <FormInput
                            name="name"
                            label="Nazwa"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={!isValid}
                            color="primary"
                        >
                            {id ? 'Edytuj' : 'Dodaj'}
                        </Button>
                        {id ? (
                            <Button onClick={deleteHandler}>Usuń</Button>
                        ) : null}
                    </DialogActions>
                </Form>
            )}
        </Formik>
    );
};

export default SubjectForm;
