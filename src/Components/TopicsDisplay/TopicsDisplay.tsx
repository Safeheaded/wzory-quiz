import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { RootReducer } from '../../store/types/main';
import { Dispatch } from 'redux';
import { fetchTopics } from '../../store/actions/Topics';
import ListDisplay from '../Home/ListDisplay/ListDisplay';
import { ExtendedTopicWithId } from '../../store/types/Topics';
import { fetchAllSubjects } from '../../store/actions/Subjects';
import { SubjectWithId } from '../../store/types/Subjects';

interface Props extends RouteComponentProps {
    fetchAllSubjects: typeof fetchAllSubjects;
    fetchTopics: typeof fetchTopics;
    topics: ExtendedTopicWithId[];
    subjects: SubjectWithId[];
}

interface State {
    itemName: string;
}

type Params = { subjectName: string };

class TopicsDisplay extends Component<Props, State> {
    componentDidMount() {
        const itemName = (this.props.match.params as Params).subjectName;
        this.setState({
            itemName
        });
        this.props.fetchAllSubjects();
        this.fetchTopicsOfSubject(itemName);
    }

    private fetchTopicsOfSubject(itemName: string) {
        const subject = this.props.subjects.find(
            subject => subject.name.toLowerCase() === itemName
        );
        if (subject) {
            this.props.fetchTopics(subject.id);
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.subjects.length !== prevProps.subjects.length) {
            this.fetchTopicsOfSubject(this.state.itemName);
        }
    }

    render() {
        return <ListDisplay items={this.props.topics} />;
    }
}

const mapStateToProps = (state: RootReducer) => ({
    topics: state.topicsReducer.topics,
    subjects: state.subjectsReducer.subjects
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchTopics: (id: string) => dispatch(fetchTopics(id)),
    fetchAllSubjects: () => dispatch(fetchAllSubjects())
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TopicsDisplay)
);
