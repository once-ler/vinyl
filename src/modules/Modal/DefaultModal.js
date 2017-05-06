import React, {Component} from 'react';
import {connect} from 'react-redux';
import withProps from 'recompose/withProps';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';
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

const enhanceWithProps = withProps(
  ownerProps => ({
    willEnter: () => ({
      scale: spring(0.1, { stiffness: 1000, damping: 40 }),
      opacity: spring(0.5)
    }),
    willLeave: (key, value, endValue, currentValue, currentSpeed) => { console.log(key); return ({
      scale: spring(0, { stiffness: 1000, damping: 40 }),
      opacity: spring(0, { stiffness: 1000, damping: 40 })
    })
    },
    getEndValue: () => {
      const { modal: {modalIsOpen: shown} } = ownerProps;

      return (!shown)
      ? {}
      : {
        modal: {
          scale: spring(1, { stiffness: 1500, damping: 40 }),
          opacity: spring(1, { stiffness: 1500, damping: 40 }),
        },
      };
    }
  })
);

export default compose(
  connectFunc,
  enhanceWithProps,
  enhanceWithHandlers
)(Presentation);
