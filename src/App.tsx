import React, { Component } from 'react';
import styles from './App.module.sass';
import { Button, Container } from '@material-ui/core';

class App extends Component {

    render() {
        console.log(process.env.TEST);
        return (
            <Container>
                <p>Coś</p>
            </Container>
        );
    }
}

export default App;
