/* @flow */
import {authUser, fetchUser, logoutUser} from './Login/Middleware';
import { fetchSuggest, defaultSuggest } from './Suggest/Middleware';
import { fetchSuggest as redditSuggest, defaultSuggest as defaultRedditSuggest } from './Suggest/RedditMiddleware';

export default [
  authUser,
  fetchUser,
  logoutUser,
  fetchSuggest,
  defaultSuggest,
  redditSuggest,
  defaultRedditSuggest
];
