import React, { useState } from 'react';
import {
    FormControl,
    List,
    ListItem,
    IconButton,
    StandardTextFieldProps
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Latex from 'react-latex';
import { FieldArray } from 'formik';
import FormInput from '../../FormInput/FormInput';

type Props = StandardTextFieldProps & {
    values: string[];
};

const Explanations = (props: Props) => {
    const [newExplanation, setNewExplanation] = useState('');

    const { values, ...restProps } = props;
    return (
        <FieldArray name="explanations">
            {({ remove, push }) => {
                return (
                    <List>
                        <ListItem>
                            <FormInput
                                value={newExplanation}
                                onChange={e =>
                                    setNewExplanation(e.target.value)
                                }
                            />
                            <FormControl>
                                <IconButton
                                    onClick={e => {
                                        push(newExplanation);
                                        setNewExplanation('');
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </FormControl>
                            <div>
                                <Latex>{newExplanation}</Latex>
                            </div>
                        </ListItem>
                        {values.length > 0 &&
                            values.map((explanation, index) => {
                                return (
                                    <ListItem key={index}>
                                        <FormInput
                                            {...restProps}
                                            value={explanation}
                                            name={`explanations[${index}]`}
                                        />
                                        <FormControl>
                                            <IconButton
                                                onClick={e => remove(index)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </FormControl>
                                        <div>
                                            <Latex>{explanation}</Latex>
                                        </div>
                                    </ListItem>
                                );
                            })}
                    </List>
                );
            }}
        </FieldArray>
    );
};

export default Explanations;
