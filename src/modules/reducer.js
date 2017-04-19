/* @flow */
// import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'simpler-redux-form';
import auth from './Login/Action';
import theme from './App/Action';
import nav from './Nav/Action';
import profile from './Form/Action';
import resources from './ScrollSync/Action';
import calendar from './Calendar/Action';

export default {
  routing: routerReducer,
  theme,
  form,
  auth,
  nav,
  profile,
  resources,
  calendar
};
