import React from 'react';
import Container from '../../../components/Container/Container';
import Row from '../../../components/Row/Row';
import connectFunc from './Connect';
import Select from '../../Select';
import SuggestScrollSync from './SuggestScrollSync';
import SuggestComponents from './SuggestComponents';

const Presentation = props => {
  const Suggest = SuggestComponents[props.selectedValue];

  return (
    <Container style={{width: '100%', position: 'relative'}}>
      <Container style={{width: '100%', position: 'absolute', zIndex: 3}}>
        <Select style={{maxWidth: '400px'}}/>
      </Container>
      <Container style={{position: 'absolute', top: 30, zIndex: 2, margin: '10px 0'}}>
        { Suggest && <Suggest /> }
      </Container>
      <Container style={{width: '100%', position: 'absolute', zIndex: 1}}>
        <SuggestScrollSync top={30} />
      </Container>
    </Container>
  );
};

export default connectFunc(Presentation);
