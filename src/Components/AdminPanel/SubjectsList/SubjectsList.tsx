import React, { Component, Fragment } from 'react';
import {
    SubjectWithId,
    FetchAllSubjects,
    UpdateSubject,
    Subject,
    AddSubject
} from '../../../store/types/Subjects';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
    fetchAllSubjects,
    updateSubject,
    addSubject
} from '../../../store/actions/Subjects';
import { RootReducer } from '../../../store/types/main';
import UniversalList from '../UniversalList/UniversalList';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import EditDialog from '../EditDialog/EditDialog';
import { WriteMode } from '../../../types/admin';

interface Props extends RouteComponentProps {
    fetchAllSubjects: () => FetchAllSubjects;
    updateSubject: (subject: SubjectWithId) => UpdateSubject;
    addSubject: (subject: Subject) => AddSubject;
    subjects: SubjectWithId[];
    url: string;
    mode?: WriteMode;
}

interface State {
    subjectId?: string;
    isDialogOpen: boolean;
    mode: WriteMode;
}

type Params = { id: string };

class SubjectsList extends Component<Props, State> {
    state = { subjectId: '', isDialogOpen: false, mode: WriteMode.Edit };

    componentDidMount() {
        this.props.fetchAllSubjects();
        this.setSubjectId();
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.match.params !== this.props.match.params) {
            this.setSubjectId();
        }
        if (prevProps.mode !== this.props.mode) {
            this.setState({ isDialogOpen: !this.state.isDialogOpen });
            if (prevProps.mode === WriteMode.Add) {
                this.setState({ mode: WriteMode.Edit });
            } else {
                this.setState({ mode: WriteMode.Add });
            }
        }
    }

    private setSubjectId() {
        if ((this.props.match.params as Params).id) {
            const subjectId = (this.props.match.params as Params).id;
            this.setState({ subjectId, isDialogOpen: true });
        } else {
            this.setState({ subjectId: '', isDialogOpen: false });
        }
    }

    render() {
        const item = this.props.subjects.find(
            subject => subject.id === this.state.subjectId
        );
        const primaryAction =
            this.state.mode === WriteMode.Add
                ? this.props.addSubject
                : this.props.updateSubject;
        return (
            <Fragment>
                <UniversalList
                    items={this.props.subjects}
                    url={this.props.url}
                    actionPath="/subjects/add"
                    itemPath="subjects/edit"
                />
                <EditDialog
                    title={
                        this.state.subjectId.length === 0
                            ? 'Dodaj przedmiot'
                            : 'Edytuj przedmiot'
                    }
                    label="Nazwa"
                    name="subjectId"
                    id={this.state.subjectId}
                    redirectPath={`${this.props.url}/subjects`}
                    item={item}
                    isDialogOpen={this.state.isDialogOpen}
                    primaryAction={primaryAction}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllSubjects: () => dispatch(fetchAllSubjects()),
    updateSubject: (subject: SubjectWithId) => dispatch(updateSubject(subject)),
    addSubject: (subject: Subject) => dispatch(addSubject(subject))
});

const mapStateToProps = (state: RootReducer) => ({
    subjects: state.subjectsReducer.subjects
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SubjectsList)
);
