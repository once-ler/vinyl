import React, {Component} from 'react';
import {connect} from 'react-redux';
import withProps from 'recompose/withProps';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';
import toClass from 'recompose/toClass';
import {spring} from 'react-motion';
import {hideModal} from './Action';
import Presentation from './DefaultModalPresentation';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const connectFunc = connect(
  state => ({modal: state.modal}),
  mapDispatchToProps
);

const enhanceWithHandlers = withHandlers({
  onClose: props => event => props.dispatch(hideModal())
});

// https://codepen.io/anon/pen/wzdBoa?editors=0010#0
const enhanceWithProps = withProps(
  ownerProps => ({
    willEnter: () => ({
      scale: 0,
      opacity: 0
    }),
    willLeave: () => ({
      scale: spring(0, { stiffness: 200, damping: 26 }),
      opacity: spring(0, { stiffness: 300, damping: 40 })
    }),
    getStyles: () => ({
      opacity: spring(1, { stiffness: 300, damping: 40 }),
      scale: spring(1, { stiffness: 1500, damping: 20 })
    })
  })
);

export default compose(
  connectFunc,
  enhanceWithProps,
  enhanceWithHandlers,
  toClass
)(Presentation);
