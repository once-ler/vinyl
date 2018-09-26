/* @flow */
import type { MergeFreezeListResult } from '../Util';
import ApiClient from '../../../../helpers/ApiClient';
import { Middleware } from 'rx-web-js/dist/rx-web.min';
import {suggestActions} from '../../../Suggest';
import * as progressActions from '../../../App/ProgressAction';
import {mergeFreezeList} from '../Util';

// export const freezeColumnNames = [ 'lastauthor', 'pubdate', 'fulljournalname', 'title' ];
export const freezeColumnNames = [ 'lastauthor' ];

const apiClient: Axios = new ApiClient();

const processResult = async (task, additionalSuccessCallback, additionalFailureCallback) => {
  if (typeof task.esearchresult === 'undefined' || typeof task.esearchresult.idlist === 'undefined' || task.esearchresult.idlist.length === 0) {
    if (typeof additionalFailureCallback === 'function') additionalFailureCallback();
    task.store.dispatch(suggestActions.fetchSuggestFailed({error: 'No results.'}));
    return task.store.dispatch(progressActions.hideProgress());
  }

  // Get the id's.
  const { esearchresult: {idlist} } = task;

  // Get summaries for all id's.
  const summaries = await apiClient.get(`/api/pubmed/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${idlist.join()}`);
  const results = idlist.map(id => summaries.data.result[id]);
  
  task.store.dispatch(suggestActions.fetchSuggestSuccess(results));
  task.store.dispatch(progressActions.hideProgress());

  if (typeof additionalSuccessCallback === 'function')
    additionalSuccessCallback(results);
};

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
      const result: MergeFreezeListResult = mergeFreezeList(results, freezeColumnNames);
      const {list, keys} = result;

      task.store.dispatch(suggestActions.fetchSuggestSelectedPreSuccess(results));
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
  task => {}
);
