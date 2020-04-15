import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { firebaseHandler } from '../../firebaseConfig';
import {
    AddEquation,
    EquationWithId,
    FetchEquation,
    ExtendedEquation,
    ExtendedEquationWithId,
    UpdateEquation,
    DeleteEquation,
    FetchEquations
} from '../types/Equations';
import {
    addEquationSuccess,
    addEquationError,
    fetchAllEquationsSuccess,
    fetchAllEquationsError,
    fetchEquationSuccess,
    fetchEquationError,
    updateEquationSuccess,
    updateEquationError,
    deleteEquationSuccess,
    deleteEquationError,
    fetchEquationsDone,
    fetchEquationsSuccess,
    fetchEquationsError,
    fetchEquationDone
} from '../actions/Equations';
import {
    ADD_EQUATION,
    FETCH_ALL_EQUATIONS,
    FETCH_EQUATION,
    UPDATE_EQUATION,
    DELETE_EQUATION,
    FETCH_EQUATIONS
} from '../constants/Equations';
import { firestore } from 'firebase';
import { collectionToArray, getEquations, getEquation } from './utils';

const rsf = firebaseHandler.getRSF();

function* addEquation(action: AddEquation) {
    try {
        const data: firestore.DocumentReference = yield call(
            rsf.firestore.addDocument,
            `Equations/`,
            action.payload
        );
        const addedEquation: EquationWithId = {
            name: action.payload.name,
            equation: action.payload.equation,
            explanations: action.payload.explanations,
            id: data.id
        };
        yield put(addEquationSuccess(addedEquation));
    } catch (error) {
        yield put(addEquationError(error));
    }
}

function* fetchAllEquations() {
    const equations: ExtendedEquationWithId[] = yield select(getEquations);

    if (equations.length !== 0) {
        yield put(fetchEquationsDone());
        return;
    }

    try {
        const data: firebase.firestore.QuerySnapshot = yield call(
            rsf.firestore.getCollection,
            'Equations'
        );
        const equations: ExtendedEquationWithId[] = collectionToArray<
            ExtendedEquationWithId,
            ExtendedEquation
        >(data);
        yield put(fetchAllEquationsSuccess(equations));
    } catch (error) {
        yield put(fetchAllEquationsError(error));
    }
}

function* fetchEquation(action: FetchEquation) {
    const equation = yield select(getEquation(action.payload));

    if (equation) {
        yield put(fetchEquationDone());
        return;
    }

    try {
        const snapshot: firebase.firestore.DocumentSnapshot = yield call(
            rsf.firestore.getDocument,
            `Equations/${action.payload}`
        );
        const fetchedEquation: ExtendedEquationWithId = {
            id: snapshot.id,
            ...(snapshot.data() as ExtendedEquation)
        };
        yield put(fetchEquationSuccess(fetchedEquation));
    } catch (error) {
        yield put(fetchEquationError(error));
    }
}

function* updateEquation(action: UpdateEquation) {
    try {
        yield call(
            rsf.firestore.updateDocument,
            `Equations/${action.payload.id}`,
            action.payload
        );
        yield put(updateEquationSuccess(action.payload));
    } catch (error) {
        yield put(updateEquationError(error));
    }
}

function* fetchEquations(action: FetchEquations) {
    const equations: ExtendedEquationWithId[] = yield select(getEquations);
    const wantedEquations = equations.filter(
        equation => equation.topicRef === action.payload
    );

    if (wantedEquations.length !== 0) {
        yield put(fetchEquationsDone());
        return;
    }

    try {
        const collectionRef = yield firestore().collection('Equations');
        const snapshot: firebase.firestore.QuerySnapshot = yield call(
            rsf.firestore.getCollection,
            collectionRef.where('topicRef', '==', action.payload)
        );
        const equations = collectionToArray<
            ExtendedEquationWithId,
            ExtendedEquation
        >(snapshot);
        yield put(fetchEquationsSuccess(equations));
    } catch (error) {
        yield put(fetchEquationsError(error));
    }
}

function* deleteEquation(action: DeleteEquation) {
    try {
        yield call(rsf.firestore.deleteDocument, `Equations/${action.payload}`);
        yield put(deleteEquationSuccess(action.payload));
    } catch (error) {
        yield put(deleteEquationError(error));
    }
}

export function* EquationsSaga() {
    yield all([
        takeLatest(ADD_EQUATION, addEquation),
        takeLatest(FETCH_ALL_EQUATIONS, fetchAllEquations),
        takeLatest(FETCH_EQUATION, fetchEquation),
        takeLatest(UPDATE_EQUATION, updateEquation),
        takeLatest(DELETE_EQUATION, deleteEquation),
        takeLatest(FETCH_EQUATIONS, fetchEquations)
    ]);
}
