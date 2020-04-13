import React, { Component, useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps, useParams } from 'react-router';
import { RootReducer } from '../../../store/types/main';
import { Dispatch } from 'redux';
import { fetchTopics } from '../../../store/actions/Topics';
import ListDisplay from '../ListDisplay/ListDisplay';
import { ExtendedTopicWithId } from '../../../store/types/Topics';
import { fetchAllSubjects } from '../../../store/actions/Subjects';
import { SubjectWithId } from '../../../store/types/Subjects';

type Params = { subjectName: string };

const TopicsDisplay = () => {
    const { subjectName } = useParams<Params>();
    const dispatch = useDispatch();
    const subject = useSelector<RootReducer, SubjectWithId | undefined>(state =>
        state.subjectsReducer.subjects.find(
            subject =>
                subject.name.toLowerCase() === subjectName?.replace('%20', ' ')
        )
    );

    const topics = useSelector<RootReducer, ExtendedTopicWithId[]>(state =>
        state.topicsReducer.topics.filter(
            topic => topic.subjectRef === subject?.id
        )
    );
    useEffect(() => {
        if (!subject) {
            dispatch(fetchAllSubjects());
        } else {
            dispatch(fetchTopics(subject.id));
        }
    }, [subject]);

    return <ListDisplay items={topics} />;
};

export default TopicsDisplay;
