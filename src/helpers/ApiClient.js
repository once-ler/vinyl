/* @flow */
/* eslint no-undef: 0 */
import axios from 'axios';

const methods = [ 'get', 'post', 'put', 'patch', 'del' ];

const formatUrl = (path: string): string => {
  if (~path.indexOf('jsonplaceholder')) return path;
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return adjustedPath;
};

class _ApiClient extends Object {
  constructor(req: any = {}) {
    super(req);

    methods.forEach((method: string) => {
      this[method] = (path, { params, data, headers, query, variables } = {}): any => {
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

        if (data) {
          cfg.data = data;
        }

        if (headers) {
          Object.assign(cfg.headers, headers);
        }

        if (query && variables) {
          cfg.data = {
            query,
            variables: {
              ...variables
            }
          };
        }

        return axios(cfg);
      };
    });


  }
}

const ApiClient = _ApiClient;

export default ApiClient;
