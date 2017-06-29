/* @flow */
import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './createStore';
import getRoutes from './routes';
import './globalStyles';
import 'react-progress-2/main.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

const store = createStore(browserHistory, window.__data || {});
const history = syncHistoryWithStore(browserHistory, store);

const routes = (
  <Router history={history}>
    {getRoutes(store)}
  </Router>
);
const dest = document.getElementById('root');

render(
  <Provider store={store} key="provider">
    {routes}
  </Provider>,
  dest
);
