import React, { Fragment } from 'react';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import {
    Route,
    Redirect,
    Switch,
    withRouter,
    useRouteMatch,
    useHistory
} from 'react-router';
import { Dispatch } from 'redux';
import { logout } from '../../store/actions/Authentication';
import { LogoutActionType, AuthState } from '../../store/types/Authentication';
import { connect } from 'react-redux';
import EditPgae from './EditPage/EditPage';
import EquationsList from './EquationsList/EquationsList';
import SubjectsList from './SubjectsList/SubjectsList';
import { WriteMode } from '../../types/admin';
import TopicsList from './TopicsList/TopicsList';

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
        <Fragment>
            <Switch>
                <Route path={`${path}/topics/add`}>
                    <TopicsList url={url} mode={WriteMode.Add} />
                </Route>
                <Route path={`${path}/topics/:id`}>
                    <TopicsList url={url} />
                </Route>
                <Route path={`${path}/topics`}>
                    <TopicsList url={url} />
                </Route>

                <Route path={`${path}/equations/add`}>
                    <EditPgae url={url} />
                </Route>
                <Route
                    exact
                    path={`${path}/equations/:id`}
                    component={EditPgae}
                />
                <Route path={`${path}/equations`}>
                    <EquationsList url={url} />
                </Route>
                <Route path={`${path}/subjects/add`}>
                    <SubjectsList url={url} mode={WriteMode.Add} />
                </Route>
                <Route path={`${path}/subjects/:id`}>
                    <SubjectsList url={url} mode={WriteMode.Edit} />
                </Route>
                <Route path={`${path}/subjects`}>
                    <SubjectsList url={url} />
                </Route>
                <Redirect exact path={path} to={`${url}/equations`} />
            </Switch>
        </Fragment>
    );
};

const mapStateToProps = ({ authReducer }: { authReducer: AuthState }) => ({
    isLoggedIn: authReducer.isLoggedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
