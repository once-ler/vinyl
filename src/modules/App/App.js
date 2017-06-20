/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import toClass from 'recompose/toClass';
import lifecycle from 'recompose/lifecycle';
import withPropsOnChange from 'recompose/withPropsOnChange';
import { navAction } from '../Nav';
import Presentation from './Presentation';
import { scrollSyncActions } from '../ScrollSync';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const connectFunc = connect(
  state => ({
    nav: state.nav,
    user: state.auth.user,
    routing: state.routing,
    theme: state.theme
  }),
  mapDispatchToProps
);

const enhanceWithLifecycle = lifecycle({
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.router.push('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.router.push('/');
    }
  },
  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps);
    // Collapse responsive nav once user has selected next link.
    if (!this.props.nav.collapse) {
      this.props.dispatch(navAction.reset());
    }
  },
  componentWillMount() {
    const { theme } = this.props;
    document.body.style.backgroundColor = theme.secondary;
  },
  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  },
  componentDidMount() {
    // For tests
    this.props.dispatch(scrollSyncActions.setList([{a: 1, b: 2}]));
  }
});

export default compose(
  connectFunc,
  enhanceWithLifecycle
)(Presentation);
