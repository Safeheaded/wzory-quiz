import React, { Fragment, SyntheticEvent } from 'react';
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
import SimpleReactValidator from 'simple-react-validator';

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
    validator: SimpleReactValidator;

    constructor(props: Props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message: string) => message
        });
    }

    componentDidMount() {
        this.baseComponentDidMount(this.props.fetchAllSubjects);
    }

    componentDidUpdate(prevProps: Props) {
        this.baseComponentDidUpdate(prevProps);
        const params = this.props.match.params as Params;
        const prevParams = prevProps.match.params as Params;
        if (prevParams !== params) {
            this.validator = new SimpleReactValidator({
                element: (message: string) => message
            });
        }
    }

    onChangeHandler = (value: string) => {
        this.validator.showMessageFor('subject');
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
        const subjectValidator = this.validator.message(
            'subject',
            this.state.value,
            'required|alpha'
        );
        return (
            <Fragment>
                <UniversalList
                    items={this.props.items}
                    url={this.props.match.url}
                    actionPath="/add"
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
                    helperText={subjectValidator}
                    onChange={this.onChangeHandler}
                    validity={!this.validator.allValid()}
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
