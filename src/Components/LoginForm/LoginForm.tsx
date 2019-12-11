import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './LoginForm.module.sass';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { login } from '../../store/actions/Authorization';
import { LoginActionType } from '../../store/types/Authorization';

interface Props {
    login: (email: string, password: string) => LoginActionType;
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
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (email: string, password: string) => dispatch(login(email, password))
});

export default connect(null, mapDispatchToProps)(LoginForm);
