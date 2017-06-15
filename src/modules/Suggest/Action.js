const FETCH_SUGGEST = 'FETCH_SUGGEST';
const FETCH_SUGGEST_SUCCESS = 'FETCH_SUGGEST_SUCCESS';
const FETCH_SUGGEST_FAIL = 'FETCH_SUGGEST_FAIL';
const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const DEFAULT_SUGGEST = 'DEFAULT_SUGGEST';
const CLEAR_SUGGEST = 'CLEAR_SUGGEST';
export const SUGGEST_SELECTED = 'SUGGEST_SELECTED';

const initialState = {
  data: null,
  loading: false,
  value: '',
  selected: '', // Purpose is to trigger another Action that will download detailed data for suggestion.
  error: null  
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_SUGGEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUGGEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action,
        error: null
      };
    case FETCH_SUGGEST_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
        error: action
      };
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        value: action.value
      };
    case SUGGEST_SELECTED:
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
    case CLEAR_SUGGEST:
      return {
        ...state,
        data: null
      };
    default:
      return state;
  }
}

export const fetchSuggest = params => ({ ...params, type: FETCH_SUGGEST });
export const fetchSuggestSuccess = result => ({ type: FETCH_SUGGEST_SUCCESS, result });
export const fetchSuggestFailed = error => ({ type: FETCH_SUGGEST_FAIL, error });
export const updateInputValue = value => ({ type: UPDATE_INPUT_VALUE, value });
export const updateSelected = value => ({ type: SUGGEST_SELECTED, value });
export const defaultSuggestions = value => ({ type: DEFAULT_SUGGEST, value });
export const clearSuggestions = value => ({ type: CLEAR_SUGGEST, value });
