/* @flow */
import { combineEpics } from 'redux-observable';
import { authEpic, fetchUserEpic, logoutEpic } from './auth';

export default combineEpics(
  authEpic,
  fetchUserEpic,
  logoutEpic
);
