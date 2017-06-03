/* @flow */
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'simpler-redux-form';
import { authReducer as oauth2 } from 'redux-implicit-oauth2'
import auth from './Login/Action';
import theme from './App/Action';
import nav from './Nav/Action';
import profile from './Form/Action';
import resources from './ScrollSync/Action';
import calendar from './Calendar/Action';
import modal from './Modal/Action';
import upload from './FileUpload/Action';
import suggest from './Suggest/Action';

export default {
  routing: routerReducer,
  theme,
  form,
  auth,
  nav,
  profile,
  resources,
  calendar,
  oauth2,
  modal,
  upload,
  suggest
};
