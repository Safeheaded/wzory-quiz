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

interface Props extends RouteComponentProps {
    id?: string;
    title: string;
    label: string;
    name: string;
    redirectPath: string;
}

interface State {
    inputValue: string;
    isDialogOpen: boolean;
}

export class EditDialog extends Component<Props, State> {
    state = { isDialogOpen: false, inputValue: '' };

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.id !== this.props.id && this.props.id) {
            const isId = this.props.id.length === 0 ? false : true;
            this.setState({ isDialogOpen: isId });
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
        this.setState({ isDialogOpen: false });
        this.props.history.push(this.props.redirectPath);
    };

    render() {
        const id = this.props.id ? this.props.id : '';
        return (
            <Dialog onClose={this.closeHandler} open={this.state.isDialogOpen}>
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
                        <Button>{id.length === 0 ? 'Edytuj' : 'Dodaj'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default withRouter(EditDialog);
