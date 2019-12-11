import { combineReducers, createStore, applyMiddleware } from 'redux';
import AuthorizationReducer from './reducers/Authorization';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AuthenticationSaga } from './sagas/Authorization';

export default function configureStore() {
    const rootReducer = combineReducers({ authReducer: AuthorizationReducer });
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(AuthenticationSaga);
    return store;
}
