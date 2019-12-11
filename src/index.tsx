import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import './firebaseConfig';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import AuthorizationReducer from './store/reducers/Authorization';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { AuthenticationSaga } from './store/sagas/Authorization';

const theme = createMuiTheme({
    palette: {
        primary: purple
    }
});

const rootReducer = combineReducers({ authReducer: AuthorizationReducer });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(AuthenticationSaga);

const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
