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

import {
  fetchSuggest as customLoggingSuggest,
  fetchSuggestSelected as customLoggingSelectedSuggest,
  defaultSuggest as defaultCustomLoggingSuggest
} from './App/CustomLoggingSearch/Middleware';

export default [
  redditSuggest,
  redditSelectedSuggest,
  defaultRedditSuggest,
  pubmedSuggest,
  pubmedSelectedSuggest,
  defaultPubmedSuggest,
  customLoggingSuggest,
  customLoggingSelectedSuggest,
  defaultCustomLoggingSuggest
];
