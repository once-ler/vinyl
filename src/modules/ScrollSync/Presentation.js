import React from 'react';
import Container from '../../components/Container/Container';
import SlideContainer from '../../components/Container/SlideContainer';
import ScrollSync from '../../components/ScrollSync/ScrollSync';

export default props => (
  <SlideContainer direction="down" top={props.top}>
    <Container fontFamily={props.fontFamily} fontSize={props.fontSize}>
      <ScrollSync {...props}/>
    </Container>
  </SlideContainer>
);
