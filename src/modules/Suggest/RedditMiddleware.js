import ApiClient from '../../helpers/ApiClient';
import { Middleware } from 'rx-web-js/dist/rx-web.min';
import {fetchSuggestSuccess, fetchSuggestSelectedSuccess, fetchSuggestSelectedFail} from './Action';
import * as scrollSyncActions from '../ScrollSync/Action';

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
  task => apiClient.get(`/api/reddit/search.json?q=title:${task.value}&syntax=plain&restrict_sr=true&include_facets=false&limit=10&sr_detail=false`),
  (task) => task.store.dispatch(fetchSuggestSuccess(task.data))
);

export const fetchSuggestSelected = new Middleware(
  'redditSelected',
  task => apiClient.get(`/api/reddit/search.json?q=title:${task.data.title}&syntax=plain&restrict_sr=false&include_facets=false&limit=10&sr_detail=false`),
  (task) => {
    if (!task.data || !task.data.children || task.data.children.length === 0) {
      return task.store.dispatch(fetchSuggestSelectedFail());
    }
    const keys = Object.keys(task.data.children[0].data);
    const list = task.data.children.map((d => keys.map(k => typeof d.data[k] === 'object' ? JSON.stringify(d.data[k]) : d.data[k] )));
    task.store.dispatch(fetchSuggestSelectedSuccess(list));
    scrollSyncActions.setList(list);
    scrollSyncActions.setColumns(keys);
  }
);

export const defaultSuggest = new Middleware(
  'DEFAULT_SUGGEST',
  task => apiClient.post(`https://jsonplaceholder.typicode.com/posts`, {}),
  (task) => {}
);
