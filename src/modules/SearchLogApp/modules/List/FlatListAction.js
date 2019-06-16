/* @flow */
export const LIST_FETCH = 'LIST_FETCH'
export const LIST_FETCH_SUCCESS = 'LIST_FETCH_SUCCESS'
export const LIST_FETCH_REACHED_END = 'LIST_FETCH_REACHED_END'
export const LIST_FETCH_CANCELLED = 'LIST_FETCH_CANCELLED'
export const LIST_FETCH_REJECTED = 'LIST_FETCH_REJECTED'
export const LIST_FETCH_RESET = 'LIST_FETCH_RESET'

const initialState = {
  refreshing: false,
  payload: [],
  offset: 0,
  limit: 10
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LIST_FETCH:
      return {...state, ...action, refreshing: true}
    case LIST_FETCH_SUCCESS:
      const payload = state.payload.concat(action.payload)
      console.log(payload)
      return {...state, payload, offset: offset + limit, refreshing: false}
    case LIST_FETCH_REACHED_END:
      console.log('LIST_FETCH_REACHED_END')
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
