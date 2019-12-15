import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { Route, Redirect, Switch } from 'react-router';
import { Dispatch } from 'redux';
import { logout } from '../../store/actions/Authentication';
import { LogoutActionType, AuthState } from '../../store/types/Authentication';
import { connect } from 'react-redux';
import MainPage from './MainPage/MainPage';

interface Props {
    logout: () => LogoutActionType;
    isLoggedIn: boolean;
}

const adminPanel = (props: Props) => {
    const onLogout = () => {
        props.logout();
    };

    return (
        <Switch>
            <Route path="/" component={MainPage} />
        </Switch>
    );
};

const mapStateToProps = ({ authReducer }: { authReducer: AuthState }) => ({
    isLoggedIn: authReducer.isLoggedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(adminPanel);
