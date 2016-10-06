import { combineReducers } from 'redux';

import leaders from './leaders';
import loading from './loading';
import firebaseRef from './firebaseRef';

export default combineReducers({
  loading,
  leaders,
  firebaseRef,
});
