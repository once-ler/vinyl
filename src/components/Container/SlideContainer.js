import React from 'react';
import { TransitionMotion, Motion, spring } from 'react-motion';
import styled from 'styled-components';
import withProps from 'recompose/withProps';
import Container from './Container';

const Slide = styled(Container)`
  width: 100%;
  transform: ${props => `translate3d(${props.style.x}%, ${props.style.y}%, 0)`};
  opacity: ${props => props.style.opacity};
`;

const enhanceWithProps = withProps(
  ownerProps => ({
    left: {  
      defaultStyle: { x: +200, opacity: 0, y: 0 },
      style: {
        opacity: spring(1, { stiffness: 20, damping: 10 }),
        x: spring(0, { stiffness: 150, damping: 15 }),
        y: 0
      }
    },
    right: {  
      defaultStyle: { x: -200, opacity: 0, y: 0 },
      style: {
        opacity: spring(1, { stiffness: 20, damping: 10 }),
        x: spring(0, { stiffness: 150, damping: 15 }),
        y: 0
      }
    },
    up: {  
      defaultStyle: { y: +200, opacity: 0, x: 0 },
      style: {
        opacity: spring(1, { stiffness: 20, damping: 10 }),
        y: spring(0, { stiffness: 150, damping: 15 }),
        x: 0
      }
    },
    down: {  
      defaultStyle: { y: -200, opacity: 0, x: 0 },
      style: {
        opacity: spring(1, { stiffness: 20, damping: 10 }),
        y: spring(ownerProps.top || 0, { stiffness: 150, damping: 15 }),
        x: 0
      }
    }
  })
);

const Presentation = props => {
  const {children, direction} = props;
  const motion = props[direction || 'left'];
  return (
    <Motion
      defaultStyle={motion.defaultStyle}
      style={motion.style}
    >{style => (<Slide style={style}>{children}</Slide>)}
    </Motion>
  );
};

export default enhanceWithProps(Presentation);
