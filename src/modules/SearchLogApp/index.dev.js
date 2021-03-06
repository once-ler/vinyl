/* @flow */
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './createStore';
import '../../globalStyles';
import 'react-progress-2/main.css';
import 'react-select/dist/react-select.css';
import App from './modules/App/App';
import DevTools from '../DevTools/DevTools';

const store = createStore();
const dest = document.getElementById('root');

render(
  <Provider store={store} key="provider">
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  dest
);
