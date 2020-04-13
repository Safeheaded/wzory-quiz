import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import styles from './EquationsDisplay.module.sass';
import {
    useSubject,
    useTopic,
    useEquations
} from '../../../effects/use-values-of';
import EquationsList from './EquationsList/equations-list';

type Params = { subjectName: string; topicName: string };

const EquationsDisplay = () => {
    const { subjectName, topicName } = useParams<Params>();
    const subject = useSubject(subjectName);
    const topic = useTopic(topicName, subject?.id);
    const equations = useEquations(topic?.id);

    return (
        <Fragment>
            <EquationsList equations={equations} />
            <Link
                className={styles.FabLink}
                to={`/quiz/${subjectName.replace(' ', '-')}/${topicName.replace(
                    ' ',
                    '-'
                )}`}
            >
                <Fab color="primary">
                    <PlayArrowIcon />
                </Fab>
            </Link>
        </Fragment>
    );
};

export default EquationsDisplay;
