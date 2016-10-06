import {
  loadingStarted,
  loadingEnded,
} from './loading';
import { getLeaders } from '../services/leaders';

export const GET_LEADERS_FAILED = 'GET_LEADERS_FAILED';
export const GET_LEADERS_SUCCEEDED = 'GET_LEADERS_SUCCEEDED';

export const getLeadersSucceeded = (leaders) => {
  return { type: GET_LEADERS_SUCCEEDED, payload: { leaders } };
};

export const getLeadersFailed = (err) => {
  return { type: GET_LEADERS_FAILED, payload: { err }, error: true };
};

export const getLeadersAsync = () => {
  return (dispatch) => {
    dispatch(loadingStarted());

    return getLeaders()
      .then((leaders) => {
        dispatch(loadingEnded());
        dispatch(getLeadersSucceeded(leaders));
      })
      .catch((err) => {
        dispatch(loadingEnded());
        dispatch(getLeadersFailed(err));
      });
  };
};
