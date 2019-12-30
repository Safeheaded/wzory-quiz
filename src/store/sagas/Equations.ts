import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { firebaseHandler } from '../../firebaseConfig';
import {
    AddEquation,
    EquationWithId,
    FetchEquation,
    ExtendedEquation,
    ExtendedEquationWithId,
    UpdateEquation,
    DeleteEquation
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
    deleteEquationError
} from '../actions/Equations';
import {
    ADD_EQUATION,
    FETCH_ALL_EQUATIONS,
    FETCH_EQUATION,
    UPDATE_EQUATION,
    DELETE_EQUATION
} from '../constants/Equations';
import firebase, { database } from 'firebase/app';

const rsf = firebaseHandler.getRSF();

function* addEquation(action: AddEquation) {
    try {
        const data: firebase.firestore.DocumentReference = yield call(
            rsf.firestore.addDocument,
            `Equations/`,
            action.payload
        );
        const addedEquation: EquationWithId = {
            equation: action.payload.equation,
            explanation: action.payload.explanation,
            id: data.id
        };
        yield put(addEquationSuccess(addedEquation));
    } catch (error) {
        yield put(addEquationError(error));
    }
}

function* fetchAllEquations() {
    try {
        const data: firebase.firestore.QuerySnapshot = yield call(
            rsf.firestore.getCollection,
            'Equations'
        );
        const equations: ExtendedEquationWithId[] = [];
        data.forEach(equation => {
            const fetchedEquation: ExtendedEquationWithId = {
                id: equation.id,
                ...(equation.data() as ExtendedEquation)
            };
            equations.push(fetchedEquation);
        });
        yield put(fetchAllEquationsSuccess(equations));
    } catch (error) {
        yield put(fetchAllEquationsError(error));
    }
}

function* fetchEquation(action: FetchEquation) {
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
        takeLatest(DELETE_EQUATION, deleteEquation)
    ]);
}
