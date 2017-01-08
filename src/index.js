import Inferno from 'inferno';
import { Router } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'inferno-redux';
import createStore from './createStore';
import getRoutes from './routes';

const browserHistory = createBrowserHistory();
const store = createStore(browserHistory, window.__data || {});

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
