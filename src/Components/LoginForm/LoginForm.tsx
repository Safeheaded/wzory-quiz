import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './LoginForm.module.sass';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { login, logout } from '../../store/actions/Authorization';
import {
    LoginActionType,
    LogoutActionType
} from '../../store/types/Authorization';
import firebase from 'firebase';

interface Props {
    login: (email: string, password: string) => LoginActionType;
    logout: () => LogoutActionType;
}

interface State {
    email: string;
    password: string;
}

type textInput = 'email' | 'password';

class LoginForm extends Component<Props, State> {
    state = {
        email: '',
        password: ''
    };

    onLogin = () => {
        this.props.login(this.state.email, this.state.password);
    };

    onInputCHanged = (toChange: textInput, event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        this.setState({ [toChange as 'email']: target.value });
    };

    onLogout = () => {
        this.props.logout();
    };

    render() {
        return (
            <form className={styles.Form}>
                <TextField
                    label="E-Mail"
                    type="email"
                    onChange={e => this.onInputCHanged('email', e)}
                    value={this.state.email}
                />
                <TextField
                    type="password"
                    onChange={e => this.onInputCHanged('password', e)}
                    value={this.state.password}
                    label="Password"
                />
                <Button onClick={this.onLogin}>LogIn</Button>

                <Button onClick={this.onLogout}>Logout</Button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (email: string, password: string) =>
        dispatch(login(email, password)),
    logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(LoginForm);
