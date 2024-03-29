import { combineReducers, createStore, applyMiddleware } from 'redux';
import AuthorizationReducer from './reducers/Authentication';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from './sagas';
import EquationsReducer from './reducers/Equations';
import SubjectsReducer from './reducers/Subjects';
import TopicsReducer from './reducers/Topics';

export default function configureStore() {
    const rootReducer = combineReducers({
        authReducer: AuthorizationReducer,
        eqReducer: EquationsReducer,
        subjectsReducer: SubjectsReducer,
        topicsReducer: TopicsReducer
    });
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);
    return store;
}
