import {
  GOT_FIREBASE_REF,
} from '../actions/firebase';

export default (state = {}, action) => {
  switch (action.type) {
  case GOT_FIREBASE_REF:
    return action.payload.firebaseRef;
  default:
    return state;
  }
};
