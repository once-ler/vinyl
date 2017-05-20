/* @flow */
import React from 'react';
import CenteredContainer from '../../components/Container/CenteredContainer';
import CenteredCell from '../../components/Cell/CenteredCell';
import SlideContainer from '../../components/Container/SlideContainer';

export default () => (
  <SlideContainer direction="right">
    <CenteredContainer>
      <CenteredCell>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </CenteredCell>
    </CenteredContainer>
  </SlideContainer>
);
