import ApiClient from '../../../../helpers/ApiClient';
import { Middleware } from 'rx-web-js/dist/rx-web.min';
// import * as suggestActions from '../Action';
import {suggestActions} from '../../../Suggest';
import * as progressActions from '../../../App/ProgressAction';
import {freezeList} from '../Util';

const apiClient: Axios = new ApiClient();

export const fetchSuggest = new Middleware(
  'reddit',
  task => {
    task.store.dispatch(progressActions.showProgress());
    task.store.dispatch(suggestActions.fetchSuggest({}));
    return apiClient.get(`/api/reddit/search.json?q=title:${task.value}&syntax=plain&restrict_sr=true&include_facets=false&limit=10&sr_detail=false`);
  },
  (task) => {
    task.store.dispatch(suggestActions.fetchSuggestSuccess(task.data));
    task.store.dispatch(progressActions.hideProgress());
  }
);

export const fetchSuggestSelected = new Middleware(
  'redditSelected',
  task => {
    task.store.dispatch(progressActions.showProgress());
    task.store.dispatch(suggestActions.fetchSuggestSelected({}));
    return apiClient.get(`/api/reddit/search.json?q=subreddit:${task.data.subreddit}&syntax=plain&restrict_sr=false&include_facets=false&limit=10&sr_detail=false`);
  },
  (task) => {
    if (!task.data || !task.data.children || task.data.children.length === 0) {
      task.store.dispatch(progressActions.hideProgress());
      return task.store.dispatch(suggestActions.fetchSuggestSelectedFail());
    }
    const objs = task.data.children.map(d => d.data);
    const flist = freezeList(objs, [ 'title' ]);
    // const keys = Object.keys(task.data.children[0].data);
    // const list = task.data.children.map((d => keys.map(k => typeof d.data[k] === 'object' ? JSON.stringify(d.data[k], null, '  ') : d.data[k] )));
    const keys = Object.keys(flist[0]);
    const list = flist.map((d => keys.map(k => typeof d[k] === 'object' ? JSON.stringify(d[k], null, '  ') : d[k] )));
    console.log(keys);
    task.store.dispatch(suggestActions.fetchSuggestSelectedSuccess(list));
    task.store.dispatch(suggestActions.setColumns(keys));
    task.store.dispatch(suggestActions.setColumnCount(keys.length));
    task.store.dispatch(suggestActions.setRowCount(list.length));
    task.store.dispatch(progressActions.hideProgress());
  }
);

export const defaultSuggest = new Middleware(
  'DEFAULT_SUGGEST',
  task => apiClient.post(`https://jsonplaceholder.typicode.com/posts`, {}),
  (task) => {}
);
