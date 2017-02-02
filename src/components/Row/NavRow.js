/* @flow */
import styled from 'styled-components';
import Row from './Row';
import ResponsiveRow from './ResponsiveRow';
import { media } from '../Setting/Setting';

const NavRow = styled(Row) `
  ${media.tablet `
    height: 65px;
    overflow: hidden;
    justify-content: flex-start;
    ::after {
      content: "☰";
      color: ${props => props.theme.secondary};
      position: absolute;
      font-size: 1.5em;
      top: 20px;
      right: 20px;
      z-index: 2;      
      cursor: pointer;
    }
  `}
`;

export default NavRow;
