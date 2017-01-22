/* @flow */
import Inferno from 'inferno';
import { Row, Cell } from '../../components/Row/Row';

export default (...props: any[]) => (
  <div>
    <h1>Home</h1>
    <Row wrap>
      <Cell growBasis={5}>Test</Cell>
      <Cell growBasis={2}>Test</Cell>
      <Cell growBasis={1}>Test</Cell>
    </Row>
    <Row wrap around middle>
      <Cell growBasis={2} stretch>Test</Cell>
      <Cell growBasis={4} stretch>Test</Cell>
      <Cell growBasis={2} stretch>Test</Cell>
    </Row>
  </div>
);
