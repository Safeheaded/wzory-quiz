import React, { Component } from 'react';
import { RootReducer } from '../../../store/types/main';
import { Dispatch } from 'redux';
import { fetchAllSubjects } from '../../../store/actions/Subjects';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubjectWithId } from '../../../store/types/Subjects';
import ListDisplay from '../ListDisplay/ListDisplay';

interface Props extends RouteComponentProps {
    fetchAllSubjects: typeof fetchAllSubjects;
    subjects: SubjectWithId[];
}

interface State {}

class SubjectsDisplay extends Component<Props, State> {
    componentDidMount() {
        this.props.fetchAllSubjects();
    }
    render() {
        return <ListDisplay items={this.props.subjects} />;
    }
}

const mapStateToProps = (state: RootReducer) => ({
    subjects: state.subjectsReducer.subjects
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllSubjects: () => dispatch(fetchAllSubjects())
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SubjectsDisplay)
);
