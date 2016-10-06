import {
  loadingStarted,
  loadingEnded,
} from './loading';
import { getLeaders } from '../services/leaders';
import { setupFirebase } from '../actions/firebase';

export const GET_LEADERS_FAILED = 'GET_LEADERS_FAILED';
export const GET_LEADERS_SUCCEEDED = 'GET_LEADERS_SUCCEEDED';

export const getLeadersSucceeded = (leaders) => {
  return { type: GET_LEADERS_SUCCEEDED, payload: { leaders } };
};

export const getLeadersFailed = (err) => {
  return { type: GET_LEADERS_FAILED, payload: { err }, error: true };
};

export const getLeadersAsync = () => {
  return (dispatch, getState) => {
    dispatch(loadingStarted());
    dispatch(setupFirebase());

    const { leadersCollection, leadersPromise } = getLeaders(getState().firebaseRef);

    // This will keep us in sync with Firebase
    leadersCollection.on('value', (snapshot) => {
      dispatch(getLeadersSucceeded(snapshot.val()));
    });

    return leadersPromise
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
