import React from 'react';
import { Button, FormControl, Grid } from '@material-ui/core';
import styles from './LoginForm.module.sass';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { login } from '../../store/actions/Authentication';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AuthState } from '../../store/types/Authentication';
import { Formik, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { loginSchema, LoginValues } from '../../utils/validationSchemas';

interface Props extends RouteComponentProps {
    login: typeof login;
    isLoggedIn: boolean;
}

const LoginForm: React.FC<Props> = (props: Props) => {
    const onLogin = ({ email, password }: LoginValues) => {
        props.login(email, password);
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={vals => onLogin(vals)}
            validationSchema={loginSchema()}
            isInitialValid={false}
        >
            {(formProps: FormikProps<LoginValues>) => (
                <Form className={styles.Form}>
                    <Grid spacing={3} direction="column" container>
                        <Grid>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    label="E-Mail"
                                    type="email"
                                    name="email"
                                />
                            </FormControl>
                        </Grid>
                        <Grid>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Password"
                                    name="password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button disabled={!formProps.isValid} type="submit">
                                LogIn
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

const mapStateToProps = ({ authReducer }: { authReducer: AuthState }) => ({
    isLoggedIn: authReducer.isLoggedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (email: string, password: string) => dispatch(login(email, password))
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
