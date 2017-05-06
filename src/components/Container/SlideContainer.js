import React, {Component} from 'react';
import { TransitionMotion, spring } from 'react-motion';
import styled from 'styled-components';

const Slide = styled.div`
  --transform: ${props => `translate3d(0, ${props.y}em, 0)`};
`;

export default props => (
  <Motion defaultStyle={{ y: 0 }} style={{ y: spring(this.state.open ? 5 : 0) }}>
    { ({ y }) => (
      <Slide color={ this.state.color } y={ y }>
        <div {...props} />
      </Slide>
    ) }
  </Motion>
);
