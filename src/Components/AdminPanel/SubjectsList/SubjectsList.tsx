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
import { useDialog } from '../../../effects/use-dialog';
import { useValue } from '../../../effects/use-Value';

type Props = { url: string; mode?: WriteMode };

const SubjectList = (props: Props) => {
    const { url, mode } = props;
    const route = useRouteMatch();
    const fetchedSubjects = useSelector(
        (state: RootReducer) => state.subjectsReducer.subjects
    );

    const subject = useValue(mode, fetchedSubjects, fetchAllSubjects);

    const isOpen = useDialog(mode);

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
