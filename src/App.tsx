import React, { Component } from 'react';
import styles from './App.module.sass';
import { Button, Container } from '@material-ui/core';
import MathJax from 'react-mathjax2';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';

class App extends Component {
    render() {
        return (
            <Container className={styles.Container}>
                <LoginForm />
                <p>coś</p>
            </Container>
        );
    }
}

export default App;
