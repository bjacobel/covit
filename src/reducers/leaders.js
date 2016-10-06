/* eslint-disable no-case-declarations */

import {
  GET_COV_DATA_SUCCEEDED,
  GET_COV_DATA_INCREMENTAL_SUCCEEDED,
} from '../actions/covData';

const leaders = (state = [], action) => {
  switch (action.type) {
  case GET_COV_DATA_SUCCEEDED:
    const prsByAuthor = {};
    action.payload.covData.forEach((pr) => {
      prsByAuthor[pr.author] = [pr, ...(prsByAuthor[pr.author] || [])];
    });

    return Object.keys(prsByAuthor)
      .map(author => ({
        author,
        count: prsByAuthor[author].length,
        avg: prsByAuthor[author].reduce((prev, current, index) => ((prev * index) + current.cov) / (index + 1), 0),
      }));

  case GET_COV_DATA_INCREMENTAL_SUCCEEDED:
    const pr = action.payload.covData;
    const currentPRs = state[pr.author]; // @TODO: this is an array, not an object
    const newPRs = Object.assign({}, currentPRs, {
      prs: currentPRs.prs + 1,
      avg: ((currentPRs.avg * currentPRs.count) + pr.cov) / (currentPRs.prs + 1),
    });

    return Object.assign({}, state, { [state[pr.author]]: newPRs });
  default:
    return state;
  }
};

export default leaders;
