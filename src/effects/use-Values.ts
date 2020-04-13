import { WriteMode } from '../types/admin';
import { SubjectWithId } from '../store/types/Subjects';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllSubjects } from '../store/actions/Subjects';
import { useParams } from 'react-router-dom';
import { ExtendedTopicWithId } from '../store/types/Topics';

export const useValues = <
    T extends { id?: string },
    K extends SubjectWithId | ExtendedTopicWithId
>(
    mode: WriteMode | undefined,
    fetchedSubjects: K[]
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
            dispatch(fetchAllSubjects());
            setItem(undefined);
        }
    }, [fetchedSubjects, mode]);

    return item;
};
