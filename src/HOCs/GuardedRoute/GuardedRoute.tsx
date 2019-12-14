import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';
import { RootReducer } from '../../store/types/main';

interface Props {
    isLoggedIn: boolean;
    component: React.ComponentType;
    path: string;
    redirectTo: string;
    flow: GuardMode;
}

export enum GuardMode {
    authenticated,
    unauthenticated
}

const GuardedRoute: React.SFC<Props> = (props: Props) => {
    const Component = props.component;
    const guardingFlow = props.flow === GuardMode.authenticated ? true : false;

    return (
        <Route
            render={() =>
                props.isLoggedIn === guardingFlow ? (
                    <Component />
                ) : (
                    <Redirect to={props.redirectTo} />
                )
            }
        />
    );
};

const mapStateToProps = (state: RootReducer) => ({
    isLoggedIn: state.authReducer.isLoggedIn
});

export default connect(mapStateToProps)(GuardedRoute);
