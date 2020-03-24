import ReduxSagaFirebase from 'redux-saga-firebase';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import isDev from './utils/general';

const apiKey = isDev()
    ? process.env.REACT_APP_DEV_apiKey
    : process.env.REACT_APP_apiKey;

const authDomain = isDev()
    ? process.env.REACT_APP_DEV_databaseURL
    : process.env.REACT_APP_databaseURL;

const databaseURL = isDev()
    ? process.env.REACT_APP_DEV_databaseURL
    : process.env.REACT_APP_databaseURL;

const projectId = isDev()
    ? process.env.REACT_APP_DEV_projectId
    : process.env.REACT_APP_projectId;

const storageBucket = isDev()
    ? process.env.REACT_APP_DEV_storageBucket
    : process.env.REACT_APP_storageBucket;

const messagingSenderId = isDev()
    ? process.env.REACT_APP_DEV_messagingSenderId
    : process.env.REACT_APP_messagingSenderId;

const appId = isDev()
    ? process.env.REACT_APP_DEV_appId
    : process.env.REACT_APP_appId;

const measurementId = isDev()
    ? process.env.REACT_APP_DEV_measurementId
    : process.env.REACT_APP_measurementId;

const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
};

class FirebaseHandler {
    private RSF: ReduxSagaFirebase;

    constructor(config: object) {
        const firebaseApp = firebase.initializeApp(config);
        this.RSF = new ReduxSagaFirebase(firebaseApp);
    }

    public getRSF(): ReduxSagaFirebase {
        return this.RSF;
    }
}

export const firebaseHandler = new FirebaseHandler(firebaseConfig);
