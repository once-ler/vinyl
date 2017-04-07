import React from 'react';
import Container from '../../components/Container/Container';
import FlexGrow from '../../components/FlexGrow/FlexGrow';
import ScrollSync from '../../components/ScrollSync/ScrollSync';

export default props => (
  <FlexGrow>
    <Container>
      <ScrollSync {...props}/>
    </Container>
  </FlexGrow>
);
