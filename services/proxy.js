/* @flow */
/* eslint no-unused-vars: 0, max-len: 0 */
import { Server, Route, Proxy, Static } from 'rx-web-js/dist/rx-web.node.min';
import path from 'path';

const redditProxyAction = Proxy({
  target: 'https://www.reddit.com',
  pathRewrite: {
    '^/api/reddit': ''
  },
  secure: false,
  changeOrigin: true
});

const pubMedProxyAction = Proxy({
  target: 'https://eutils.ncbi.nlm.nih.gov',
  pathRewrite: {
    '^/api/pubmed': ''
  },
  secure: false,
  changeOrigin: true
});

export default (port: number) => {
  const app = new Server(port);

  app.routes = [
    new Route(
      '/api/reddit/search.json',
      'GET',
      redditProxyAction
    ),
    new Route(
      /^\/api\/pubmed(?:\/|$)/,
      'GET',
      pubMedProxyAction
    )
  ];

  app.statics = [
    new Static('/dist', path.resolve(process.cwd()))
  ];
  return app;
};
