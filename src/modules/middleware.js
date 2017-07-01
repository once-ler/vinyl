/* @flow */
import {authUser, fetchUser, logoutUser} from './Login/Middleware';
import { fetchSuggest, defaultSuggest } from './Suggest/Middleware';
import { fetchSuggest as redditSuggest, fetchSuggestSelected as redditSelectedSuggest, defaultSuggest as defaultRedditSuggest } from './Suggest/Reddit/Middleware';
import { fetchSuggest as pubmedSuggest, fetchSuggestSelected as pubmedSelectedSuggest, defaultSuggest as defaultPubmedSuggest } from './Suggest/PubMed/Middleware';

export default [
  authUser,
  fetchUser,
  logoutUser,
  redditSuggest,
  redditSelectedSuggest,
  defaultRedditSuggest,
  pubmedSuggest,
  pubmedSelectedSuggest,
  defaultPubmedSuggest
];
