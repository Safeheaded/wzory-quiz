import { WriteMode } from '../types/admin';
import { SubjectWithId } from '../store/types/Subjects';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllSubjects } from '../store/actions/Subjects';
import { useParams } from 'react-router-dom';
import { ExtendedTopicWithId } from '../store/types/Topics';
import { fetchAllTopics } from '../store/actions/Topics';

export const useValue = <
    T extends { id?: string },
    K extends SubjectWithId | ExtendedTopicWithId
>(
    mode: WriteMode | undefined,
    fetchedSubjects: K[],
    action: typeof fetchAllSubjects | typeof fetchAllTopics
) => {
    const [item, setItem] = useState<K>();
    const dispatch = useDispatch();
    const params = useParams<T>();

    useEffect(() => {
        const subject = fetchedSubjects.find(
            subject => subject.id === params.id
        );
        if (subject) {
            setItem(subject);
        } else {
            dispatch(action());
            setItem(undefined);
        }
    }, [fetchedSubjects, mode, action, dispatch, params]);

    return item;
};
