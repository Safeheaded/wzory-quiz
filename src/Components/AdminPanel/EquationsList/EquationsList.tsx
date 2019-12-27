import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootReducer } from '../../../store/types/main';
import { Dispatch } from 'redux';
import { fetchAllEquations } from '../../../store/actions/Equations';
import {
    FetchAllEquationsActionType,
    EquationWithId
} from '../../../store/types/Equations';
import { List, ListItem } from '@material-ui/core';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { url } from 'inspector';

interface Props extends RouteComponentProps {
    fetchAllEquations: () => FetchAllEquationsActionType;
    equations: EquationWithId[];
}

class EquationsList extends Component<Props> {
    componentDidMount() {
        this.props.fetchAllEquations();
    }

    render() {
        const { path, url } = this.props.match;
        const listItems = this.props.equations.map(equation => (
            <ListItem key={equation.id} button>
                <Link to={`${url}/edit-equation/${equation.id}`}>
                    {equation.explanation}
                </Link>
            </ListItem>
        ));

        return <List>{listItems}</List>;
    }
}

const mapStateToProps = (state: RootReducer) => ({
    equations: state.eqReducer.equations
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllEquations: () => dispatch(fetchAllEquations())
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EquationsList)
);
