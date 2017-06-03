import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import ApiClient from '../../helpers/ApiClient';
const apiClient = new ApiClient();

const FETCH_VIEW_DEF_SUGGEST = 'ops2/viewDefSuggest/FETCH_VIEW_DEF_SUGGEST';
const FETCH_VIEW_DEF_SUGGEST_SUCCESS = 'ops2/viewDefSuggest/FETCH_VIEW_DEF_SUGGEST_SUCCESS';
const FETCH_VIEW_DEF_SUGGEST_FAIL = 'ops2/viewDefSuggest/FETCH_VIEW_DEF_SUGGEST_FAIL';
const UPDATE_INPUT_VALUE = 'ops2/viewDefSuggest/UPDATE_INPUT_VALUE';
const DEFAULT_SUGGESTIONS = 'ops2/viewDefSuggest/DEFAULT_SUGGESTIONS';
export const VIEW_DEF_SUGGEST_SELECTED = 'ops2/viewDefSuggest/VIEW_DEF_SUGGEST_SELECTED';

const initialState = {
  data: [],
  loadedSuggest: false,
  value: '',
  selected: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_VIEW_DEF_SUGGEST:
      return {
        ...state,
        loadingSuggest: true
      };
    case FETCH_VIEW_DEF_SUGGEST_SUCCESS:
      return {
        ...state,
        loadingSuggest: false,
        loadedSuggest: true,
        data: action.result,
        errorSuggest: null
      };
    case FETCH_VIEW_DEF_SUGGEST_FAIL:
      return {
        ...state,
        loadingSuggest: false,
        loadedSuggest: false,
        data: null,
        errorSuggest: action.error
      };
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        value: action.value
      };
    case VIEW_DEF_SUGGEST_SELECTED:
      return {
        ...state,
        selected: action.value
      };
    case DEFAULT_SUGGESTIONS:
      return {
        ...state,
        data: null,
        selected: action.value
      };
    default:
      return state;
  }
}

export const fetchSuggest = (options) => { const {database, modelName, params} = options; return { type: FETCH_VIEW_DEF_SUGGEST, database, modelName, params }; };
export const fetchSuggestSuccess = result => ({ type: FETCH_VIEW_DEF_SUGGEST_SUCCESS, result });
export const fetchSuggestFailed = error => ({ type: FETCH_VIEW_DEF_SUGGEST_FAIL, error });

export const fetchSuggestEpic = action$ =>
  action$.ofType(FETCH_VIEW_DEF_SUGGEST)
    .mergeMap(action => {
      return Observable.fromPromise(
        apiClient.post(`/api/entity/${action.database}/${action.modelName}/suggest`, { data: action.params })
        )
        .map(fetchSuggestSuccess)
        .catch(error => Observable.of(fetchSuggestFailed(error)));
    });
/*
export function isSuggesLoaded(globalState) {
  return globalState.viewDefSuggest && globalState.viewDefSuggest.loadedSuggest;
}
*/
export const updateInputValue = value => ({ type: UPDATE_INPUT_VALUE, value });

export const updateSelected = value => ({ type: VIEW_DEF_SUGGEST_SELECTED, value });

export const defaultSuggestions = value => ({ type: DEFAULT_SUGGESTIONS, value });

export const defaultSelectedEpic = action$ =>
  action$.ofType(DEFAULT_SUGGESTIONS)
    .concatMap(action => Observable.of(updateSelected(action.value)));

