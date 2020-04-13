import React, { Component, Fragment } from 'react';
import { RootReducer } from '../../../store/types/main';
import { fetchTopics } from '../../../store/actions/Topics';
import { fetchAllSubjects } from '../../../store/actions/Subjects';
import {
    withRouter,
    RouteComponentProps,
    Link,
    useParams
} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchEquations } from '../../../store/actions/Equations';
import { ExtendedTopicWithId } from '../../../store/types/Topics';
import { SubjectWithId } from '../../../store/types/Subjects';
import { ExtendedEquationWithId } from '../../../store/types/Equations';
import ListDisplay from '../ListDisplay/ListDisplay';
import { Fab } from '@material-ui/core';
import EquationDialog from './EquationDialog/EquationDialog';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import styles from './EquationsDisplay.module.sass';
import {
    useSubject,
    useTopic,
    useEquations
} from '../../../effects/use-values-of';

type Props = {};
type Params = { subjectName: string; topicName: string };

const EquationsDisplay = (props: Props) => {
    const { subjectName, topicName } = useParams<Params>();
    const subject = useSubject(subjectName);
    const topic = useTopic(topicName, subject?.id);
    const equations = useEquations(topic?.id);

    return <ListDisplay items={equations} />;
};

export default EquationsDisplay;
