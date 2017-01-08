/* @flow */
import { combineEpics } from 'redux-observable';
import { authEpic, fetchUserEpic, logoutEpic } from './auth';

export default combineEpics(
  authEpic,
  fetchUserEpic,
  logoutEpic
)
.catch((error, stream) => {
  // DO SOMETHING WITH THE ERROR HERE
  console.error('Uncaught', error.stack);
  // resume with the errored observable instead of just terminating
  return stream;
});
