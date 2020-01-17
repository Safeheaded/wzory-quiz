import React, { Component, Fragment } from 'react';
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
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText
} from '@material-ui/core';

interface Props extends RouteComponentProps {
    fetchAllSubjects: typeof fetchAllSubjects;
    fetchTopics: typeof fetchTopics;
    fetchEquations: typeof fetchEquations;
    topics: ExtendedTopicWithId[];
    subjects: SubjectWithId[];
    equations: ExtendedEquationWithId[];
}

interface State {
    topicRef: string;
    isDialogOpen: boolean;
}

type Params = { subjectName: string; topicName: string; id?: string };

class EquationsDisplay extends Component<Props, State> {
    state: State = { topicRef: '', isDialogOpen: false };
    componentDidMount() {
        const params: Params = this.props.match.params as Params;
        this.props.fetchAllSubjects();
        this.fetchTopicsOfSubject(params);
        if (params.id) {
            this.setState({ isDialogOpen: true });
        }
    }

    componentDidUpdate(prevProps: Props) {
        const params: Params = this.props.match.params as Params;
        if (prevProps.subjects.length !== this.props.subjects.length) {
            this.fetchTopicsOfSubject(params);
        }
        if (prevProps.topics.length !== this.props.topics.length) {
            this.fetchEquationsOfTopic(params);
        }
        if (
            (prevProps.match.params as Params).id !==
            (this.props.match.params as Params).id
        ) {
            this.setState(prevState => ({
                ...prevState,
                isDialogOpen: !prevState.isDialogOpen
            }));
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
            this.setState({ topicRef: topic.id });
            this.props.fetchEquations(topic.id);
        }
    }

    render() {
        const equations = this.props.equations.filter(
            equation => equation.topicRef === this.state.topicRef
        );
        const id = (this.props.match.params as Params).id;
        let equation: ExtendedEquationWithId;
        equation = equations.find(
            equation => equation.id === id
        ) as ExtendedEquationWithId;

        return (
            <Fragment>
                <ListDisplay url={this.props.match.url} items={equations} />
                <Dialog open={this.state.isDialogOpen}>
                    <DialogTitle>Równanie</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {equation ? equation.equation : null}
                        </DialogContentText>
                        <DialogContentText>
                            {equation ? equation.explanation : null}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
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
