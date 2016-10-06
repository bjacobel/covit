import Firebase from 'firebase';
import { FIREBASE_URL } from '../constants';

export const init = () => {
  return Firebase.initializeApp({
    databaseURL: FIREBASE_URL,
  });
};
