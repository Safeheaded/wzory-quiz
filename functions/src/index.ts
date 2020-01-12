import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ExtendedEquation } from '../../src/store/types/Equations';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/* export const addEquationHandler = functions.firestore
    .document('Equations/{equationId}')
    .onCreate(async (snap, context) => {
        const equation = snap.data() as ExtendedEquation;
        const equationRef = context.params.equationId;
        const db = admin.firestore();
        return db
            .collection(`Subjects`)
            .doc(equation.subjectRef)
            .collection('Topics')
            .doc(equation.topicRef)
            .collection('Equations')
            .add({ ref: equationRef });
    }); */
