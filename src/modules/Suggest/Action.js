const FETCH_SUGGEST = 'FETCH_SUGGEST';
const FETCH_SUGGEST_SUCCESS = 'FETCH_SUGGEST_SUCCESS';
const FETCH_SUGGEST_FAIL = 'FETCH_SUGGEST_FAIL';
const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const DEFAULT_SUGGEST = 'DEFAULT_SUGGEST';
const CLEAR_SUGGEST = 'CLEAR_SUGGEST';
export const VIEW_DEF_SUGGEST_SELECTED = 'VIEW_DEF_SUGGEST_SELECTED';

const initialState = {
  data: [],
  loadedSuggest: false,
  value: '',
  selected: '',
  suggestMatchQuery: value => ({
    limit: 10,
    match: {
    'id': {
      $regex: value,
      $options: 'i'
    }}
  }),
  emptySuggestInputMatchQuery: {
    limit: 10
  },
  database: '',
  modelName: '',
  getSuggestions: ({payload}) => (payload.hn.topStories)
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
        data: state.getSuggestions(action),
        errorSuggest: null
      };
    case FETCH_SUGGEST_FAIL:
      console.error(action);
      return {
        ...state,
        loadingSuggest: false,
        loadedSuggest: false,
        data: null,
        errorSuggest: action.error
      };
    case UPDATE_INPUT_VALUE:
      console.log(action.value);
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
    case CLEAR_SUGGEST:
      return {
        ...state,
        data: null
      };
    default:
      return state;
  }
}

export const fetchSuggest = (options) => { console.log(options); const {database, modelName, params} = options; return { type: FETCH_SUGGEST, database, modelName, params }; };
export const fetchSuggestSuccess = result => ({ type: FETCH_SUGGEST_SUCCESS, result });
export const fetchSuggestFailed = error => ({ type: FETCH_SUGGEST_FAIL, error });
export const updateInputValue = value => ({ type: UPDATE_INPUT_VALUE, value });
export const updateSelected = value => ({ type: VIEW_DEF_SUGGEST_SELECTED, value });
export const defaultSuggestions = value => ({ type: DEFAULT_SUGGEST, value });
export const clearSuggestions = value => ({ type: CLEAR_SUGGEST, value });

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
/*
export const defaultSelectedEpic = action$ =>
  action$.ofType(DEFAULT_SUGGEST)
    .concatMap(action => Observable.of(updateSelected(action.value)));
*/
