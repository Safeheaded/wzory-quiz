import React, { Component } from 'react';
import styles from './App.module.sass';
import { Container } from '@material-ui/core';
import { Switch, Route, Link } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import Home from './Components/Home/Home';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import GuardedRoute, { GuardMode } from './HOCs/GuardedRoute/GuardedRoute';

interface Props {}

interface State {
    isLoggedin: boolean;
}
class App extends Component<Props, State> {
    state = {
        isLoggedin: false
    };

    render() {
        return (
            <Container className={styles.Container}>
                <Link to="/admin">Admin Panel</Link>
                <Link to="/login">Login Panel</Link>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <GuardedRoute
                        component={AdminPanel}
                        path="/admin"
                        redirectTo="/login"
                        flow={GuardMode.authenticated}
                    />
                    <GuardedRoute
                        component={LoginForm}
                        path="/login"
                        redirectTo="/admin"
                        flow={GuardMode.unauthenticated}
                    />

                    <Route component={NotFoundPage} />
                </Switch>
            </Container>
        );
    }
}

export default App;
