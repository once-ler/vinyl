ref:
https://www.reddit.com/search.json?q=cats&syntax=plain&type=user&restrict_sr=true&include_facets=false&limit=10&sr_detail=false
https://www.reddit.com/search.json?q=cats&syntax=plain&type=sr&restrict_sr=true&include_facets=false&limit=10&sr_detail=false
https://www.reddit.com/search.json?q=rest&jsonp=callback

data
  children
    data
      public_description
      title

For testing graphql:
/*
ref:
https://medium.com/@clayallsopp/relay-101-building-a-hacker-news-client-bb8b2bdc76e6
https://github.com/clayallsopp/relay-101
https://www.fullstackreact.com/p/using-graphql/
http://nordicapis.com/10-graphql-consoles-in-action/
https://github.com/clayallsopp/graphqlhub/blob/master/graphqlhub-schemas/src/apis/hn.js

test: http://graphqlhub.com/playground/hn

storyType:
  top
  new
  ask
  show
{
  storyType: "top"
}

stories(storyType: $storyType) {

}

{
  graphQLHub
  hn {
    topStories(limit: 1) {
      title
      url
      timeISO
      by {
        id
      }
      kids(limit: 1) {
        timeISO
        by {
          id
        }
        text
      }
    }
  }
}

{
  hn {
    topStories(limit: 5) {
      title,
      score,
      url,
      timeISO,
      by {
        id
      }
    }
  }
}

parseForSuggestions: ({payload}) => (payload.hn.topStories),
parseForErrors: ({payload}) => (payload.error)
*/

/*
Mongo:
{
  suggestMatchQuery: value => ({
    limit: 10,
    match: {
    'id': {
      $regex: value,
      $options: 'i'
    }}
  }),
  emptySuggestInputMatchQuery: {
    limit: 10
  },
  database: '',
  modelName: ''
}
*/

```
import ApiClient from '../../helpers/ApiClient';
import { Middleware } from 'rx-web-js/dist/rx-web.min';
const apiClient: Axios = new ApiClient();

export const fetchSuggest = new Middleware(
  'FETCH_SUGGEST',
  task => apiClient.post(`https://www.graphqlhub.com/graphql`, {
    query: `
      {
        hn {
          topStories(limit: 5) {
            title,
            url
          }
        }
      }
    `
    }),
  (task) => {}
);

  export const defaultSuggest = new Middleware(
  'DEFAULT_SUGGEST',
  task => apiClient.post(`https://jsonplaceholder.typicode.com/posts`, {}),
  (task) => {}
);
```
