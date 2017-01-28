/* @flow */
import Inferno from 'inferno';
import styled from 'styled-components';
import { Row, Cell } from '../../components/Row/Row';

const HomeRow = styled(Row) `
  width: 260px;
  min-height: 180px;
  border: 1px solid rosybrown;
  padding: 10px;
`;

const HomeCell = styled(Cell) `
  width: 44px;
  height: 60px;
  background: lightslategray;
  border: 1px solid #fefefe;
`;

export default (...props: any[]) => (
  <div>
    <h1>Home</h1>
    <HomeRow wrap between>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
    </HomeRow>
    <HomeRow wrapBetween center>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
    </HomeRow>
    <HomeRow wrap around middle>
      <HomeCell growBasis={2} stretch>Test</HomeCell>
      <HomeCell growBasis={4} stretch margin>Test</HomeCell>
      <HomeCell growBasis={2} stretch>Test</HomeCell>
    </HomeRow>
  </div>
);
