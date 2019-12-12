import React, { Component } from 'react';
import styles from './App.module.sass';
import { Button, Container } from '@material-ui/core';
import MathJax from 'react-mathjax2';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import firebase from 'firebase/app';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import Home from './Components/Home/Home';

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
        const adminRoute = this.state.isLoggedin ? (
            <Route component={AdminPanel} path="/admin" />
        ) : (
            <Redirect to="/login" />
        );

        const loginRoute = !this.state.isLoggedin ? (
            <Route path="/login" component={LoginForm} />
        ) : (
            <Redirect to="/admin" />
        );

        return (
            <Container className={styles.Container}>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Home} />

                        {loginRoute}
                        {adminRoute}
                    </Switch>
                </Router>
            </Container>
        );
    }
}

export default App;
