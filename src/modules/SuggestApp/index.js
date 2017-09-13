/* @flow */
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './createStore';
import '../../globalStyles';
import 'react-progress-2/main.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import App from './App/App';

const store = createStore();
const dest = document.getElementById('root');

render(
  <Provider store={store} key="provider">
    <App />
  </Provider>,
  dest
);
