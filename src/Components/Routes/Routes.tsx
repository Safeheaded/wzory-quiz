import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import GuardedRoute, { GuardMode } from '../../HOCs/GuardedRoute/GuardedRoute';
import AdminPanel from '../AdminPanel/AdminPanel';
import LoginForm from '../LoginForm/LoginForm';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import QuizHome from '../QuizHome/QuizHome';

const Routes: React.SFC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <GuardedRoute
                component={AdminPanel}
                path="/admin"
                redirectTo="/login"
                flow={GuardMode.Authenticated}
            />

            <GuardedRoute
                component={LoginForm}
                path="/login"
                redirectTo="/admin"
                flow={GuardMode.Unauthenticated}
            />

            <Route path="/quiz" component={QuizHome} />

            <Route path="/:subjectName/:topicName/:id" component={Home} />
            <Route path="/:subjectName/:topicName" component={Home} />
            <Route path="/:subjectName" component={Home} />

            <Route component={NotFoundPage} />
        </Switch>
    );
};

export default Routes;
