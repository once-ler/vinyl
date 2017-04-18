/* @flow */
import React from 'react';
import CenteredContainer from '../../components/Container/CenteredContainer';
import CenteredCell from '../../components/Cell/CenteredCell';
import FlexGrow from '../../components/FlexGrow/FlexGrow';

export default () => (
  <FlexGrow>
    <CenteredContainer>
      <CenteredCell>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </CenteredCell>
    </CenteredContainer>
  </FlexGrow>
);
