/* @flow */
import styled from 'styled-components';
import Cell from './Cell';

export default styled(Cell) `
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
