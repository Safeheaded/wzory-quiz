import React from 'react';
import ListDisplay from '../ListDisplay/ListDisplay';
import { useSubjects } from '../../../effects/use-values-of';

const SubjectsDisplay = () => {
    const subjects = useSubjects();
    return <ListDisplay items={subjects} />;
};

export default SubjectsDisplay;
