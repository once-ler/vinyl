import React, {Component} from 'react';
import { TransitionSpring, presets } from 'react-motion';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(#000, 0.5);
  overflow: auto;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 0.35s, opacity 0.35s linear;
`;

const ModalContent = styled.div`
  width: 50%;
  padding: 50px;
  border-radius: 3px;
  background: #fff;
  position: fixed;
  top: 30%;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

const ModalClose = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: block;
  width: 24px;
  height: 24px;
  padding: 5px;
  line-height: 18px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  background: #F34261;
  color: #fff;

  &:before {
    content: '\2715';
  }
`;

// TODO
const onClose = event => {};

export default class Modal extends Component {

  static propTypes = {
    shown: React.PropTypes.bool,
    onClose: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.getEndValue = this.getEndValue.bind(this);
    this.willEnter = this.willEnter.bind(this);
    this.willLeave = this.willLeave.bind(this);
  }

  renderModal(anim) {
    const { shown, onClose, children } = this.props;

    return (
      <Overlay onClick={onClose} style={{ opacity: anim.opacity.val }}>
        <ModalContent style={{ transform: `scale(${anim.scale.val})` }}>
          <ModalClose onClick={onClose}></ModalClose>
          {children}
        </ModalContent>
      </Overlay>
    );
  }

  getEndValue() {
    const { shown } = this.props;

    if (!shown) return {};

    return {
      modal: {
        scale: { val: 1, config: presets.wobbly },
        opacity: { val: 1, config: presets.stiff }
      }
    };
  }

  willEnter() {
    return {
      scale: { val: .9 },
      opacity: { val: .5 }
    }
  }

  willLeave(key, value, endValue, currentValue, currentSpeed) {
    return {
      scale: { val: .9 },
      opacity: { val: 0 }
    }
  }

  render() {
    const { shown, onClose } = this.props;

    return (
      <TransitionSpring endValue={this.getEndValue} willEnter={this.willEnter} willLeave={this.willLeave}>
        {currentValue =>
                <div>
            {Object.keys(currentValue).map(key =>
                this.renderModal(currentValue[key])
            )}
          </div>
        }
      </TransitionSpring>
    );
  }
}
