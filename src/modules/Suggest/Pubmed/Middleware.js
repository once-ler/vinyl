import ApiClient from '../../helpers/ApiClient';
import { Middleware } from 'rx-web-js/dist/rx-web.min';
import * as suggestActions from './Action';
import * as progressActions from '../App/ProgressAction';

const apiClient: Axios = new ApiClient();

/*
ref:
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=10&retmode=json&field=title&term=dementia%20alzheimer

https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=10&retmode=json&field=source&term=Neuropharmacology

https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=28647411,28646686

https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=28647411,28646686

https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=28647411,28646686

"28647556",
"28647411",
"28646686",
"28644588",
"28643900",
"28642698",
"28641977",
"28641509",
"28641077",
"28639876"

data
  esearchresult
    count
    restart
    restmax
    idlist

28647556

*/

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
    return apiClient.get(`/api/reddit/search.json?q=title:${task.data.title}&syntax=plain&restrict_sr=false&include_facets=false&limit=10&sr_detail=false`);
  },
  (task) => {
    if (!task.data || !task.data.children || task.data.children.length === 0) {
      return task.store.dispatch(suggestActions.fetchSuggestSelectedFail());
    }
    const keys = Object.keys(task.data.children[0].data);
    const list = task.data.children.map((d => keys.map(k => typeof d.data[k] === 'object' ? JSON.stringify(d.data[k]) : d.data[k] )));
    task.store.dispatch(suggestActions.fetchSuggestSelectedSuccess(list));
    task.store.dispatch(suggestActions.setColumns(keys));
    task.store.dispatch(progressActions.hideProgress());
  }
);

export const defaultSuggest = new Middleware(
  'DEFAULT_SUGGEST',
  task => apiClient.post(`https://jsonplaceholder.typicode.com/posts`, {}),
  (task) => {}
);
