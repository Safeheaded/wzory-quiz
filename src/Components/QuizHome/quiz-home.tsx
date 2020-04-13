import React, { Fragment } from 'react';
import Quiz from './Quiz/Quiz';
import {
    useSubject,
    useTopic,
    useEquations
} from '../../effects/use-values-of';
import { useParams } from 'react-router-dom';

type Params = { subjectName: string; topicName: string };

const QuizHome = () => {
    const { subjectName, topicName } = useParams<Params>();
    const subject = useSubject(subjectName);
    const topic = useTopic(topicName, subject?.id);
    const equations = useEquations(topic?.id);
    return (
        <Fragment>
            <Quiz equations={equations} />
        </Fragment>
    );
};

export default QuizHome;
