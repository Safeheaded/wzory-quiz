import React, { Component } from 'react';
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

interface Props extends StandardTextFieldProps {
    values: string[];
}

interface State {
    newExplanation: string;
}

class Explanations extends Component<Props, State> {
    state: State = { newExplanation: '' };

    render() {
        const { values, ...props } = this.props;
        return (
            <FieldArray name="explanations">
                {({ insert, remove, push }) => {
                    return (
                        <List>
                            <ListItem>
                                <FormInput
                                    value={this.state.newExplanation}
                                    onChange={e =>
                                        this.setState({
                                            newExplanation: e.target.value
                                        })
                                    }
                                />
                                <FormControl>
                                    <IconButton
                                        onClick={e => {
                                            push(this.state.newExplanation);
                                            this.setState({
                                                newExplanation: ''
                                            });
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </FormControl>
                                <div>
                                    <Latex>{this.state.newExplanation}</Latex>
                                </div>
                            </ListItem>
                            {values.length > 0 &&
                                values.map((explanation, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <FormInput
                                                {...props}
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
    }
}

export default Explanations;
