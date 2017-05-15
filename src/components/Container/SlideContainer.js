import React, {Component} from 'react';
import { TransitionMotion, spring } from 'react-motion';
import styled from 'styled-components';
import withProps from 'recompose/withProps';

const Slide = styled.div`
  transform: ${props => `translate3d(0, ${props.y}em, 0)`};
`;

const enhanceWithProps = withProps(
  ownerProps => ({
    willEnter: () => ({
      x: 0,
      opacity: 0
    }),
    willLeave: () => ({
      x: spring(0, { stiffness: 200, damping: 26 }),
      opacity: spring(0, { stiffness: 300, damping: 40 })
    }),
    getStyles: () => ({
      opacity: spring(1, { stiffness: 300, damping: 40 }),
      x: spring(100, { stiffness: 1500, damping: 20 })
    })
  })
);

const Presentation = props => {
  console.log(props);
  const { willEnter, willLeave, getStyles, children } = props;
      
  return (
    <TransitionMotion
      styles={[{key: 't', style: getStyles(), data: children}]} willEnter={willEnter} willLeave={willLeave}>
      { (interpolated) => (
          interpolated.map(({ key, style, data }) => (
            <div key={`${key}-slide`} style={{ transform: `translate3d(${style.x}vw, 0, 0)` }}>
              Hello
            </div>
            )
          )          
        )        
      }    
    </TransitionMotion>
  );
};

export default enhanceWithProps(Presentation);
