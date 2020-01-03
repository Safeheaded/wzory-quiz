import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { RootReducer } from '../../../store/types/main';
import { Dispatch } from 'redux';
import { fetchAllEquations } from '../../../store/actions/Equations';
import {
    FetchAllEquations,
    EquationWithId
} from '../../../store/types/Equations';
import UniversalList from '../UniversalList/UniversalList';

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
        return (
            <UniversalList
                actionPath="/add-equation"
                items={this.props.equations}
                url={this.props.url}
            />
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
