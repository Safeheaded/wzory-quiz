import React, { Fragment, Component } from 'react';
import {
    TextField,
    FormControl,
    Button,
    List,
    ListItem,
    IconButton
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Latex from 'react-latex';
import SimpleReactValidator from 'simple-react-validator';

interface Props {
    explanations: string[];
    addExplanationHandler: (explanation: string) => void;
    deleteExplanationHandler: (index: number) => void;
    changeExplanationHandler: (value: string, index: number) => void;
}

interface State {
    newExplanation: string;
}

class Explanations extends Component<Props, State> {
    state: State = { newExplanation: '' };

    validator: SimpleReactValidator;

    constructor(props: Props) {
        super(props);
        this.validator = new SimpleReactValidator({
            element: (message: string) => message
        });
    }

    onAddExplanation = () => {
        this.props.addExplanationHandler(this.state.newExplanation);
    };

    onDeleteExplanation = (index: number) => {
        this.props.deleteExplanationHandler(index);
    };

    onValueChange = (e: React.SyntheticEvent, index: number) => {
        const value = (e.target as HTMLInputElement).value;
        this.props.changeExplanationHandler(value, index);
    };

    render() {
        const explanationValidator = this.validator.message(
            'explanation',
            this.state.newExplanation,
            'required'
        );

        const explanations = this.props.explanations.map(
            (explanation, index) => (
                <ListItem key={index}>
                    <FormControl style={{ width: '50%' }}>
                        <TextField
                            onChange={e => this.onValueChange(e, index)}
                            value={explanation}
                        />
                    </FormControl>
                    <FormControl>
                        <IconButton
                            onClick={() => this.onDeleteExplanation(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </FormControl>
                    <div>
                        <Latex>{explanation}</Latex>
                    </div>
                </ListItem>
            )
        );

        return (
            <List>
                <ListItem>
                    <FormControl style={{ width: '50%' }}>
                        <TextField
                            onChange={e => {
                                this.validator.showMessageFor('explanation');
                                this.setState({
                                    newExplanation: (e.target as HTMLInputElement)
                                        .value
                                });
                            }}
                            value={this.state.newExplanation}
                            helperText={explanationValidator}
                            error={!!explanationValidator}
                        />
                    </FormControl>
                    <FormControl>
                        <IconButton
                            disabled={!this.validator.allValid()}
                            onClick={this.onAddExplanation}
                        >
                            <AddIcon />
                        </IconButton>
                    </FormControl>
                    <Latex>{this.state.newExplanation}</Latex>
                </ListItem>
                {explanations}
            </List>
        );
    }
}

export default Explanations;
