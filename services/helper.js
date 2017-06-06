const Axios = require('axios'); 

const graphqlEndpoint = 'https://graphqlhub.com/graphql';

const query = `
{
  graphQLHub
  reddit {
    subreddit(name: "movies"){
      subscribers
      topListings(limit: 20) {
        title
        comments {
          body
          author { 
            username
            commentKarma
          }
        }
      }
    }
  }
}
`;

exports.loadMovies = () => Axios.post(graphqlEndpoint, { query });
