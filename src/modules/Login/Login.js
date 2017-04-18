/* @flow */
import React from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import {login} from '../auth';
import CenteredContainer from '../../components/Container/CenteredContainer';
import CenteredCell from '../../components/Cell/CenteredCell';
import FlexGrow from '../../components/FlexGrow/FlexGrow';

const mapDispatchToState = dispatch => ({
  dispatch
});

const connectFunc = connect(
  state => ({
  }),
  mapDispatchToState
);

const Presentation = ({onSubmit}) => (
  <FlexGrow>
  <CenteredContainer>
    <CenteredCell>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
      <button type="submit">Log in</button>
      </form>
    </CenteredCell>
  </CenteredContainer>
  </FlexGrow>
);

export default compose(
  connectFunc,
  withHandlers({
    onSubmit: props => event => {
      event.preventDefault()
      props.dispatch(login('foo', 'bar'));
    }
  })  
)(Presentation);
