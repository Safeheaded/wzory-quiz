import React, { Component, ComponentState } from 'react';
import { TextField, Button, FormControl, Grid } from '@material-ui/core';
import styles from './LoginForm.module.sass';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { login, logout } from '../../store/actions/Authentication';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
    LoginActionType,
    LogoutActionType,
    AuthState
} from '../../store/types/Authentication';
import SimpleReactValidator from 'simple-react-validator';

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

    validator: SimpleReactValidator;

    constructor(props: Props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message: string) => message
        });
    }

    onLogin = () => {
        this.props.login(this.state.email, this.state.password);
    };

    onInputCHanged = (toChange: textInput, event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        this.setState({ [toChange]: target.value } as ComponentState);
        this.validator.showMessages();
    };

    onLogout = () => {
        this.props.logout();
    };

    render() {
        const emailMessage = this.validator.message(
            'email',
            this.state.email,
            'required|email'
        );
        const passwordMessage = this.validator.message(
            'password',
            this.state.password,
            'required|min:8'
        );
        return (
            <form className={styles.Form}>
                <Grid spacing={3} direction="column" container>
                    <Grid>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                label="E-Mail"
                                type="email"
                                onChange={e => this.onInputCHanged('email', e)}
                                value={this.state.email}
                                helperText={emailMessage}
                                error={emailMessage ? true : false}
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                type="password"
                                onChange={e =>
                                    this.onInputCHanged('password', e)
                                }
                                value={this.state.password}
                                label="Password"
                                helperText={passwordMessage}
                                error={passwordMessage ? true : false}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={!this.validator.allValid()}
                            onClick={this.onLogin}
                        >
                            LogIn
                        </Button>
                    </Grid>
                </Grid>
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
