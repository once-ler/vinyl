/* @flow */
import styled from 'styled-components';
import Cell from './Cell';
import { media } from '../Setting/Setting';

const NavCell = styled(Cell) `
  ${media.tablet `flex: 1 100%;`}
`;

export default NavCell;
