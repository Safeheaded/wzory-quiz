import React, { Fragment } from 'react';
import UniversalList from '../UniversalList/UniversalList';
import { connect } from 'react-redux';
import { RootReducer } from '../../../store/types/main';
import { Dispatch } from 'redux';
import {
    fetchAllTopics,
    addTopic,
    updateTopic
} from '../../../store/actions/Topics';
import {
    ExtendedTopicWithId,
    ExtendedTopic
} from '../../../store/types/Topics';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import TopicDialog from './TopicDialog/TopicDialog';
import { WriteMode } from '../../../types/admin';
import EditList from '../EditList/EditList';
import { State as BaseState } from '../EditList/EditList';
import FormSelect from '../FormSelect/FormSelect';
import { fetchAllSubjects } from '../../../store/actions/Subjects';
import { SubjectWithId } from '../../../store/types/Subjects';

interface Props extends RouteComponentProps {
    fetchAllTopics: typeof fetchAllTopics;
    addTopic: typeof addTopic;
    updateTopic: typeof updateTopic;
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
    componentDidMount() {
        this.baseComponentDidMount(this.props.fetchAllTopics);
        this.props.fetchAllSubjects();
        this.setState({ subjectRef: '' });
    }

    componentDidUpdate(prevProps: Props) {
        this.baseComponentDidUpdate(prevProps);
        if (prevProps.match.params !== this.props.match.params) {
            const itemId = (this.props.match.params as { id: string }).id || '';
            this.prepareSubjectRef(itemId);
        }
    }

    valueChangeHandler = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        const value = (e.target as HTMLSelectElement).value;
        this.setState({ subjectRef: value });
    };

    private prepareSubjectRef(itemId: string) {
        if (itemId.length !== 0) {
            const item = this.getItem<ExtendedTopicWithId>(itemId);
            const subject = this.props.subjects.find(
                subject => subject.id === item.subjectRef
            );
            this.setSubjectRef(subject);
        }
    }

    private setSubjectRef(subject: SubjectWithId | undefined) {
        if (subject) {
            this.setState({ subjectRef: subject.id });
        }
    }

    render() {
        const item = this.getItem(this.state.itemId);
        const primaryAction =
            this.state.mode === WriteMode.Add
                ? this.props.addTopic
                : this.props.updateTopic;

        return (
            <Fragment>
                <UniversalList
                    items={this.props.items}
                    actionPath="/add"
                    itemPath="edit"
                    url={this.props.match.url}
                />
                <TopicDialog
                    title={
                        this.state.itemId.length === 0
                            ? 'Dodaj temat'
                            : 'Edytuj temat'
                    }
                    label="Nazwa"
                    name="name"
                    id={this.state.itemId}
                    redirectPath={`${this.props.url}/topics`}
                    item={item}
                    isDialogOpen={this.state.isDialogOpen}
                    primaryAction={primaryAction}
                >
                    <FormSelect
                        label="Przedmiot"
                        name="subjectRef"
                        value={this.state.subjectRef}
                        id="topic"
                        onValueChange={(
                            e: React.SyntheticEvent<HTMLSelectElement>
                        ) => this.valueChangeHandler(e)}
                        values={this.props.subjects}
                    />
                </TopicDialog>
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
    updateTopic: (topic: ExtendedTopicWithId) => dispatch(updateTopic(topic))
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TopicsList)
);
