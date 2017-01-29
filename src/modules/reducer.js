/* @flow */
import { combineReducers } from 'redux';
import { reducer as form } from 'simpler-redux-form';
import auth from './auth';
import profile from './Form/Action';

export default combineReducers({
  form,
  auth,
  profile
});
