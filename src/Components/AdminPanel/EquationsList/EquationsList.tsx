import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { RootReducer } from '../../../store/types/main';
import { Dispatch } from 'redux';
import { fetchAllEquations } from '../../../store/actions/Equations';
import {
    FetchAllEquations,
    EquationWithId
} from '../../../store/types/Equations';
import { List, ListItem, Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

interface Props {
    fetchAllEquations: () => FetchAllEquations;
    equations: EquationWithId[];
    url: string;
}

class EquationsList extends Component<Props> {
    componentDidMount() {
        this.props.fetchAllEquations();
    }

    render() {
        const listItems = this.props.equations.map(equation => (
            <ListItem key={equation.id} button>
                <Link to={`${this.props.url}/edit-equation/${equation.id}`}>
                    {equation.explanation}
                </Link>
            </ListItem>
        ));

        return (
            <Fragment>
                <List>{listItems}</List>
                <Link to={`${this.props.url}/add-equation`}>
                    <Fab>
                        <AddIcon />
                    </Fab>
                </Link>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => ({
    equations: state.eqReducer.equations
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllEquations: () => dispatch(fetchAllEquations())
});

export default connect(mapStateToProps, mapDispatchToProps)(EquationsList);
