import styled from 'styled-components';

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    width: ${props => { const { style: { width }, contentSize } = props;  const r = contentSize / width; return r > 1 ? width * 2.5 : width; }}px !important;
    height: ${props => { const { style: { width, height }, contentSize } = props;  const r = contentSize / width;; return r > 1 ? 140 : height; }}px !important;
    overflow: ${props => { const { style: { width }, contentSize } = props;  const r = contentSize / width;; return r > 1 ? 'scroll' : 'hidden'; }} !important;
    margin: ${props => { const { style: { width }, contentSize } = props;  const r = contentSize / width;; return r > 1 ? '15px 0px 0px 15px' : '0'; }} !important;
  }
`;

export const TextArea = styled.textarea`
  display: flex;
  align-items: center;
  justify-content: flex-center;
  outline: none;
  resize: none;
  overflow: auto;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid seagreen;
    z-index: 99;
    background-color: yellow;
    width: ${props => { const { style: { width }, contentSize } = props;  const r = contentSize / width; return r > 1 ? width * 2.5 : width; }}px !important;
    height: ${props => { const { style: { width, height }, contentSize } = props;  const r = contentSize / width;; return r > 1 ? height * 2.5 : height; }}px !important;    
  &:not(:hover) {
    width: ${props => props.style.width} !important;
    height: ${props => props.style.height} !important;
  }
`;

export default Div;
