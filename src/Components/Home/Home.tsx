import React, { Component, Fragment, ComponentState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import { connect } from 'react-redux';
import { RootReducer } from '../../store/types/main';
import { Dispatch } from 'redux';
import { fetchAllSubjects } from '../../store/actions/Subjects';
import { SubjectWithId } from '../../store/types/Subjects';
import ListDisplay from './ListDisplay/ListDisplay';
import { withRouter } from 'react-router';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import SubjectsDisplay from './SubjectsDisplay/SubjectsDisplay';
import TopicsDisplay from './TopicsDisplay/TopicsDisplay';
import { ComponentType } from 'enzyme';
import EquationsDisplay from './EquationsDisplay/EquationsDisplay';

interface State {
    dataList: ComponentType<any>;
}

interface Props extends RouteComponentProps {}

type Params = { subjectName?: string; topicName?: string; id?: string };

class Home extends Component<Props, State> {
    state = { dataList: SubjectsDisplay };
    componentDidMount() {
        this.setProperDataList();
    }

    private setProperDataList() {
        const params = this.props.match.params as Params;
        if (params.topicName) {
            this.setState({ dataList: EquationsDisplay });
        } else if (params.subjectName) {
            this.setState({ dataList: TopicsDisplay });
        } else {
            this.setState({ dataList: SubjectsDisplay });
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.match.params !== this.props.match.params) {
            this.setProperDataList();
        }
    }

    render() {
        const DataList = this.state.dataList;
        return (
            <Fragment>
                <SearchForm />
                <DataList />
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

export default withRouter(Home);
