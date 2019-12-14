import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './LoginForm.module.sass';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { login, logout } from '../../store/actions/Authorization';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
    LoginActionType,
    LogoutActionType,
    AuthState
} from '../../store/types/Authorization';
import firebase from 'firebase';
import { RootReducer } from '../../store/types/main';
import { Redirect } from 'react-router';

interface Props extends RouteComponentProps {
    login: (email: string, password: string) => LoginActionType;
    logout: () => LogoutActionType;
    isLoggedIn: boolean;
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
                {this.props.isLoggedIn ? <Redirect to="/admin" /> : null}
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

                {/* <Button onClick={this.onLogout}>Logout</Button> */}
            </form>
        );
    }
}

const mapStateToProps = ({ authReducer }: { authReducer: AuthState }) => ({
    isLoggedIn: authReducer.isLoggedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (email: string, password: string) =>
        dispatch(login(email, password)),
    logout: () => dispatch(logout())
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
