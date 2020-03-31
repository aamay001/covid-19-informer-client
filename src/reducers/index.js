import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app.reducer';
import covid from './covid.reducer';

export default combineReducers({
  app,
  routing: routerReducer,
  covid,
});
