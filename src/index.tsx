import React, { Suspense, Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple, green, blue } from '@material-ui/core/colors';
import './firebaseConfig';
import { Provider } from 'react-redux';
import configureStore from './store/storeConfig';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: green,
        type: 'dark'
    }
});

const Loading: React.FC<any> = () => {
    return <p>Loading...</p>;
};

const store = configureStore();

const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Suspense fallback={<Loading />}>
                <BrowserRouter>
                    <CssBaseline />
                    <App />
                </BrowserRouter>
            </Suspense>
        </ThemeProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
