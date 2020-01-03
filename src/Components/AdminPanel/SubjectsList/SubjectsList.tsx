import React, { Component } from 'react';
import { SubjectWithId, FetchAllSubjects } from '../../../store/types/Subjects';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchAllSubjects } from '../../../store/actions/Subjects';
import { RootReducer } from '../../../store/types/main';
import UniversalList from '../UniversalList/UniversalList';

interface Props {
    subjects: SubjectWithId[];
    fetchAllSubjects: () => FetchAllSubjects;
    url: string;
}

class SubjectsList extends Component<Props> {
    componentDidMount() {
        this.props.fetchAllSubjects();
    }

    render() {
        return (
            <UniversalList
                items={this.props.subjects}
                url={this.props.url}
                actionPath="/add-subject"
            />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllSubjects: () => dispatch(fetchAllSubjects())
});

const mapStateToProps = (state: RootReducer) => ({
    subjects: state.subjectsReducer.subjects
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsList);
