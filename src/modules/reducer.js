/* @flow */
// import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'simpler-redux-form';
import auth from './auth';
import nav from './Nav/Action';
import profile from './Form/Action';
import resources from './ScrollSync/Action';

export default {
  routing: routerReducer,
  form,
  auth,
  nav,
  profile,
  resources
};
