/* @flow */
import {authUser, fetchUser, logoutUser} from './Login/Middleware';

export default [
  authUser,
  fetchUser,
  logoutUser
];
