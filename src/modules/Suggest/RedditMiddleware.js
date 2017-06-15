import ApiClient from '../../helpers/ApiClient';
import { Middleware } from 'rx-web-js/dist/rx-web.min';

const apiClient: Axios = new ApiClient();

/*
ref:
https://www.reddit.com/search.json?q=cats&syntax=plain&type=user&restrict_sr=true&include_facets=false&limit=10&sr_detail=false

https://www.reddit.com/search.json?q=cats&syntax=plain&type=sr&restrict_sr=true&include_facets=false&limit=10&sr_detail=false
*/

export const fetchSuggest = new Middleware(
  'FETCH_SUGGEST',
  task => apiClient.get(`/api/search.json?q=cats&syntax=plain&type=sr&restrict_sr=true&include_facets=false&limit=10&sr_detail=false`),
  (task) => {}
);

  export const defaultSuggest = new Middleware(
  'DEFAULT_SUGGEST',
  task => apiClient.post(`https://jsonplaceholder.typicode.com/posts`, {}),
  (task) => {}
);
