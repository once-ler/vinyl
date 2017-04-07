/* @flow */
/* eslint no-unused-vars: 0, max-len: 0, flowtype/no-weak-types: 0 */
// import { Observable } from 'rxjs';
// import { ActionsObservable } from 'redux-observable';
import { Middleware } from 'rx-web-js/dist/rx-web.min';
import { Axios } from 'axios';
import ApiClient from '../helpers/ApiClient';

const apiClient: Axios = new ApiClient();

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

type Action = {
  type: string,
  error?: string | Object,
  result?: Object | void
};
type State = any;

const initialState = {
  loaded: false
};

export default function reducer(state: State = initialState, action: Action = { type: '' }) {
  switch (action.type) {
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

export function isLoaded(globalState: State) {
  return globalState.auth && globalState.auth.loaded;
}

// TODO: replace promise with observable
/*
export function load() {
  return {
    types: [ LOAD, LOAD_SUCCESS, LOAD_FAIL ],
    promise: client => client.get('/api/loadAuth')
  };
}
*/

/*
// TODO: replace promise with observable
export function login(name: string) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client => client.post('/login', {
      data: { name }
    })
  };
}
*/

// TODO: replace promise with observable
export function logout() {
  return {
    type: LOGOUT
  };
}

export function login(name: string, password: string = '') {
  return {
    type: 'authUser',
    payload: { data: { name, password } }
  };
}

function setSession(session) {
  return {
    type: LOGIN_SUCCESS,
    session
  };
}

function setUser(user) {
  return {
    type: USER_SET,
    user
  };
}

function setError(error) {
  return {
    types: [ LOGIN_FAIL, LOGOUT_FAIL ],
    error
  };
}

function setLogout() {
  return {
    type: LOGOUT_SUCCESS
  };
}

// GET /posts/1/comments?_start=20&_limit=10 (slice)
// https://jsonplaceholder.typicode.com/comments
// https://jsonplaceholder.typicode.com/posts
export const authUser = new Middleware(
  'authUser',
  task => apiClient.post(`https://jsonplaceholder.typicode.com/posts`, {}),
  (task) => {console.info(task.store.getState());}
);

export const fetchUser = new Middleware(
  'fetchUser',
  task => apiClient.get(`https://jsonplaceholder.typicode.com/users/3`),
  () => {}
);

export const logoutUser = new Middleware(
  'logoutUser',
  task => apiClient.post(`https://jsonplaceholder.typicode.com/posts`, {}),
  () => {}
);

/*
export const authEpic = (action$: ActionsObservable) =>
  action$.ofType(LOGIN)
    .mergeMap(({ payload }) =>
      Observable.from(apiClient.post('/login', payload))
        .map(setSession)
        .catch(error => Observable.of(setError(error)))
    );

export const fetchUserEpic = (action$: ActionsObservable) =>
  action$.ofType(LOGIN_SUCCESS)
    .mergeMap(action =>
      Observable.from(apiClient.post('/user?oauth_token=${action.session.oauth_token}'))
        .map(({ response }) => setUser(response))
        .catch(error => Observable.of(setError(error)))
    );

export const logoutEpic = (action$: ActionsObservable) =>
  action$.ofType(LOGOUT)
    .mergeMap(() =>
      Observable.from(apiClient.get('/logout'))
        .map(setLogout)
        .catch(error => Observable.of(setError(error)))
    );
*/