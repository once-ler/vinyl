/* @flow */
import {authUser, fetchUser, logoutUser} from './Login/Middleware';
import { fetchSuggest, defaultSuggest } from './Suggest/Middleware';

export default [
  authUser,
  fetchUser,
  logoutUser,
  fetchSuggest,
  defaultSuggest
];
