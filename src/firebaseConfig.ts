import ReduxSagaFirebase from 'redux-saga-firebase';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
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
