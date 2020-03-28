/* eslint
  import/no-extraneous-dependencies: 0,
  global-require: 0,
  no-underscore-dangle: 0,
  no-console: 0,
*/
/* globals window */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import reducers from './reducers';
import constants from './config/constants';

const { ENVIRONMENT: { DEVELOPMENT } } = constants;

let middleware;
const history = createBrowserHistory();
const routing = routerMiddleware(history);
let composeEnhancers;
if (process.env.REACT_APP_ENV === DEVELOPMENT) {
  console.log(DEVELOPMENT);
  const { createLogger } = require('redux-logger');
  middleware = [createLogger(), thunk, routing];
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  middleware = [thunk, routing];
  composeEnhancers = compose;
}

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, enhancer);
syncHistoryWithStore(history, store);

export { store, history };
export default { store, history };
