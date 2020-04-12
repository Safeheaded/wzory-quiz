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
import SubjectDialog from './SubjectDialog/subject-dialog';
import { WriteMode } from '../../../types/admin';
import EditList from '../EditList/EditList';
import { State } from '../EditList/EditList';
import { Button } from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';
import { subjectSchema } from '../../../utils/validationSchemas';
import SubjectForm from './SubjectForm/subject-form';

interface Props extends RouteComponentProps {
    fetchAllSubjects: typeof fetchAllSubjects;
    updateSubject: typeof updateSubject;
    addSubject: typeof addSubject;
    deleteSubject: typeof deleteSubject;
    items: SubjectWithId[];
    url: string;
    mode?: WriteMode;
}

type Params = { id: string };

class SubjectsList extends EditList<Props, State> {
    componentDidMount() {
        this.baseComponentDidMount(this.props.fetchAllSubjects);
    }

    componentDidUpdate(prevProps: Props) {
        this.baseComponentDidUpdate(prevProps);
        const params = this.props.match.params as Params;
        const prevParams = prevProps.match.params as Params;
    }

    onChangeHandler = (value: string) => {
        this.setState({ value });
    };

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
        const title =
            this.state.itemId.length === 0
                ? 'Dodaj przedmiot'
                : 'Edytuj przedmiot';
        return (
            <Fragment>
                <UniversalList
                    items={this.props.items}
                    url={this.props.match.url}
                    actionPath="/add"
                />
                <SubjectDialog
                    isOpen={this.state.isDialogOpen}
                    title={title}
                    redirectPath={`${this.props.url}/subjects`}
                >
                    <SubjectForm subject={item} />
                </SubjectDialog>
                {/* <SubjectDialog
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
                    helperText={subjectValidator}
                    onChange={this.onChangeHandler}
                    validity={!this.validator.allValid()}
                    validationSchema={subjectSchema()}
                /> */}
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
