/* @flow */
import styled from 'styled-components';
import Row from './Row';
import ResponsiveRow from './ResponsiveRow';
import { media } from '../Setting/Setting';

const NavRow = styled(Row) `
  ${media.tablet `height: 65px; overflow: hidden;`}
`;

export default NavRow;
