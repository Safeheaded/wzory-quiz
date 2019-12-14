import React, { Component } from 'react';
import styles from './App.module.sass';
import { Container } from '@material-ui/core';
import { Switch, Route, Link } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import Home from './Components/Home/Home';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import GuardedRoute, { GuardMode } from './HOCs/GuardedRoute/GuardedRoute';
import Routes from './Components/Routes/Routes';

interface Props {}

interface State {}
class App extends Component<Props, State> {
    render() {
        return (
            <Container className={styles.Container}>
                <Routes />
            </Container>
        );
    }
}

export default App;
