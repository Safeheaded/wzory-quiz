import React, { Component } from 'react';
import { Card, CardHeader } from '@material-ui/core';

interface Props {}

interface State {}

class QuizHome extends Component<Props, State> {
    render() {
        return (
            <Card>
                <CardHeader>Wyjaśnienie równania</CardHeader>
            </Card>
        );
    }
}

export default QuizHome;
