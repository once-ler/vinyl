/*
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import ApiClient from '../../helpers/ApiClient';
const apiClient = new ApiClient();
*/

const FETCH_SUGGEST = 'vinyl/suggest/FETCH_SUGGEST';
const FETCH_SUGGEST_SUCCESS = 'vinyl/suggest/FETCH_SUGGEST_SUCCESS';
const FETCH_SUGGEST_FAIL = 'vinyl/suggest/FETCH_SUGGEST_FAIL';
const UPDATE_INPUT_VALUE = 'vinyl/suggest/UPDATE_INPUT_VALUE';
const DEFAULT_SUGGEST = 'vinyl/suggest/DEFAULT_SUGGEST';
export const VIEW_DEF_SUGGEST_SELECTED = 'vinyl/suggest/VIEW_DEF_SUGGEST_SELECTED';

const initialState = {
  data: [],
  loadedSuggest: false,
  value: '',
  selected: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_SUGGEST:
      return {
        ...state,
        loadingSuggest: true
      };
    case FETCH_SUGGEST_SUCCESS:
      return {
        ...state,
        loadingSuggest: false,
        loadedSuggest: true,
        data: action.result,
        errorSuggest: null
      };
    case FETCH_SUGGEST_FAIL:
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
    case DEFAULT_SUGGEST:
      return {
        ...state,
        data: null,
        selected: action.value
      };
    default:
      return state;
  }
}

export const fetchSuggest = (options) => { const {database, modelName, params} = options; return { type: FETCH_SUGGEST, database, modelName, params }; };
export const fetchSuggestSuccess = result => ({ type: FETCH_SUGGEST_SUCCESS, result });
export const fetchSuggestFailed = error => ({ type: FETCH_SUGGEST_FAIL, error });

/*
export const fetchSuggestEpic = action$ =>
  action$.ofType(FETCH_SUGGEST)
    .mergeMap(action => {
      return Observable.fromPromise(
        apiClient.post(`/api/entity/${action.database}/${action.modelName}/suggest`, { data: action.params })
        )
        .map(fetchSuggestSuccess)
        .catch(error => Observable.of(fetchSuggestFailed(error)));
    });
*/
export const updateInputValue = value => ({ type: UPDATE_INPUT_VALUE, value });

export const updateSelected = value => ({ type: VIEW_DEF_SUGGEST_SELECTED, value });

export const defaultSuggestions = value => ({ type: DEFAULT_SUGGEST, value });

/*
export const defaultSelectedEpic = action$ =>
  action$.ofType(DEFAULT_SUGGEST)
    .concatMap(action => Observable.of(updateSelected(action.value)));
*/
