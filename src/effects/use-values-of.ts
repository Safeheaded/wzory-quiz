import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducer } from '../store/types/main';
import { SubjectWithId } from '../store/types/Subjects';
import { fetchTopics, fetchAllTopics } from '../store/actions/Topics';
import { fetchAllSubjects } from '../store/actions/Subjects';
import { ExtendedTopicWithId } from '../store/types/Topics';
import { fetchEquations } from '../store/actions/Equations';
import { ExtendedEquationWithId } from '../store/types/Equations';

export const useSubject = (subjectName: string | undefined) => {
    const dispatch = useDispatch();
    const subject = useSelector<RootReducer, SubjectWithId | undefined>(state =>
        state.subjectsReducer.subjects.find(
            subject =>
                subject.name.toLowerCase() === subjectName?.replace('-', ' ')
        )
    );

    useEffect(() => {
        if (subject) {
            dispatch(fetchTopics(subject.id));
        } else {
            dispatch(fetchAllSubjects());
        }
    }, [subject, dispatch]);
    return subject;
};

export const useTopic = (topicName: string | undefined, subjectId?: string) => {
    const dispatch = useDispatch();
    const topic = useSelector<RootReducer, ExtendedTopicWithId | undefined>(
        state =>
            state.topicsReducer.topics.find(
                topic =>
                    topic.name.toLowerCase() === topicName?.replace('-', ' ')
            )
    );

    useEffect(() => {
        if (topic) {
            dispatch(fetchEquations(topic.id));
        } else if (subjectId) {
            dispatch(fetchTopics(subjectId));
        } else {
            dispatch(fetchAllTopics());
        }
    }, [topic, dispatch, subjectId]);
    return topic;
};

export const useSubjects = () => {
    const dispatch = useDispatch();
    const subjects = useSelector<RootReducer, SubjectWithId[]>(
        state => state.subjectsReducer.subjects
    );

    useEffect(() => {
        dispatch(fetchAllSubjects());
    }, [dispatch]);

    return subjects;
};

export const useEquations = (topicId?: string) => {
    const dispatch = useDispatch();
    const equations = useSelector<RootReducer, ExtendedEquationWithId[]>(
        state =>
            state.eqReducer.equations.filter(
                equation => equation.topicRef === topicId
            )
    );

    useEffect(() => {
        if (topicId) {
            dispatch(fetchEquations(topicId));
        }
    }, [dispatch, topicId]);
    return equations;
};
