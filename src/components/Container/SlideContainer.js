import React, {Component} from 'react';
import { TransitionMotion, spring } from 'react-motion';
import styled from 'styled-components';
import withProps from 'recompose/withProps';
// import compose from 'recompose/compose';
// import toClass from 'recompose/toClass';

const Slide = styled.div`
  transform: ${props => `translate3d(0, ${props.y}em, 0)`};
`;

const enhanceWithProps = withProps(
  ownerProps => ({
    defaultStyles: [{
      't': { x: -100, opacity: 0 }
    }],
    willEnter: () => ({
      x: -100,
      opacity: 0
    }),
    willLeave: () => ({
      x: spring(-100, { stiffness: 200, damping: 26 }),
      opacity: spring(0, { stiffness: 300, damping: 40 })
    }),
    getStyles: () => ({
      opacity: spring(1, { stiffness: 300, damping: 40 }),
      x: spring(0, { stiffness: 1500, damping: 20 })
    })
  })
);

const Presentation = props => {
  const { location: { pathname }, defaultStyles, willEnter, willLeave, getStyles, children } = props;
  console.log(pathname);
      
  return (
    <TransitionMotion
      defaultStyles={defaultStyles}
      styles={[{key: 't', style: getStyles(), data: children}]} willEnter={willEnter} willLeave={willLeave}>
      { (interpolated) => (
          <div>
          {
          interpolated.map(({ key, style, data }) => { console.log(style); return (
            <div key={`${key}-slide`} style={{ transform: `translate3d(${style.x}vw, 0, 0)` }}>
              {data}  
            </div>
            )
            }           
          )
          }
          </div>                   
        )
      }    
    </TransitionMotion>
  );
};

export default enhanceWithProps(Presentation);
