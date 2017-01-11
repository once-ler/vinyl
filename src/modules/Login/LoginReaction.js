import {Route} from 'rx-web-js';
import ApiClient from '../../helpers/ApiClient';

const apiClient: Axios = new ApiClient();

export default () => new Route(
  'LOGIN_REACTION',
  (next, dispatch, action) => {
    apiClient
      .post('/user?oauth_token=${action.session.oauth_token}', action)
      .then(() => dispatch({type: 'LOGIN_SUCCESS'}))
      .catch(() => dispatch({type: 'LOGIN_FAILED'}));
  }
);
