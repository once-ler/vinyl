/* @flow */
import Inferno from 'inferno';
import styled from 'styled-components';
import { Row, Cell } from '../../components/Row/Row';

const HomeCell = styled(Cell) `
  width: 44px;
  min-height: 100px;
  background: lightslategray;
`;

export default (...props: any[]) => (
  <div>
    <h1>Home</h1>
    <Row wrap>
      <HomeCell growBasis={5}>Test</HomeCell>
      <HomeCell growBasis={2}>Test</HomeCell>
      <HomeCell growBasis={1}>Test</HomeCell>
    </Row>
    <Row wrap around middle>
      <HomeCell growBasis={2} stretch>Test</HomeCell>
      <HomeCell growBasis={4} stretch margin>Test</HomeCell>
      <HomeCell growBasis={2} stretch>Test</HomeCell>
    </Row>
  </div>
);
