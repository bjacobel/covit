import {
  loadingStarted,
  loadingEnded,
} from './loading';
import { getPRs } from '../services/firebase';
import { setupFirebase } from '../actions/firebase';

export const GET_COV_DATA_FAILED = 'GET_COV_DATA_FAILED';
export const GET_COV_DATA_SUCCEEDED = 'GET_COV_DATA_SUCCEEDED';
export const GET_COV_DATA_INCREMENTAL_SUCCEEDED = 'GET_COV_DATA_INCREMENTAL_SUCCEEDED';

export const getCovDataSucceeded = (covData) => {
  return { type: GET_COV_DATA_SUCCEEDED, payload: { covData } };
};

export const getCovDataIncrementalSucceeded = (covData) => {
  return { type: GET_COV_DATA_INCREMENTAL_SUCCEEDED, payload: { covData } };
};

export const getCovDataFailed = (err) => {
  console.error(err);
  console.trace(err);
  // return { type: GET_COV_DATA_FAILED, payload: { err }, error: true };
};

export const getCovDataAsync = () => {
  return (dispatch, getState) => {
    dispatch(loadingStarted());
    dispatch(setupFirebase());

    const { prsCollection, prsPromise } = getPRs(getState().firebaseRef);

    // This will keep us in sync with Firebase
    prsCollection.on('child_added', (child) => {
      dispatch(getCovDataIncrementalSucceeded(child.val()));
    });

    return prsPromise
      .then((prs) => {
        dispatch(loadingEnded());
        dispatch(getCovDataSucceeded(prs));
      })
      .catch((err) => {
        dispatch(loadingEnded());
        dispatch(getCovDataFailed(err));
      });
  };
};
