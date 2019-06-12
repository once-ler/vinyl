/* @flow */
/* eslint max-len: 0 */
import {
  fetchSuggest as redditSuggest,
  fetchSuggestSelected as redditSelectedSuggest,
  defaultSuggest as defaultRedditSuggest
} from './App/Reddit/Middleware';

import {
  fetchSuggest as pubmedSuggest,
  fetchSuggestSelected as pubmedSelectedSuggest,
  defaultSuggest as defaultPubmedSuggest
} from './App/PubMed/Middleware';

export default [
  redditSuggest,
  redditSelectedSuggest,
  defaultRedditSuggest,
  pubmedSuggest,
  pubmedSelectedSuggest,
  defaultPubmedSuggest,
  customLoggingSuggest
];
