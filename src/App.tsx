import React, { Component } from 'react';
import styles from './App.module.sass';
import { Container } from '@material-ui/core';
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
