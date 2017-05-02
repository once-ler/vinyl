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

const renderModal = (props, anim) => {
  const { modal: {modalIsOpen: shown}, onClose, children } = props;

  return (
    <Overlay onClick={onClose} style={{ opacity: anim.opacity.val }}>
      <ModalContent style={{ transform: `scale(${anim.scale.val})` }}>
        <ModalClose onClick={onClose}></ModalClose>
        {children}
      </ModalContent>
    </Overlay>
  );
};

const Presentation = props => {
  const { modal: {modalIsOpen: shown}, endValue, willEnter, renderModal, willLeave } = props;

  return (
    <TransitionSpring endValue willEnter willLeave>
      {currentValue =>
        <div>
          {Object.keys(currentValue).map(key => {
            renderModal(props, currentValue[key]);
          };
        )}
        </div>
      }
    </TransitionSpring>
  );
};

export default Presentation;
