import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import GuardedRoute, { GuardMode } from '../../HOCs/GuardedRoute/GuardedRoute';
import AdminPanel from '../AdminPanel/AdminPanel';
import LoginForm from '../LoginForm/LoginForm';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const Routes: React.SFC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <GuardedRoute
                component={AdminPanel}
                path="/admin"
                redirectTo="/login"
                flow={GuardMode.Unauthenticated}
            />
            {/* <Route path="/admin" component={AdminPanel} /> */}
            <GuardedRoute
                component={LoginForm}
                path="/login"
                redirectTo="/admin"
                flow={GuardMode.Unauthenticated}
            />

            <Route component={NotFoundPage} />
        </Switch>
    );
};

export default Routes;
