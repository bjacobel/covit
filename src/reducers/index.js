import { combineReducers } from 'redux';

import leaders from './leaders';
import loading from './loading';

export default combineReducers({
  loading,
  leaders,
});
