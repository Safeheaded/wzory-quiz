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

export const deleteTopic = functions.https.onCall(async (data, context) => {
    authErrorCheck(context);
    idValidityCheck(data);

    const db = admin.firestore();

    const collectionRef = db.collection('Equations');
    const snapshot = await collectionRef.where('topicRef', '==', data.id).get();
    snapshot.forEach(deleteItems(collectionRef));

    await db
        .collection('Topics')
        .doc(data.id)
        .delete();
    return { id: data.id };
});

export const deleteSubject = functions.https.onCall(async (data, context) => {
    authErrorCheck(context);
    idValidityCheck(data);

    const db = admin.firestore();

    const equationsRef = db.collection('Equations');
    const equationsSnapshot = await equationsRef
        .where('subjectRef ', '==', data.id)
        .get();
    equationsSnapshot.forEach(deleteItems(equationsRef));

    const topicsRef = db.collection('Topics');
    const topicsSnapshot = await topicsRef
        .where('subjectRef', '==', data.id)
        .get();
    topicsSnapshot.forEach(deleteItems(topicsRef));

    await db
        .collection('Subjects')
        .doc(data.id)
        .delete();
    return { id: data.id };
});

function idValidityCheck(data: any) {
    if (!data.id || (data.id as string).length === 0) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'Valid id must be provided'
        );
    }
}

function authErrorCheck(context: functions.https.CallableContext) {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'You must login before making changes to database '
        );
    }
}

function deleteItems(
    ref: FirebaseFirestore.CollectionReference
): (result: FirebaseFirestore.QueryDocumentSnapshot) => void {
    return async doc => {
        await ref.doc(doc.id).delete();
    };
}
