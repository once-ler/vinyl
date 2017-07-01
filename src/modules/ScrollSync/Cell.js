import React from 'react';
import styled from 'styled-components';
import {presets} from 'react-motion';
import {Collapse as ReactCollapse} from 'react-collapse';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';
import './Style.css';

export const DefaultDiv = styled.div`
  position: relative;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease;
  z-index: 1;
  &:hover {
    border: 1px solid seagreen;
    z-index: 99;
    background-color: yellow;
  }
`;

const TopDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 100 !important;
`;

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
    /*
    overflow: ${props => { const { style: { width }, contentSize } = props; const r = contentSize / width; return r > 1 ? 'scroll' : 'hidden'; }} !important;
    width: ${props => { const { style: { width }, contentSize } = props; const r = contentSize / width; return r > 1 ? width * 2.5 : width; }}px !important;
    height: ${props => { const { style: { width, height }, contentSize } = props; const r = contentSize / width;; return r > 1 ? 140 : height; }}px !important;
    margin: ${props => { const { style: { width }, contentSize } = props; const r = contentSize / width; return r > 1 ? '15px 0px 0px 15px' : '0'; }} !important;
    */
  }
`;

export const TextArea = styled.textarea`
  display: flex;
  align-items: center;
  justify-content: flex-center;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  width: 100%;
  height: 100%;
  transition: all 0.4s ease;
  outline: none;
  overflow: hidden;
  resize: none;
  &:hover {
    overflow: auto;
    border: 1px solid seagreen;
    z-index: 99;
    background-color: yellow;    
    width: ${props => { const { style: { width }, contentSize } = props; const r = contentSize / width; return r > 1 ? width * 2.5 : width; }}px !important;
    height: ${props => { const { style: { width, height }, contentSize } = props; const r = contentSize / width; return r > 1 ? height * 2.5 : height; }}px !important;
    margin: ${props => {
      const { style: { width, left }, contentSize, columnIndex, gridWidth, gridScrollLeft } = props;
      const s = left - (gridScrollLeft);
      const t = gridWidth - width;
      console.log([s, t]);

      const r = (t > s) ? '0px 0px 0px 15px' : '0px 0px 0px -' + (width * 1.85) + 'px';
      // console.log(r);
      return r;
    }    
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
