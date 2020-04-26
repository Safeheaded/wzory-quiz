import ReduxSagaFirebase from 'redux-saga-firebase';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const apiKey = process.env.REACT_APP_apiKey;

const authDomain = process.env.REACT_APP_databaseURL;

const databaseURL = process.env.REACT_APP_databaseURL;

const projectId = process.env.REACT_APP_projectId;

const storageBucket = process.env.REACT_APP_storageBucket;

const messagingSenderId = process.env.REACT_APP_messagingSenderId;

const appId = process.env.REACT_APP_appId;

const measurementId = process.env.REACT_APP_measurementId;

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
