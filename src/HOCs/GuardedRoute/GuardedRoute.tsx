import { Route, RouteComponentProps } from 'react-router-dom';
import { Redirect, useRouteMatch, RouteProps } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';
import { RootReducer } from '../../store/types/main';

interface Props extends RouteProps {
    isLoggedIn: boolean;
    redirectTo: string;
    flow: GuardMode;
}

export enum GuardMode {
    Authenticated,
    Unauthenticated
}

class GuardedRoute extends Route<Props> {
    render() {
        const guardingFlow =
            this.props.flow === GuardMode.Authenticated ? true : false;
        if (this.props.isLoggedIn === guardingFlow) {
            return <Route {...this.props} />;
        } else {
            const redirectComponent = () => (
                <Redirect to={this.props.redirectTo} />
            );
            return (
                <Route
                    {...this.props}
                    component={redirectComponent}
                    render={undefined}
                />
            );
        }
    }
}

const mapStateToProps = (state: RootReducer) => ({
    isLoggedIn: state.authReducer.isLoggedIn
});

export default connect(mapStateToProps)(GuardedRoute);
