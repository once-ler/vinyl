import React from 'react';
import styled, { keyframes } from 'styled-components';
import ie from 'ie-version';

const flexGrow = keyframes`
  to {
    flex: 1;
  }
`;

const flexShrink = keyframes`
  to {
    flex: ${ie.version && ie.version <= 11 ? 1 : 0.01};
    flex: ${ie.version && ie.version <= 11 ? 1 : 0.00001};
  }
`;

const FlexGrow = styled.div`
  /* 0 does not work so we have to use a small number */
  flex: ${ie.version && ie.version <= 11 ? 1 : 0.00001};

  animation: ${flexGrow} 500ms ease forwards;
`;

const FlexShrink = styled.div`
  flex: 1;

  animation: flexShrink 500ms ease forwards;
`;

export default props => (<FlexGrow>{props.children}</FlexGrow>);
