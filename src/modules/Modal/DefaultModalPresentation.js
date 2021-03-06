import React, {Component} from 'react';
import { TransitionMotion, spring } from 'react-motion';
import styled from 'styled-components';

const Overlay = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  overflow: auto;
  opacity: 0.5;
  transition: visibility 0s linear 0.35s, opacity 0.35s linear;
`;

const ModalContent = styled.div`
  z-index: 99;
  width: 50%;
  padding: 50px;
  border-radius: 3px;
  background: #fff;
  position: fixed;
  top: 30%;
  right: 0;
  left: 0;
  margin: 0 auto;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
`;

const ModalTitle = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  display: block;
  line-height: 18px;
  color: crimson;
  font-weight: 500;
`;

const ModalClose = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: block;
  width: 24px;
  height: 24px;
  padding: 5px;
  line-height: 24px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  background: #F34261;
  color: #fff;
  font-size: 2em;

  &:before {
    content: '\00D7';
  }
`;

// https://github.com/chenglou/react-motion/issues/287
const Presentation = props => {
  const { modal: {modalIsOpen: shown, modalProps}, willEnter, willLeave, getStyles, onClose } = props;
  return (
    <TransitionMotion
      styles={!shown ? [] : [{key: 't', style: getStyles(), data: { modalProps }}]} willEnter={willEnter} willLeave={willLeave}>
      { (interpolated) => {
        return (<div>
          {shown && <Overlay onClick={onClose} />}
          { interpolated.map(({ key, style, data }) => (
            <ModalContent key={`${key}-modal`} style={{ transform: `scale(${style.scale})`, opacity: style.opacity }}>
              <ModalTitle>{data.modalProps.title}</ModalTitle>
              <ModalClose onClick={onClose}></ModalClose>
              {data.modalProps.content}
            </ModalContent>
            )
          )}          
        </div>)
      }
    }
    </TransitionMotion>
  );
};

export default Presentation;
