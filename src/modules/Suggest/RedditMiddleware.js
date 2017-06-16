import ApiClient from '../../helpers/ApiClient';
import { Middleware } from 'rx-web-js/dist/rx-web.min';
import {fetchSuggestSuccess} from './Action';

const apiClient: Axios = new ApiClient();

/*
ref:
https://www.reddit.com/search.json?q=cats&syntax=plain&type=user&restrict_sr=true&include_facets=false&limit=10&sr_detail=false
https://www.reddit.com/search.json?q=cats&syntax=plain&type=sr&restrict_sr=true&include_facets=false&limit=10&sr_detail=false
https://www.reddit.com/search.json?q=rest&jsonp=callback

data
  children
    data
      public_description
      title
*/

export const fetchSuggest = new Middleware(
  'reddit',
  task => apiClient.get(`/api/reddit/search.json?q=cats&syntax=plain&type=sr&restrict_sr=true&include_facets=false&limit=10&sr_detail=false`),
  (task) => task.store.dispatch(fetchSuggestSuccess(task.data))
);

  export const defaultSuggest = new Middleware(
  'DEFAULT_SUGGEST',
  task => apiClient.post(`https://jsonplaceholder.typicode.com/posts`, {}),
  (task) => {}
);