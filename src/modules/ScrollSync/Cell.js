import React from 'react';
import styled from 'styled-components';
import {presets} from 'react-motion';
import {Collapse as ReactCollapse} from 'react-collapse';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';
import Portal from 'react-portal';

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  width: 100%;
  height: 100%;
  text-align: left;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  hyphens: auto;
  overflow: hidden;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid seagreen;
    z-index: 99;
    background-color: yellow;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: ${props => props.theme.secondary};
`;

const ReactCollapsePresentation = styled(ReactCollapse)`
  position: absolute;
  max-width: 320px;
  max-height: 200px;
  z-index: 101 !important;
  box-shadow: 5px 8px 6px #777;
  text-align: left;
  overflow: visible;
`;

const ReactCollapseContent = styled.div`
  position: relative;  
  background: yellow;
  padding: 8px;
  overflow: auto;
`;

const enhanceCollapseWithHandlers = withHandlers({
  onClick: ({setOpen, isOpened, setLeft, setTop}) => e => {
    e.preventDefault();
    const bodyRect = document.body.getBoundingClientRect();
    const targetRect = e.target.getBoundingClientRect();
    const top = targetRect.top - bodyRect.top;
    const left = targetRect.left - bodyRect.left;
    setLeft(left);
    setTop(25 + top);
    setOpen(!isOpened) },
  onCheckboxChange: ({setOpen}) => ({target: {checked}}) => setOpen(checked)
});

const CollapsePresentation = ({content, isOpened, onCheckboxChange, onClick, top, left}) => { return (
  <div style={{marginLeft: '3px', textAlign: 'right'}}>
    <label style={{position: 'relative', display: 'flex', justifyContent: 'space-around', zIndex: 1}}>
      { !isOpened && `${content.slice(0, 10)}...`} <Link href="#" onClick={onClick}>{isOpened ? 'Less' : 'More' }</Link>      
    </label>
    <Portal
      isOpened={isOpened}
    >
      <ReactCollapsePresentation
        isOpened={isOpened}
        springConfig={presets.wobbly}
        forceInitialAnimation={true}
        style={{top, left}}
      >
        <ReactCollapseContent>{content}</ReactCollapseContent>
      </ReactCollapsePresentation>
    </Portal>
  </div>
);
}

export const Collapse = compose(
  withState('isOpened', 'setOpen', false),
  withState('top', 'setTop', 0),
  withState('left', 'setLeft', 0),
  enhanceCollapseWithHandlers
)(CollapsePresentation);

export default Div;
