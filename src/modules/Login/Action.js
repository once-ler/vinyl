const LOAD = 'vinyl/auth/LOAD';
const LOAD_SUCCESS = 'vinyl/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'vinyl/auth/LOAD_FAIL';
const LOGIN = 'vinyl/auth/LOGIN';
const LOGIN_SUCCESS = 'vinyl/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'vinyl/auth/LOGIN_FAIL';
const LOGOUT = 'vinyl/auth/LOGOUT';
const LOGOUT_SUCCESS = 'vinyl/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'vinyl/auth/LOGOUT_FAIL';
const USER_SET = 'vinyl/auth/USER_SET';
const UPDATE_OAUTH2_CONFIG = 'UPDATE_OAUTH2_CONFIG';

type Action = {
  type: string,
  error?: string | Object,
  result?: Object | void
};
type State = any;

const initialState = {
  loaded: false,
  client: '',
  url: ''
};

export default function reducer(state: State = initialState, action: Action = { type: '' }) {
  switch (action.type) {
    case UPDATE_OAUTH2_CONFIG:
      return {
        ...state,
        url: action.url,
        client: action.client
      }
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        smart: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function logout(event) {
  return {
    type: LOGOUT
  };
}

export const updateOauth2Config = config => ({
  type: UPDATE_OAUTH2_CONFIG,
  ...config
});
