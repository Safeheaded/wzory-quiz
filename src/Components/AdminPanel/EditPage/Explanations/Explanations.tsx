import React, { Fragment } from 'react';
import { ExtendedEquationWithId } from '../../../../store/types/Equations';

interface Props {
    explanations: string[];
}

const Explanations: React.FC<Props> = (props: Props) => {
    console.log('Explanations works');
    const explanations = props.explanations.map(explanation => (
        <div key={explanation}>{explanation}</div>
    ));

    return <Fragment>{explanations}</Fragment>;
};

export default Explanations;
