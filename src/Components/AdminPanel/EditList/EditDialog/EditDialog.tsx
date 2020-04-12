import React, { Component, Fragment, ReactElement } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core';
import FormInput from '../../FormInput/FormInput';
import { RouteComponentProps } from 'react-router-dom';
import { ItemOfList } from '../../../../types/General';
import { WriteMode } from '../../../../types/admin';
import { SubjectWithId } from '../../../../store/types/Subjects';
import { ExtendedTopicWithId } from '../../../../store/types/Topics';
import styles from './EditDialog.module.sass';
import { Formik, FormikProps } from 'formik';
import { ObjectSchema } from 'yup';

interface Props<T> extends RouteComponentProps {
    id?: string;
    title: string;
    label: string;
    name: string;
    redirectPath: string;
    item?: ItemOfList;
    isDialogOpen: boolean;
    primaryAction: (item: T) => void;
    secondaryActionButton?: JSX.Element;
    onChange?: (val: string) => void;
    helperText?: string;
    validity?: boolean;
    validationSchema: ObjectSchema<any>;
    children?: never;
    render?: any;
}

interface State {
    inputValue: string;
    id?: string;
}

abstract class EditDialog<
    T extends SubjectWithId | ExtendedTopicWithId
> extends Component<Props<T>, State> {
    state = { inputValue: '', mode: WriteMode.Edit };

    componentDidUpdate(prevProps: Props<T>, prevState: State) {
        if (prevProps.item !== this.props.item && this.props.item) {
            const name = (this.props.name
                ? this.props.item.name
                : this.props.item.explanation) as string;
            //TODO: Add showing message in here

            this.props.onChange && this.props.onChange(name);
            this.setState({ inputValue: name, id: this.props.item.id });
        }
    }

    onValueChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        this.props.onChange && this.props.onChange(event.target.value);
        this.setState({ inputValue: event.target.value });
    };

    submitHandler = (values: FormValues) => {
        /* event.preventDefault();
        const form = event.target;
        const data = new FormData(form as HTMLFormElement);
        const item = { id: '', name: '', subjectRef: '' } as T;
        for (const key in item) {
            if (data.get(key)) {
                item[key] = data.get(key) as any;
            } else {
                delete item[key];
            }
        }
        if (this.props.id && this.props.id.length !== 0) {
            item.id = this.props.id;
        } else {
            delete item.id;
        }
        this.props.primaryAction(item); */
    };

    closeHandler = () => {
        this.setState({ id: '', inputValue: '' });
        this.props.history.push(this.props.redirectPath);
    };

    render() {
        const id = this.props.id ? this.props.id : '';
        return (
            <Dialog onClose={this.closeHandler} open={this.props.isDialogOpen}>
                <DialogTitle>{this.props.title}</DialogTitle>
                <Formik
                    initialValues={{ name: '' }}
                    onSubmit={e => this.submitHandler(e)}
                    validationSchema={this.props.validationSchema}
                >
                    {(formProps: FormikProps<FormValues>) => {
                        return (
                            <Fragment>
                                <DialogContent className={styles.DialogContent}>
                                    {this.props.render(formProps)}
                                    <FormInput
                                        label={this.props.label}
                                        name={this.props.name}
                                        onChange={formProps.handleChange}
                                        onBlur={formProps.handleBlur}
                                        value={formProps.values.name}
                                        helperText={formProps.errors.name}
                                        error={
                                            formProps.errors.name ? true : false
                                        }
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        disabled={!formProps.isValid}
                                        type="submit"
                                    >
                                        {id.length === 0 ? 'Dodaj' : 'Edytuj'}
                                    </Button>
                                    {id.length !== 0
                                        ? this.props.secondaryActionButton
                                        : null}
                                </DialogActions>
                            </Fragment>
                        );
                    }}
                </Formik>
            </Dialog>
        );
    }
}

export type FormValues = {
    name: string;
    subjectRef?: string;
};

export default EditDialog;
