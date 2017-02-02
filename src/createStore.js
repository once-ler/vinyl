/* eslint no-undef: 0, flowtype/no-weak-types: 0, max-len: 0 */
import { createStore as _createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import reducer from './modules/reducer';
import rootEpic from './modules/epic';

export default function createStore(history: Object, data: Object): Object {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const middleware = [ reduxRouterMiddleware, epicMiddleware ];

  const finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const store = finalCreateStore(reducer, data);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
    module.hot.accept('./modules/epic', () => {
      epicMiddleware.replaceEpic(require('./modules/epic'));
    });
  }

  return store;
}
