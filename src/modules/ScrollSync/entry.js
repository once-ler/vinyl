import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
// import Progress from 'react-progress-2'
import progress from '../App/ProgressAction'
import theme from '../App/ThemeAction'
import suggest from '../Suggest/Action'
import select from '../Select/Action'
import scrollsync from './Action'
import {Div, Collapse} from './Cell'
import { HeaderCell } from './HeaderCell'
// import ScrollSync from './ScrollSync'
import App from './App'
import 'react-virtualized/styles.css'
import 'react-progress-2/main.css'

const reducer = { progress, theme, suggest, scrollsync, select }
const finalReducer = combineReducers({...reducer})
// Make global so umd can see.
global.store = createStore(finalReducer)
global.axios = require('axios')

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('grid'))
