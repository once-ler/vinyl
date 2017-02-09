/* @flow */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'simpler-redux-form';
import auth from './auth';
import nav from './Nav/Action';
import profile from './Form/Action';

export default combineReducers({
  routing: routerReducer,
  form,
  auth,
  nav,
  profile
});
