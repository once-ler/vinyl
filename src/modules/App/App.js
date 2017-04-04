/* @flow */
/* eslint no-unused-vars: 0, max-len: 0 */
import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withPropsOnChange from 'recompose/withPropsOnChange';
import { navAction } from '../Nav';
import Presentation from './Presentation';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const connectFunc = connect(
  state => ({
    nav: state.nav,
    user: state.auth.user,
    routing: state.routing
  }),
  mapDispatchToProps
);

export default compose(
  connectFunc,
  withPropsOnChange(
    () => true,
    props => {
      if (!props.nav.collapse) {
        props.dispatch(navAction.reset());
      }
      /*
      if (props.user) {
        props.router.push('/loginSuccess');
      } else {
        props.router.push('/');
      }
      */
    }
  )
)(Presentation);
