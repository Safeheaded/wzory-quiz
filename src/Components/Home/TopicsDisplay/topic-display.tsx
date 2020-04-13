import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router';
import { RootReducer } from '../../../store/types/main';
import { fetchTopics } from '../../../store/actions/Topics';
import ListDisplay from '../ListDisplay/ListDisplay';
import { ExtendedTopicWithId } from '../../../store/types/Topics';
import { fetchAllSubjects } from '../../../store/actions/Subjects';
import { SubjectWithId } from '../../../store/types/Subjects';
import { useSubject } from '../../../effects/use-values-of';

type Params = { subjectName: string };

const TopicsDisplay = () => {
    const { subjectName } = useParams<Params>();
    const { url } = useRouteMatch();
    const subject = useSubject(subjectName);

    const topics = useSelector<RootReducer, ExtendedTopicWithId[]>(state =>
        state.topicsReducer.topics.filter(
            topic => topic.subjectRef === subject?.id
        )
    );

    return <ListDisplay url={url} items={topics} />;
};

export default TopicsDisplay;
