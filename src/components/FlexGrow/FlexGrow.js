import React from 'react';
import styled, { keyframes } from 'styled-components';

const flexGrow = keyframes`
  to {
    flex: 1;
  }
`;

const flexShrink = keyframes`
  to {
    flex: .01;
    flex: .00001;
  }
`;

const FlexGrow = styled.div`
  /* 0 does not work so we have to use a small number */
  flex: .00001;

  animation: ${flexGrow} 500ms ease forwards;
`;

const FlexShrink = styled.div`
  flex: 1;

  animation: flexShrink 500ms ease forwards;
`;

export default props => (<FlexGrow>{props.children}</FlexGrow>);
