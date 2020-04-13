import React, { Fragment, SyntheticEvent } from 'react';
import UniversalList from '../UniversalList/UniversalList';
import { connect } from 'react-redux';
import { RootReducer } from '../../../store/types/main';
import { Dispatch } from 'redux';
import {
    fetchAllTopics,
    addTopic,
    updateTopic,
    deleteTopic
} from '../../../store/actions/Topics';
import {
    ExtendedTopicWithId,
    ExtendedTopic
} from '../../../store/types/Topics';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { WriteMode, SelectChangeEvent } from '../../../types/admin';
import EditList from '../EditList/EditList';
import { State as BaseState } from '../EditList/EditList';
import FormSelect from '../FormSelect/FormSelect';
import { fetchAllSubjects } from '../../../store/actions/Subjects';
import { SubjectWithId } from '../../../store/types/Subjects';
import { Button } from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';
import { topicSchema } from '../../../utils/validationSchemas';
import { FormikProps } from 'formik';
import EditDialog from '../EditList/EditDialog/edit-dialog';
import TopicsForm from './TopicForm/topic-form';
import TopicForm from './TopicForm/topic-form';

interface Props extends RouteComponentProps {
    fetchAllTopics: typeof fetchAllTopics;
    addTopic: typeof addTopic;
    updateTopic: typeof updateTopic;
    deleteTopic: typeof deleteTopic;
    items: ExtendedTopicWithId[];
    mode?: WriteMode;
    url: string;
    fetchAllSubjects: typeof fetchAllSubjects;
    subjects: SubjectWithId[];
}

interface State extends BaseState {
    subjectRef: string;
}

export class TopicsList extends EditList<Props, State> {
    validator: SimpleReactValidator;

    constructor(props: Props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message: string) => message
        });
    }

    componentDidMount() {
        this.baseComponentDidMount(this.props.fetchAllTopics);
        this.props.fetchAllSubjects();
        this.setState({ subjectRef: '' });
    }

    componentDidUpdate(prevProps: Props) {
        this.baseComponentDidUpdate(prevProps);
        if (prevProps.match.params !== this.props.match.params) {
            this.validator = new SimpleReactValidator({
                element: (message: string) => message
            });
            const itemId = (this.props.match.params as { id: string }).id || '';
            this.prepareSubjectRef(itemId);
        }
    }

    valueChangeHandler = (e: SelectChangeEvent) => {
        const value = (e.target as HTMLSelectElement).value;
        this.validator.showMessageFor('subjectRef');
        this.setState({ subjectRef: value });
    };

    private prepareSubjectRef(itemId: string) {
        if (itemId.length !== 0) {
            const item = this.getItem<ExtendedTopicWithId>(itemId);
            const subject = this.props.subjects.find(
                subject => subject.id === item.subjectRef
            );
            this.setSubjectRef(subject);
        } else {
            this.setState({ subjectRef: '' });
        }
    }

    private setSubjectRef(subject: SubjectWithId | undefined) {
        if (subject) {
            this.setState({ subjectRef: subject.id });
        }
    }

    onChangeHandler = (value: string) => {
        this.validator.showMessageFor('topic');
        this.setState({ value: value });
    };

    render() {
        const item = this.getItem(this.state.itemId) as
            | ExtendedTopicWithId
            | undefined;
        const title =
            this.state.itemId.length === 0 ? 'Dodaj temat' : 'Edytuj temat';
        return (
            <Fragment>
                <UniversalList
                    items={this.props.items}
                    actionPath="/add"
                    url={this.props.match.url}
                />
                <EditDialog
                    isOpen={this.state.isDialogOpen}
                    redirectPath={`${this.props.url}/topics`}
                    title={title}
                >
                    <TopicForm subjects={this.props.subjects} topic={item} />
                </EditDialog>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => ({
    items: state.topicsReducer.topics,
    subjects: state.subjectsReducer.subjects
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllTopics: () => dispatch(fetchAllTopics()),
    fetchAllSubjects: () => dispatch(fetchAllSubjects()),
    addTopic: (topic: ExtendedTopic) => dispatch(addTopic(topic)),
    updateTopic: (topic: ExtendedTopicWithId) => dispatch(updateTopic(topic)),
    deleteTopic: (id: string) => dispatch(deleteTopic(id))
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TopicsList)
);
