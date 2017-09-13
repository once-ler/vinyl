/* eslint no-undef: 0, flowtype/no-weak-types: 0, max-len: 0 */
import { createStore as _createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from './reducer';
import rxwebMiddlewares from './middleware';
import { Client } from 'rx-web-js/dist/rx-web.min';

const client = new Client();
client.middlewares = rxwebMiddlewares;
client.start();

export default function createStore(): Object {
  const rxMiddlewares = client.getReduxMiddlewares();
  const rxReducers = client.getReduxReducers();
  const middleware = [].concat(rxMiddlewares);
  const finalReducer = combineReducers({ ...reducer, ...rxReducers });

  const finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const store = finalCreateStore(finalReducer, {});

  return store;
}
