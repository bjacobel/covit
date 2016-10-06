import {
  GET_LEADERS_FAILED,
  GET_LEADERS_SUCCEEDED,
} from '../actions/leaders';

const leaders = (state = {}, action) => {
  switch (action.type) {
  case GET_LEADERS_SUCCEEDED:
    return Object.assign({}, state, {
      content: action.payload.leaders,
      error: false,
    });
  case GET_LEADERS_FAILED:
    return Object.assign({}, state, {
      content: null,
      error: action.payload.error,
    });
  default:
    return state;
  }
};

export default leaders;
