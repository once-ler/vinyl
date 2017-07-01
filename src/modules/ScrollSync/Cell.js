import React from 'react';
import styled from 'styled-components';
import {presets} from 'react-motion';
import {Collapse as ReactCollapse} from 'react-collapse';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';
import './Style.css';

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

const enhanceCollapseWithState = withState('isOpened', 'setOpen', false);
const enhanceCollapseWithHandlers = withHandlers({ onCheckboxChange: ({setOpen}) => ({target: {checked}}) => setOpen(checked) });
const CollapsePresentation = ({content, isOpened, onCheckboxChange}) => (
  <div>
    <label style={{position: 'relative', zIndex: 1}}>
      More:
      <input
        type="checkbox"
        checked={isOpened}
        onChange={onCheckboxChange} />
    </label>    
    <ReactCollapse
      className="ReactCollapse--collapse"
      isOpened={isOpened}
      springConfig={presets.wobbly}
    >
      <div className="ReactCollapse--content">{content}</div>
    </ReactCollapse>    
  </div>
);

export const Collapse = compose(
  enhanceCollapseWithState,
  enhanceCollapseWithHandlers
)(CollapsePresentation);

export default Div;
