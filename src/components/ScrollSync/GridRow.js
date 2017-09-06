import React from 'react';
import styled from 'styled-components';

export default styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  opacity: ${props => props.opacity ? props.opacity : 1}
`;
