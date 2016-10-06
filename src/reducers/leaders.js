import {
  GET_LEADERS_FAILED,
  GET_LEADERS_SUCCEEDED,
} from '../actions/leaders';

const leaders = (state = [], action) => {
  switch (action.type) {
  case GET_LEADERS_SUCCEEDED:
    return action.payload.leaders;
  case GET_LEADERS_FAILED:
    console.error(action.payload.error);
    return state;
  default:
    return state;
  }
};

export default leaders;
