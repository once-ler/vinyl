/* @flow */
import React from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import styled from 'styled-components';
import Row from '../../components/Row/Row';
import Cell from '../../components/Cell/Cell';
import Container from '../../components/Container/Container';
import ResponsiveRow from '../../components/Row/ResponsiveRow';
import ResponsiveCell from '../../components/Cell/ResponsiveCell';
import { media } from '../../components/Setting/Setting';
import FlexGrow from '../../components/FlexGrow/FlexGrow';
import Button from '../../components/Button/Button';
import { showModal } from '../Modal/Action';
import SlideContainer from '../../components/Container/SlideContainer';

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

const Presentation = props => (
  <SlideContainer>
  <Container>
    <h1>Home</h1>
    <HomeRow wrap between center>
      <HomeCell margin><Button onClick={props.onClick}>Show Modal</Button></HomeCell>
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
  </SlideContainer>
);

const connectFunc = connect(
  state => ({ oauth2: state.oauth2, modal: state.modal }),
  dispatch => ({ dispatch })
);

const enanceWithHandlers = withHandlers({
  onClick: props => event => props.dispatch(showModal('DEFAULT_MODAL', { title: 'Hello', content: 'World' }))
});

export default compose(
  connectFunc,
  enanceWithHandlers
)(Presentation);
