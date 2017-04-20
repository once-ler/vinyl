/* eslint no-undef: 0, flowtype/no-weak-types: 0, max-len: 0 */
import { createStore as _createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { authMiddleware } from 'redux-implicit-oauth2'
import reducer from './modules/reducer';
import rxwebMiddlewares from './modules/middleware';
import { Client } from 'rx-web-js/dist/rx-web.min';

const client = new Client();
client.middlewares = rxwebMiddlewares;
client.start();

export default function createStore(history: Object, data: Object): Object {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);
  const rxMiddlewares = client.getReduxMiddlewares();
  const rxReducers = client.getReduxReducers();
  const middleware = [ reduxRouterMiddleware, authMiddleware ].concat(rxMiddlewares);
  const finalReducer = combineReducers({ ...reducer, ...rxReducers });

  const finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const store = finalCreateStore(finalReducer, data);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
