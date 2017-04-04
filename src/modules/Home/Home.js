/* @flow */
import React from 'react';
import styled from 'styled-components';
import Row from '../../components/Row/Row';
import Cell from '../../components/Cell/Cell';
import Container from '../../components/Container/Container';
import ResponsiveRow from '../../components/Row/ResponsiveRow';
import ResponsiveCell from '../../components/Cell/ResponsiveCell';
import { media } from '../../components/Setting/Setting';

const HomeRow = styled(ResponsiveRow) `
  min-height: 180px;
  border: 1px solid rosybrown;
  padding: 10px;
  ${media.tablet `flex-flow: row wrap; padding: 0;`}
`;

const HomeCell = styled(ResponsiveCell) `
  min-width: 84px;
  min-height: 60px;
  max-height: 80px;
  background: lightslategray;
  border: 1px solid #fefefe;
  ${media.tablet `flex: 0 0 45%;`}
`;

const NormalCell = styled(Cell) `
  background: ${props => props.theme.main};
  border: 1px solid ${props => props.theme.secondary};
`;

export default (...props: any[]) => (
  <Container>
    <h1>Home</h1>
    <HomeRow wrap between center>
      <HomeCell margin>Test</HomeCell>
      <HomeCell margin>Test</HomeCell>
      <HomeCell margin>Test</HomeCell>
    </HomeRow>
    <HomeRow wrapCenter center>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
      <HomeCell>Test</HomeCell>
    </HomeRow>
    <HomeRow wrap around>
      <NormalCell growBasis={2} stretch>Test</NormalCell>
      <NormalCell growBasis={4}>Test</NormalCell>
      <NormalCell growBasis={2} stretch>Test</NormalCell>
    </HomeRow>
  </Container>
);
