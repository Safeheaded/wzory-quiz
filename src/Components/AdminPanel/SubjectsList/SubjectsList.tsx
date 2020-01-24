import React, { Fragment } from 'react';
import { SubjectWithId, Subject } from '../../../store/types/Subjects';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
    fetchAllSubjects,
    updateSubject,
    addSubject,
    deleteSubject
} from '../../../store/actions/Subjects';
import { RootReducer } from '../../../store/types/main';
import UniversalList from '../UniversalList/UniversalList';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import SubjectDialog from './SubjectDialog/SubjectDialog';
import { WriteMode } from '../../../types/admin';
import EditList from '../EditList/EditList';
import { State } from '../EditList/EditList';
import { Button } from '@material-ui/core';

interface Props extends RouteComponentProps {
    fetchAllSubjects: typeof fetchAllSubjects;
    updateSubject: typeof updateSubject;
    addSubject: typeof addSubject;
    deleteSubject: typeof deleteSubject;
    items: SubjectWithId[];
    url: string;
    mode?: WriteMode;
}

class SubjectsList extends EditList<Props, State> {
    componentDidMount() {
        this.baseComponentDidMount(this.props.fetchAllSubjects);
    }

    componentDidUpdate(prevProps: Props) {
        this.baseComponentDidUpdate(prevProps);
    }

    render() {
        const item = this.getItem(this.state.itemId);
        const primaryAction =
            this.state.mode === WriteMode.Add
                ? this.props.addSubject
                : this.props.updateSubject;
        const secondaryActionButton = (
            <Button onClick={() => this.props.deleteSubject(this.state.itemId)}>
                Usuń
            </Button>
        );
        return (
            <Fragment>
                <UniversalList
                    items={this.props.items}
                    url={this.props.match.url}
                    actionPath="/subjects/add"
                />
                <SubjectDialog
                    title={
                        this.state.itemId.length === 0
                            ? 'Dodaj przedmiot'
                            : 'Edytuj przedmiot'
                    }
                    label="Nazwa"
                    name="name"
                    id={this.state.itemId}
                    redirectPath={`${this.props.url}/subjects`}
                    item={item}
                    isDialogOpen={this.state.isDialogOpen}
                    primaryAction={primaryAction}
                    secondaryActionButton={secondaryActionButton}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllSubjects: () => dispatch(fetchAllSubjects()),
    updateSubject: (subject: SubjectWithId) => dispatch(updateSubject(subject)),
    addSubject: (subject: Subject) => dispatch(addSubject(subject)),
    deleteSubject: (id: string) => dispatch(deleteSubject(id))
});

const mapStateToProps = (state: RootReducer) => ({
    items: state.subjectsReducer.subjects
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SubjectsList)
);
