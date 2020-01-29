import React, { Component, ComponentType } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core';
import FormInput from '../../FormInput/FormInput';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ItemOfList } from '../../../../types/General';
import { WriteMode } from '../../../../types/admin';
import { SubjectWithId } from '../../../../store/types/Subjects';
import {
    TopicWithId,
    ExtendedTopicWithId,
    ExtendedTopic
} from '../../../../store/types/Topics';
import { BaseType } from '../../../../store/types/main';
import styles from './EditDialog.module.sass';

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

    submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
        this.props.primaryAction(item);
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
                <form onSubmit={e => this.submitHandler(e)}>
                    <DialogContent className={styles.DialogContent}>
                        {this.props.children}
                        <FormInput
                            label={this.props.label}
                            name={this.props.name}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!!this.props.validity} type="submit">
                            {id.length === 0 ? 'Dodaj' : 'Edytuj'}
                        </Button>
                        {id.length !== 0
                            ? this.props.secondaryActionButton
                            : null}
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default EditDialog;
