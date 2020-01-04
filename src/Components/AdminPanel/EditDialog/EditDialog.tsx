import React, { Component } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core';
import FormInput from '../FormInput/FormInput';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ItemOfList } from '../../../types/General';
import { WriteMode } from '../../../types/admin';

interface Props extends RouteComponentProps {
    id?: string;
    title: string;
    label: string;
    name: string;
    redirectPath: string;
    item?: ItemOfList;
    isDialogOpen: boolean;
}

interface State {
    inputValue: string;
    id?: string;
}

export class EditDialog extends Component<Props, State> {
    state = { inputValue: '', mode: WriteMode.Edit };

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.item !== this.props.item && this.props.item) {
            const name = (this.props.name
                ? this.props.item.name
                : this.props.item.explanation) as string;
            this.setState({ inputValue: name, id: this.props.item.id });
        }
    }

    onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: event.target.value });
    };

    submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
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
                    <DialogContent>
                        <FormInput
                            label={this.props.label}
                            name={this.props.name}
                            value={this.state.inputValue}
                            onValueChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => this.onValueChange(e)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button>{id.length === 0 ? 'Dodaj' : 'Edytuj'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default withRouter(EditDialog);
