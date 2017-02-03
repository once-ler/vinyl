/* @flow */
import styled from 'styled-components';
import Cell from '../Cell/Cell';
import { media } from '../Setting/Setting';

const NavIcon2 = styled(Cell) `
  align-self: flex-end;
  position: relative;
  width: 40px;
  height: 65px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 20px;
    font-size: 1.5em;
    width: 1em;
    height: 0.15em;
    background: ${props => props.theme.secondary};
    box-shadow: 
      0 0.25em 0 0 ${props => props.theme.secondary},
      0 0.5em 0 0 ${props => props.theme.secondary};
  }
`;

const NavIcon = styled(Cell) `
  ${media.tablet `
    align-self: flex-end;
    width: 45px;
    height: 65px;
    &::after {  
      content: "☰";
      color: ${props => props.theme.secondary};
      position: absolute;
      font-size: 1.9em;
      top: 20px;
      right: 20px;
      z-index: 2;      
      cursor: pointer;
    }
  `}
`;

export default NavIcon;
