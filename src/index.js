/* @flow */
import Inferno from 'inferno';
import { Router } from 'inferno-router';
import { Provider } from 'inferno-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './createStore';
import getRoutes from './routes';

const browserHistory = createBrowserHistory();
const store = createStore(browserHistory, window.__data || {});
const history = syncHistoryWithStore(browserHistory, store);
// Passing history to Router doesn't work,
// but still need to use syncHistoryWithStore().

const routes = (
  <Router history={browserHistory}>
    {getRoutes(store)}
  </Router>
);
const dest = document.getElementById('root');

Inferno.render(
  <Provider store={store} key="provider">
    {routes}
  </Provider>,
  dest
);
