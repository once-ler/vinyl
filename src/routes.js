/* eslint no-unused-vars:0 */
import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded } from './modules/auth';
import App from './modules/App/App';
import Home from './modules/Home/Home';
import Login from './modules/Login/Login';
import Protected from './modules/Protected/Protected';
import Form from './modules/Form/Form';
import NotFound from './modules/NotFound/NotFound';
import ScrollSync from './modules/ScrollSync/ScrollSync';

export default (store: any) => {
  const requireLogin = (nextState, replace, cb) => {
    const { router } = nextState;
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (!user) {
        replace('/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      checkAuth();
    }
  };
  /*
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />
      { /* Routes requiring login */ }
      <Route path="/protected" onEnter={requireLogin} component={Protected} >
        { /*  */ }
      </Route>
      <Route path="/form" component={Form} />
      <Route path="/login" component={Login} />
      <Route path="/scrollsync" component={ScrollSync} />
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
