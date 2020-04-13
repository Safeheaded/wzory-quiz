import React, { useEffect } from 'react';
import { Formik, FormikProps, Form } from 'formik';
import FormInput from '../../FormInput/FormInput';
import { subjectSchema } from '../../../../utils/validationSchemas';
import { DialogContent } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
    updateSubject,
    addSubject,
    deleteSubject
} from '../../../../store/actions/Subjects';
import { SubjectWithId } from '../../../../store/types/Subjects';
import { updateValues } from '../../../../utils/objects-helpers';
import EditDialogActions from '../../EditList/EditDialog/EditDialogActions/edit-dialog-actions';

type Props = { subject?: SubjectWithId };
type FormValues = {} & typeof initialValues;

let initialValues = { name: '' };

const SubjectForm = (props: Props) => {
    const { subject } = props;
    if (subject) {
        initialValues = updateValues(initialValues, subject);
    }
    const id = subject?.id;
    const dispatch = useDispatch();
    const onSubmitHandler = (values: FormValues) => {
        const subject = { ...values, id } as SubjectWithId;
        if (id) {
            dispatch(updateSubject(subject));
        } else {
            delete subject.id;
            dispatch(addSubject(subject));
        }
    };

    const deleteSubjectHandler = (id: string) => {
        dispatch(deleteSubject(id));
    };

    return (
        <Formik
            enableReinitialize={true}
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
                    <EditDialogActions
                        isValid={isValid}
                        secondaryAction={deleteSubjectHandler}
                        id={id}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default SubjectForm;
