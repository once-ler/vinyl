import React, {Component} from 'react';
import {connect} from 'react-redux';
import withProps from 'recompose/withProps';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';
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
      scale: { val: .9 },
      opacity: { val: .5 }
    }),
    willLeave: (key, value, endValue, currentValue, currentSpeed) => ({
      scale: { val: .9 },
      opacity: { val: 0 }
    }),
    endValue: () => {
      const { modal: {modalIsOpen: shown} } = ownerProps;

      if (!shown) return {};

      return {
        modal: {
          scale: { val: 1, config: presets.wobbly },
          opacity: { val: 1, config: presets.stiff }
        }
      };
    }
  })
);

export default compose(
  connectFunc,
  enhanceWithProps,
  enhanceWithHandlers
)(Presentation);
