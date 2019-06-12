/* @flow */
import type { MergeFreezeListResult } from '../Util';
import ApiClient from '../../../../helpers/ApiClient';
import { Middleware } from 'rx-web-js/dist/rx-web.min';
import {suggestActions} from '../../../Suggest';
import * as progressActions from '../../../App/ProgressAction';
import {mergeFreezeList} from '../Util';

export const freezeColumnNames = [ 'study_id' ];

const apiClient: Axios = new ApiClient();

export const fetchSuggest = new Middleware(
  'logging',
  task => {
    task.store.dispatch(progressActions.showProgress());
    task.store.dispatch(suggestActions.fetchSuggest({}));
    return apiClient.get(`/api/logging?q=study_id:*${task.value}*&limit=10`);
  },
  (task) => {
    task.store.dispatch(suggestActions.fetchSuggestSuccess(task.data));
    task.store.dispatch(progressActions.hideProgress());
  }
);

export const fetchSuggestSelected = new Middleware(
  'loggingSelected',
  task => {
    task.store.dispatch(progressActions.showProgress());
    task.store.dispatch(suggestActions.fetchSuggestSelected({}));
    return apiClient.get(`/api/logging?q=study_id:${task.data.study_id}&limit=999`);
  },
  (task) => {
    if (!task.data || !task.data.children || task.data.children.length === 0) {
      task.store.dispatch(progressActions.hideProgress());
      return task.store.dispatch(suggestActions.fetchSuggestSelectedFail());
    }
    const objs = task.data.children.map(d => d.data);
    const result: MergeFreezeListResult = mergeFreezeList(objs, freezeColumnNames);
    const {list, keys} = result;

    task.store.dispatch(suggestActions.fetchSuggestSelectedPreSuccess(objs));
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
