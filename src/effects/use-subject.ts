import { WriteMode } from '../types/admin';
import { SubjectWithId } from '../store/types/Subjects';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllSubjects } from '../store/actions/Subjects';
import { useParams } from 'react-router-dom';

export const useSubject = <T extends { id?: string }>(
    mode: WriteMode | undefined,
    fetchedSubjects: SubjectWithId[]
) => {
    const [subject, setSubject] = useState<SubjectWithId>();
    const dispatch = useDispatch();
    const params = useParams<T>();

    useEffect(() => {
        const subject = fetchedSubjects.find(
            subject => subject.id === params.id
        );
        if (subject) {
            setSubject(subject);
        } else {
            dispatch(fetchAllSubjects());
            setSubject(undefined);
        }
    }, [fetchedSubjects, mode]);

    return subject;
};
