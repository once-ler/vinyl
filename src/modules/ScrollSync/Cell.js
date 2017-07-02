import React from 'react';
import styled from 'styled-components';
import {presets} from 'react-motion';
import {Collapse as ReactCollapse} from 'react-collapse';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';

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
  transition: all 0.4s ease;
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
`;

const ReactCollapseContent = styled.div`
  position: relative;  
  background: yellow;
  padding: 8px;
  overflow: auto;
`;

const enhanceCollapseWithState = withState('isOpened', 'setOpen', false);

const enhanceCollapseWithHandlers = withHandlers({
  onClick: ({setOpen, isOpened}) => e => { e.preventDefault(); setOpen(!isOpened) },
  onCheckboxChange: ({setOpen}) => ({target: {checked}}) => setOpen(checked)
});

const CollapsePresentation = ({content, isOpened, onCheckboxChange, onClick}) => (
  <div style={{marginLeft: '3px', textAlign: 'right'}}>
    <label style={{position: 'relative', zIndex: 1}}>
      { !isOpened && `${content.slice(0, 10)}...`} <Link href="#" onClick={onClick}>{isOpened ? 'Less' : 'More' }</Link>      
    </label>    
    <ReactCollapsePresentation
      isOpened={isOpened}
      springConfig={presets.wobbly}
    >
      <ReactCollapseContent>{content}</ReactCollapseContent>
    </ReactCollapsePresentation>    
  </div>
);

export const Collapse = compose(
  enhanceCollapseWithState,
  enhanceCollapseWithHandlers
)(CollapsePresentation);

export default Div;
