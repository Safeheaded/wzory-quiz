import React, { Fragment } from 'react';
import SearchForm from './SearchForm/SearchForm';
import { useParams } from 'react-router';
import SubjectsDisplay from './SubjectsDisplay/subjects-display';
import TopicsDisplay from './TopicsDisplay/topic-display';
import EquationsDisplay from './EquationsDisplay/EquationsDisplay';

type Params = { subjectName?: string; topicName?: string };

const Home = () => {
    const { subjectName, topicName } = useParams<Params>();
    let display;

    if (topicName) {
        display = <EquationsDisplay />;
    } else if (subjectName) {
        display = <TopicsDisplay />;
    } else {
        display = <SubjectsDisplay />;
    }

    return (
        <Fragment>
            <SearchForm />
            {display}
        </Fragment>
    );
};

export default Home;
