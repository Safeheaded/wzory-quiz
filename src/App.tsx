import React, { Component } from 'react';
import styles from './App.module.sass';
import { Button, Container } from '@material-ui/core';
import MathJax from 'react-mathjax2';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import firebase from 'firebase/app';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import Home from './Components/Home/Home';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import GuardedRoute, { GuardMode } from './HOCs/GuardedRoute/GuardedRoute';
import Test from './Components/test/test';

interface Props {}

interface State {
    isLoggedin: boolean;
}
class App extends Component<Props, State> {
    state = {
        isLoggedin: false
    };

    constructor(props: Props) {
        super(props);
        firebase
            .auth()
            .onAuthStateChanged(user =>
                this.setState({ isLoggedin: user ? true : false })
            );
    }

    render() {
        return (
            <Container className={styles.Container}>
                <Router>
                    <Link to="/admin">Admin Panel</Link>
                    <Link to="/login">Login Panel</Link>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <GuardedRoute
                            component={AdminPanel}
                            path="/admin"
                            redirectTo="/login"
                            mode={GuardMode.logged}
                        />
                        <GuardedRoute
                            component={LoginForm}
                            path="/login"
                            redirectTo="/admin"
                            mode={GuardMode.unlogged}
                        />
                        {/* <Route path="/admin" component={AdminPanel} /> */}

                        <Route component={NotFoundPage} />
                    </Switch>
                </Router>
            </Container>
        );
    }
}

export default App;
