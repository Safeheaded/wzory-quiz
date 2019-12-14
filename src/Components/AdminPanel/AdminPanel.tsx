import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { Route, Redirect } from 'react-router';
import { Dispatch } from 'redux';
import { logout } from '../../store/actions/Authorization';
import { LogoutActionType, AuthState } from '../../store/types/Authorization';
import { connect } from 'react-redux';

interface Props {
    logout: () => LogoutActionType;
    isLoggedIn: boolean;
}

const adminPanel = (props: Props) => {
    const onLogout = () => {
        props.logout();
    };

    return (
        <Fragment>
            <Button onClick={onLogout}>Logout</Button>
        </Fragment>
    );
};

const mapStateToProps = ({ authReducer }: { authReducer: AuthState }) => ({
    isLoggedIn: authReducer.isLoggedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(adminPanel);
