import React from 'react';
import { Button, FormControl, Grid } from '@material-ui/core';
import styles from './LoginForm.module.sass';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/Authentication';
import { Formik, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { loginSchema, LoginValues } from '../../utils/validationSchemas';

const LoginForm = () => {
    const dispatch = useDispatch();
    const onLogin = ({ email, password }: LoginValues) => {
        dispatch(login(email, password));
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

export default LoginForm;
