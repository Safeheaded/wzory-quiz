import React, { Component, Fragment, ComponentState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import { connect } from 'react-redux';
import { RootReducer } from '../../store/types/main';
import { Dispatch } from 'redux';
import { fetchAllSubjects } from '../../store/actions/Subjects';
import { SubjectWithId } from '../../store/types/Subjects';
import ListDisplay from './ListDisplay/ListDisplay';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { ItemOfList } from '../../types/General';
import { ExtendedTopicWithId } from '../../store/types/Topics';
import { fetchTopics } from '../../store/actions/Topics';

interface State {}

interface Props extends RouteComponentProps {
    fetchAllSubjects: typeof fetchAllSubjects;
    subjects: SubjectWithId[];
}

class Home extends Component<Props, State> {
    componentDidMount() {
        this.props.fetchAllSubjects();
    }

    render() {
        return (
            <Fragment>
                <SearchForm />
                <ListDisplay items={this.props.subjects} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => ({
    subjects: state.subjectsReducer.subjects
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllSubjects: () => dispatch(fetchAllSubjects())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
