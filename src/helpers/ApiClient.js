/* @flow */
/* eslint no-undef: 0 */
import axios from 'axios';

const methods = [ 'get', 'post', 'put', 'patch', 'del' ];

function formatUrl(path: string): string {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  // Prepend `/api` to relative URL, to proxy to API server.
  return `/api${adjustedPath}`;
}

class _ApiClient extends Object {
  constructor(req: any = {}) {
    super(req);

    methods.forEach((method: string) => {
      this[method] = (path, { params, data, headers } = {}): any => {
        const cfg = {
          url: formatUrl(path),
          timeout: 20000,
          method,
          responseType: 'json',
          params: {},
          headers: {},
          data: {}
        };

        if (params) {
          cfg.params = params;
        }

        /*
        if (__SERVER__ && req.get('cookie')) {
          cfg.headers = { cookie: req.get('cookie') };
        }
        */

        if (data) {
          cfg.data = data;
        }

        if (headers) {
          Object.assign(cfg.headers, headers);
        }

        return axios(cfg);
      };
    });
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
