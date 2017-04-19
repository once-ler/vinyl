/* @flow */
/* eslint no-unused-vars: 0, max-len: 0, flowtype/no-weak-types: 0 */
// import { Observable } from 'rxjs';
// import { ActionsObservable } from 'redux-observable';
import { Middleware } from 'rx-web-js/dist/rx-web.min';
import { Axios } from 'axios';
import ApiClient from '../../helpers/ApiClient';

const apiClient: Axios = new ApiClient();

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