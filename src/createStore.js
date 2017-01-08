/* eslint no-undef: 0, flowtype/no-weak-types: 0, max-len: 0 */
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

export default function createStore(history: Object, data: Object): Object {
  const rootEpic = require('./modules/epic');
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const middleware = [ epicMiddleware ];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('./modules/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer, data);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
    module.hot.accept('./modules/epic', () => {
      epicMiddleware.replaceEpic(require('./modules/epic'));
    });
  }

  return store;
}
