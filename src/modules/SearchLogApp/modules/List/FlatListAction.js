/* @flow */
export const LIST_FETCH = 'LIST_FETCH'
export const LIST_FETCH_SUCCESS = 'LIST_FETCH_SUCCESS'
export const LIST_FETCH_REACHED_END = 'LIST_FETCH_REACHED_END'
export const LIST_FETCH_CANCELLED = 'LIST_FETCH_CANCELLED'
export const LIST_FETCH_REJECTED = 'LIST_FETCH_REJECTED'
export const LIST_FETCH_RESET = 'LIST_FETCH_RESET'

const initialState = {
  refreshing: false,
  // payload: [],
  data: [],
  offset: 0,
  limit: 10,
  total: 0,
  downloaded: 0,
  // Function to extract the array from the HTTP response.
  parseForSuggestions: data => (data && data.hits ? data.hits : []),
  // Function to extract the expected total from a search response.  Default to 100 if none can be found.
  parseForExpectedTotal: data => (data && data.total ? data.total : 100),
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LIST_FETCH:
      return {...state, ...action, refreshing: true}
    case LIST_FETCH_SUCCESS:
      const parsedData = state.parseForSuggestions(action.payload)
      const data = state.data.concat(parsedData)
      const total = state.parseForExpectedTotal(action.payload)
      
      if (data.length >= total)
        return state

      return {
        ...state,
        data,
        total,
        downloaded: data.length,
        offset: state.offset + state.limit, 
        refreshing: false
      }
    case LIST_FETCH_REACHED_END:
      return {...state, ...action}
    case LIST_FETCH_CANCELLED:
      return {...state, refreshing: false}
    case LIST_FETCH_RESET:
      return {...initialState}
    case LIST_FETCH_REJECTED:
      return { ...state, error: action.error, refreshing: false }  
    default:
      return state
  }
}

export const listFetch = (filter) => ({
  type: LIST_FETCH,
  ...filter
})

export const listFetchFullfilled = (payload) => ({
  type: LIST_FETCH_SUCCESS,
  payload
})

export const listFetchReachedEnd = (filter) => ({
  type: LIST_FETCH_REACHED_END,
  ...filter
})

export const listCancel = () => ({type: LIST_FETCH_CANCELLED})

export const listReset = () => ({type: LIST_FETCH_RESET})
