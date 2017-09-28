/* @flow */
import ApiClient from '../../../../helpers/ApiClient';
import { Middleware } from 'rx-web-js/dist/rx-web.min';
import {suggestActions} from '../../../Suggest';
import * as progressActions from '../../../App/ProgressAction';

const apiClient: Axios = new ApiClient();

const processResult = async (task, additionalSuccessCallback, additionalFailureCallback) => {
   // Get the id's.
  const { esearchresult: {idlist} } = task;

  if (typeof idlist === 'undefined' || idlist.length === 0) {
    if (typeof additionalFailureCallback === 'function') additionalFailureCallback();
    return task.store.dispatch(progressActions.hideProgress());
  }

  // Get summaries for all id's.
  const summaries = await apiClient.get(`/api/pubmed/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${idlist.join()}`);
  const results = idlist.map(id => summaries.data.result[id]);
  
  task.store.dispatch(suggestActions.fetchSuggestSuccess(results));
  task.store.dispatch(progressActions.hideProgress());

  if (typeof additionalSuccessCallback === 'function')
    additionalSuccessCallback(results);
}

export const fetchSuggest = new Middleware(
  'pubmed',
  task => {
    task.store.dispatch(progressActions.showProgress());
    task.store.dispatch(suggestActions.fetchSuggest({}));
    return apiClient.get(`/api/pubmed/entrez/eutils/esearch.fcgi?db=pubmed&retmax=10&retmode=json&field=title&term=${task.value}`);
  },
  processResult
);

export const fetchSuggestSelected = new Middleware(
  'pubmedSelected',
  task => {
    task.store.dispatch(progressActions.showProgress());
    task.store.dispatch(suggestActions.fetchSuggestSelected({}));
    return apiClient.get(`/api/pubmed/entrez/eutils/esearch.fcgi?db=pubmed&retmax=10&retmode=json&field=source&term=${task.source}`);
  },
  task => processResult(
    task,
    results => {
      const keys = Object.keys(results[0]);
      const list = results.map(d => keys.map(k => typeof d[k] === 'object' ? JSON.stringify(d[k]) : d[k] ));
      task.store.dispatch(suggestActions.fetchSuggestSelectedSuccess(list));
      task.store.dispatch(suggestActions.setColumns(keys));
      task.store.dispatch(suggestActions.setColumnCount(keys.length));
      task.store.dispatch(suggestActions.setRowCount(list.length));    
    },
    () => task.store.dispatch(suggestActions.fetchSuggestSelectedFail())
  )
);

export const defaultSuggest = new Middleware(
  'DEFAULT_SUGGEST',
  task => apiClient.post(`https://jsonplaceholder.typicode.com/posts`, {}),
  (task) => {}
);