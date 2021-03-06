import 'core-js/fn/object/values';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducers';
import { SHOW_DEVTOOLS } from './constants';

const composeEnhancers = (!SHOW_DEVTOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(...[thunk])
));

const rootEl = document.getElementById('main');
const render = () => {
  // See here for explanation of why this require() is needed:
  // https://github.com/reactjs/redux/pull/1455/files#r54380102
  const Main = require('./components/Main').default; // eslint-disable-line global-require

  ReactDOM.render(
    <Provider store={ store }>
      <Main />
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./components/Main', () => {
    render();
  });
}

render();
