import React, { Fragment, useEffect, useState } from 'react';
import UniversalList from '../UniversalList/UniversalList';
import EditDialog from '../EditList/EditDialog/edit-dialog';
import SubjectForm from './SubjectForm/subject-form';
import { useSelector, useDispatch } from 'react-redux';
import { SubjectWithId } from '../../../store/types/Subjects';
import { fetchAllSubjects } from '../../../store/actions/Subjects';
import { WriteMode } from '../../../types/admin';
import { RootReducer } from '../../../store/types/main';
import { useRouteMatch, useParams } from 'react-router-dom';

type Props = { url: string; mode?: WriteMode };

const SubjectList = (props: Props) => {
    const { url, mode } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [subject, setSubject] = useState<SubjectWithId>();
    const dispatch = useDispatch();
    const route = useRouteMatch();
    const params = useParams<{ id?: string }>();
    const fetchedSubjects = useSelector(
        (state: RootReducer) => state.subjectsReducer.subjects
    );

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
        if (mode !== undefined) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [mode, fetchedSubjects]);

    const title = subject?.id ? 'Edytuj przedmiot' : 'Dodaj przedmiot';

    return (
        <Fragment>
            <UniversalList
                items={fetchedSubjects}
                url={route.url}
                actionPath="/add"
            />
            <EditDialog
                isOpen={isOpen}
                title={title}
                redirectPath={`${url}/subjects`}
            >
                <SubjectForm subject={subject} />
            </EditDialog>
        </Fragment>
    );
};

export default SubjectList;
