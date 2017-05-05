import React, {Component} from 'react';
import { TransitionMotion, spring } from 'react-motion';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
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
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
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
    content: '\00D7';
  }
`;

const getStyles = () => ({
  opacity: spring(1),
  scale: spring(1)
});

// https://github.com/chenglou/react-motion/issues/287
const Presentation = props => {
  const { modal: {modalIsOpen: shown, modalProps}, endValue, willEnter, willLeave } = props;
  console.log(shown)
  return (
    <TransitionMotion styles={[{key: 't', style: getStyles(), data: { modalProps }}]} willEnter={willEnter} willLeave={willLeave}>
      { (interpolated) => {
        return (<div>
          { interpolated.map(({ key, style, data }) => {
            console.log(ModalContent)
            return
              <Overlay onClick={onClose} style={{ opacity: style.opacity }}>
                <ModalContent style={{ transform: `scale(${style.scale})` }}>
                  <ModalClose onClick={onClose}></ModalClose>
                  {data.content}
                </ModalContent>
              </Overlay>
          }
          )}
        </div>)
      }
    }
    </TransitionMotion>
  );
};

export default Presentation;
