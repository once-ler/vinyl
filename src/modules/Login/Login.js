/* @flow */
import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

const Presentation = ({onSubmit}) => (
  <div>
  <h1>Login</h1>
  <form onSubmit={onSubmit}>
  <button type="submit">Log in</button>
  </form>
  </div>
);

export default compose(
  withHandlers({
    onSubmit: props => event => {
      event.preventDefault()
      props.dispatch({type: 'LOGIN_REACTION'});
    }
  })  
)(Presentation);
