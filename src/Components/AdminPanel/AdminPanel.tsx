import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import {
    Route,
    Redirect,
    Switch,
    withRouter,
    useRouteMatch
} from 'react-router';
import { Dispatch } from 'redux';
import { logout } from '../../store/actions/Authentication';
import { LogoutActionType, AuthState } from '../../store/types/Authentication';
import { connect } from 'react-redux';
import EditPgae from './EditPage/EditPage';
import EquationsList from './EquationsList/EquationsList';
import { RouteComponentProps } from 'react-router-dom';
import SubjectsList from './SubjectsList/SubjectsList';
import { WriteMode } from '../../types/admin';

interface Props {
    logout: () => LogoutActionType;
    isLoggedIn: boolean;
}

const AdminPanel = (props: Props) => {
    const onLogout = () => {
        props.logout();
    };

    const { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/equations/add`}>
                <EditPgae url={url} />
            </Route>
            <Route path={`${path}/equations`}>
                <EquationsList url={url} />
            </Route>
            <Route
                exact
                path={`${path}/edit-equation/:id`}
                component={EditPgae}
            />
            <Route path={`${path}/subjects/edit/:id`}>
                <SubjectsList url={url} />
            </Route>
            <Route path={`${path}/subjects/add`}>
                <SubjectsList url={url} mode={WriteMode.Add} />
            </Route>
            <Route path={`${path}/subjects`}>
                <SubjectsList url={url} />
            </Route>
            <Redirect exact path={path} to={`${url}/equations`} />
        </Switch>
    );
};

const mapStateToProps = ({ authReducer }: { authReducer: AuthState }) => ({
    isLoggedIn: authReducer.isLoggedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
