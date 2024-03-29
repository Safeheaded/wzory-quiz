import React, { Fragment, useEffect } from 'react';
import UniversalList from '../UniversalList/UniversalList';
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducer } from '../../../store/types/main';
import { ExtendedTopicWithId } from '../../../store/types/Topics';
import { WriteMode } from '../../../types/admin';
import { useDialog } from '../../../effects/use-dialog';
import EditDialog from '../EditList/EditDialog/edit-dialog';
import TopicForm from './TopicForm/topic-form';
import { useValue } from '../../../effects/use-Value';
import { SubjectWithId } from '../../../store/types/Subjects';
import { fetchAllTopics } from '../../../store/actions/Topics';
import { fetchAllSubjects } from '../../../store/actions/Subjects';

type Props = { mode?: WriteMode; url: string };

const TopicList = (props: Props) => {
    const { mode, url } = props;
    const route = useRouteMatch();
    const dispatch = useDispatch();
    const topics = useSelector<RootReducer, ExtendedTopicWithId[]>(
        state => state.topicsReducer.topics
    );
    const subjects = useSelector<RootReducer, SubjectWithId[]>(
        state => state.subjectsReducer.subjects
    );
    const isOpen = useDialog(mode);
    const topic = useValue(mode, topics, fetchAllTopics);
    const title = topic ? 'Edytuj temat' : 'Dodaj temat';
    useEffect(() => {
        if (subjects.length === 0) {
            dispatch(fetchAllSubjects());
        }
    });
    return (
        <Fragment>
            <UniversalList items={topics} actionPath="/add" url={route.url} />
            <EditDialog
                isOpen={isOpen}
                redirectPath={`${url}/topics`}
                title={title}
            >
                <TopicForm subjects={subjects} topic={topic} />
            </EditDialog>
        </Fragment>
    );
};

export default TopicList;
