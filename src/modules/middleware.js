/* @flow */
import {authUser, fetchUser, logoutUser} from './Login/Middleware';
import { fetchSuggest, defaultSuggest } from './Suggest/Middleware';
import { fetchSuggest as redditSuggest, fetchSuggestSelected as redditSelectedSuggest, defaultSuggest as defaultRedditSuggest } from './Suggest/RedditMiddleware';

export default [
  authUser,
  fetchUser,
  logoutUser,
  redditSuggest,
  redditSelectedSuggest,
  defaultRedditSuggest
];
