/* eslint-disable no-case-declarations */

import {
  GET_COV_DATA_SUCCEEDED,
  GET_COV_DATA_INCREMENTAL_SUCCEEDED,
} from '../actions/covData';

const leaders = (state = [], action) => {
  switch (action.type) {
  case GET_COV_DATA_SUCCEEDED:
    const prsByAuthor = {};
    Object.values(action.payload.covData).forEach((pr) => {
      prsByAuthor[pr.author] = [pr, ...(prsByAuthor[pr.author] || [])];
    });

    // @TODO... this is O(n ** 2)
    return Object.keys(prsByAuthor)
      .map(author => ({
        author,
        count: prsByAuthor[author].length,
        avg: prsByAuthor[author].reduce((prev, current, index) => {
          const cov = parseFloat(current.cov, 10);
          return ((prev * index) + cov) / (index + 1);
        }, 0),
      }));

  case GET_COV_DATA_INCREMENTAL_SUCCEEDED:
    const pr = action.payload.covData;
    const currentPRsIndex = state.findIndex(x => x.author === pr.author);
    const currentPRs = state[currentPRsIndex];
    let newPRs;

    if (currentPRsIndex >= 0) { // we've seen this author before
      newPRs = Object.assign({}, currentPRs, {
        count: currentPRs.count + 1,
        avg: ((currentPRs.avg * currentPRs.count) + parseFloat(pr.cov, 10)) / (currentPRs.count + 1),
      });
    } else {
      newPRs = {
        author: pr.author,
        count: 1,
        avg: parseFloat(pr.cov, 10),
      };
    }

    return [...state.slice(0, currentPRsIndex), newPRs, ...state.slice(currentPRsIndex + 1, state.length)];
  default:
    return state;
  }
};

export default leaders;
