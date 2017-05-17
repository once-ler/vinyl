import React, {Component} from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';
import withProps from 'recompose/withProps';
import Container from './Container';

const Slide = styled(Container)`
  width: 100%;
  transform: ${props => `translate3d(${props.x}%, 0, 0)`};
`;

const enhanceWithProps = withProps(
  ownerProps => ({
    defaultStyle: {
      x: +100, opacity: 0
    },
    style: {
      opacity: spring(1, { stiffness: 10, damping: 10 }),
      x: spring(0, { stiffness: 350, damping: 15 })
    }
  })
);

const Presentation = props => {
  const {defaultStyle, style, children} = props;
  return (
    <Motion
      defaultStyle={defaultStyle}
      style={style}
    >{style => (<Slide x={style.x}>{children}</Slide>)}
    </Motion>
  );
};

export default enhanceWithProps(Presentation);
