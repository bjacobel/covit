export const getLeaders = (firebaseRef) => {  // eslint-disable-line import/prefer-default-export
  const leadersCollection = firebaseRef.database().ref('leaders');
  return {
    leadersCollection,
    leadersPromise: leadersCollection.once('value').then(value => value.val()),
  }
};
