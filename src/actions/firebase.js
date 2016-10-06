import * as firebase from '../services/firebase';

export const GOT_FIREBASE_REF = 'GOT_FIREBASE_REF';

export const gotFirebaseRef = (firebaseRef) => {
  return { type: GOT_FIREBASE_REF, payload: { firebaseRef } };
};

export const setupFirebase = () => {
  const ref = firebase.init();
  return gotFirebaseRef(ref);
};
