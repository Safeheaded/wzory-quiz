import React, { Component, Fragment } from 'react';
import {
    Card,
    CardHeader,
    Typography,
    Grid,
    CardContent,
    Paper,
    Button
} from '@material-ui/core';
import { Theme, createStyles } from '@material-ui/core/styles';
import { WithStyles, withStyles, makeStyles } from '@material-ui/styles';
import MathJax from 'react-mathjax2';
import Quiz from './Quiz/Quiz';
import { connect } from 'react-redux';
import { RootReducer } from '../../store/types/main';
import { Dispatch } from 'redux';
import { fetchEquation, fetchEquations } from '../../store/actions/Equations';
import { ExtendedEquationWithId } from '../../store/types/Equations';
import { fetchTopics, fetchAllTopics } from '../../store/actions/Topics';
import { fetchAllSubjects } from '../../store/actions/Subjects';
import { SubjectWithId } from '../../store/types/Subjects';
import { ExtendedTopicWithId } from '../../store/types/Topics';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { shuffle } from 'lodash';

interface Props extends RouteComponentProps {
    fetchAllSubjects: typeof fetchAllSubjects;
    fetchTopics: typeof fetchTopics;
    fetchEquations: typeof fetchEquations;
    subjects: SubjectWithId[];
    topics: ExtendedTopicWithId[];
    equations: ExtendedEquationWithId[];
}

interface State {
    topicId: string;
}

type Params = { subjectName: string; topicName: string };

class QuizHome extends Component<Props, State> {
    componentDidMount() {
        const params: Params = this.props.match.params as Params;
        this.props.fetchAllSubjects();
        const subject = this.props.subjects.find(
            subject => subject.name.toLowerCase() === params.subjectName
        );
        if (subject) {
            this.props.fetchTopics(subject.id);
            const topic = this.props.topics.find(
                topic => topic.name.toLowerCase() === params.topicName
            );
            if (topic) {
                this.props.fetchEquations(topic.id);
                this.setState({ topicId: topic.id });
            }
        }
    }

    componentDidUpdate(prevProps: Props) {
        const params: Params = this.props.match.params as Params;
        if (prevProps.subjects.length !== this.props.subjects.length) {
            const subject = this.props.subjects.find(
                subject => subject.name.toLowerCase() === params.subjectName
            );
            if (subject) {
                this.props.fetchTopics(subject.id);
                const topic = this.props.topics.find(
                    topic => topic.name.toLowerCase() === params.topicName
                );
                if (topic) {
                    this.props.fetchEquations(topic.id);
                    this.setState({ topicId: topic.id });
                }
            }
        }
        if (prevProps.topics.length !== this.props.topics.length) {
            const topic = this.props.topics.find(
                topic => topic.name.toLowerCase() === params.topicName
            );
            if (topic) {
                this.props.fetchEquations(topic.id);
                this.setState({ topicId: topic.id });
            }
        }
    }

    render() {
        const equations = this.props.equations.filter(
            equation => equation.topicRef === this.state.topicId
        );
        const shuffledEquations = shuffle(equations);
        return (
            <Fragment>
                <Quiz equations={shuffledEquations} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => ({
    equations: state.eqReducer.equations,
    topics: state.topicsReducer.topics,
    subjects: state.subjectsReducer.subjects
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchEquations: (id: string) => dispatch(fetchEquations(id)),
    fetchTopics: (id: string) => dispatch(fetchTopics(id)),
    fetchAllSubjects: () => dispatch(fetchAllSubjects())
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(QuizHome)
);
