import Firebase from 'firebase';

export const init = () => {
  return Firebase.initializeApp({
    databaseURL: 'https://covit-ddae8.firebaseio.com/',
  });
};
