/* eslint no-undef: 0, flowtype/no-weak-types: 0, max-len: 0 */
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducer from './modules/reducer';
import rootEpic from './modules/epic';

export default function createStore(history: Object, data: Object): Object {
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const middleware = [ epicMiddleware ];

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
