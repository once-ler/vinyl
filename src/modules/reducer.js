/* @flow */
import { combineReducers } from 'redux';
import { reducer as form } from 'simpler-redux-form';
import auth from './auth';
import nav from './App/Action';
import profile from './Form/Action';

export default combineReducers({
  form,
  auth,
  nav,
  profile
});
