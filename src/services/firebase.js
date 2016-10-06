import Firebase from 'firebase';
import { FIREBASE_URL } from '../constants';

export const init = () => {
  return Firebase.initializeApp({
    databaseURL: FIREBASE_URL,
  });
};

export const getPRs = (firebaseRef) => {  // eslint-disable-line import/prefer-default-export
  const prsCollection = firebaseRef.database().ref('prs');
  return {
    prsCollection,
    prsPromise: prsCollection.once('value').then(value => value.val()),
  };
};
