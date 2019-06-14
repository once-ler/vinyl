/* @flow */
/* eslint no-unused-vars:0 */
import { combineEpics } from 'redux-observable'
import {listFetchEpic, listFetchReachedEndEpic} from './List/FlatListEpic'
import {fetchSuggestEpic} from './Suggest/SuggestEpic' 

export default combineEpics(
  listFetchEpic,
  listFetchReachedEndEpic,
  fetchSuggestEpic
);