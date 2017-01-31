/* @flow */
import styled from 'styled-components';
import Cell from './Cell';

const FormCell = styled(Cell) `
  margin: 0 5px;
  border-bottom: 1px solid #333;
  width: 100%;
  zoom: 1;
  &::before {
    content: '';
    display: table;
  }
  &::after {
    content: '';
    display: table;
    clear: both;
  }
  :focus {
    background-color: #fffad4;
    cursor: text;
  }
`;

export default FormCell;
