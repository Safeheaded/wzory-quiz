import React, { Component } from 'react';
import { RootReducer } from '../../store/types/main';
import { fetchTopics } from '../../store/actions/Topics';
import { fetchAllSubjects } from '../../store/actions/Subjects';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchEquations } from '../../store/actions/Equations';
import { ExtendedTopicWithId } from '../../store/types/Topics';
import { SubjectWithId } from '../../store/types/Subjects';
import { ExtendedEquationWithId } from '../../store/types/Equations';
import TopicsDisplay from '../TopicsDisplay/TopicsDisplay';
import ListDisplay from '../Home/ListDisplay/ListDisplay';

interface Props extends RouteComponentProps {
    fetchAllSubjects: typeof fetchAllSubjects;
    fetchTopics: typeof fetchTopics;
    fetchEquations: typeof fetchEquations;
    topics: ExtendedTopicWithId[];
    subjects: SubjectWithId[];
    equations: ExtendedEquationWithId[];
}

interface State {}

type Params = { subjectName: string; topicName: string };

class EquationsDisplay extends Component<Props, State> {
    componentDidMount() {
        const params: Params = this.props.match.params as Params;
        this.setState({
            subjectName: params.subjectName,
            topicName: params.topicName
        });
        this.props.fetchAllSubjects();
        this.fetchTopicsOfSubject(params);
    }

    componentDidUpdate(prevProps: Props) {
        const params: Params = this.props.match.params as Params;
        if (prevProps.subjects.length !== this.props.subjects.length) {
            this.fetchTopicsOfSubject(params);
        }
        if (prevProps.topics.length !== this.props.topics.length) {
            this.fetchEquationsOfTopic(params);
        }
    }

    private fetchTopicsOfSubject(params: Params) {
        const subject = this.props.subjects.find(
            subject => subject.name.toLowerCase() === params.subjectName
        );
        if (subject) {
            this.props.fetchTopics(subject.id);
            this.fetchEquationsOfTopic(params);
        }
    }

    private fetchEquationsOfTopic(params: Params) {
        const topic = this.props.topics.find(
            topic => topic.name.toLowerCase() === params.topicName
        );
        if (topic) {
            this.props.fetchEquations(topic.id);
        }
    }

    render() {
        return <ListDisplay items={this.props.equations} />;
    }
}

const mapStateToProps = (state: RootReducer) => ({
    topics: state.topicsReducer.topics,
    subjects: state.subjectsReducer.subjects,
    equations: state.eqReducer.equations
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchTopics: (id: string) => dispatch(fetchTopics(id)),
    fetchAllSubjects: () => dispatch(fetchAllSubjects()),
    fetchEquations: (id: string) => dispatch(fetchEquations(id))
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EquationsDisplay)
);
