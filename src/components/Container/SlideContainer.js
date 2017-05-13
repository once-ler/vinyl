import React, {Component} from 'react';
import { TransitionMotion, spring } from 'react-motion';
import styled from 'styled-components';

const Slide = styled.div`
  transform: ${props => `translate3d(0, ${props.y}em, 0)`};
`;

// defaultStyle={{ y: 0 }}
// style={{ y: spring(slideIsOpen ? 5 : 0) }}

export default props => {
  const { slideIsOpen, willEnter, willLeave, getStyles, children } = props;
      
  return (
    <TransitionMotion
      styles={!shown ? [] : [{key: 't', style: getStyles(), data: children}]} willEnter={willEnter} willLeave={willLeave}>
      { (interpolated) => (
          { interpolated.map(({ key, style, data }) => (
            <div key={`${key}-slide`} style={{ transform: `translate3d(0, ${style.y}em, 0)` }}>
              {data}
            </div>
            )
          )}          
        )        
      }    
    </TransitionMotion>
  );
};
