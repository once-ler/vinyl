import React from 'react';
import styled from 'styled-components';
import Container from '../../../components/Container/Container';
import Row from '../../../components/Row/Row';
import Cell from '../../../components/Cell/Cell';
import connectFunc from './Connect';
import Select from '../../Select';
import SuggestComponents from './SuggestComponents';
import ScrollSyncComponents from './ScrollSyncComponents';
import {suggestActions} from '../../Suggest';
import Progress from 'react-progress-2';

const GradientContainer = styled(Container)`
  background-image: ${p => `linear-gradient(to right, ${p.theme.secondary}, ${p.theme.main})`};
  width: 100%;
  position: absolute;
  z-index: 1;
`;

const Presentation = props => {
  const Suggest = SuggestComponents[props.selectedValue];
  const ScrollSync = ScrollSyncComponents[props.selectedValue];
  
  return (
    <Container style={{width: '100%', position: 'relative'}}>
      <Progress.Component style={{backgroundColor: '#fefefe'}} />
      <Container style={{width: '100%', position: 'absolute', zIndex: 3, backgroundColor: 'transparent', padding: '8px 0 0 8px'}}>
        <Select style={{maxWidth: '400px'}}/>
      </Container>
      <Container style={{position: 'absolute', top: 30, zIndex: 2, margin: '12px 0', backgroundColor: 'transparent', padding: '8px 0 0 8px'}}>
        <Row>{ Suggest && <Suggest /> }<Cell style={{color: props.theme.tertiary, padding: '6px 0 0 8px', maxHeight: '45px', overflow: 'hidden'}}>{props.lastInputValue}</Cell></Row>
      </Container>
      <GradientContainer style={{width: '100%', position: 'absolute', zIndex: 1}}>
        { ScrollSync && <ScrollSync top={32} /> }
      </GradientContainer>
    </Container>
  );
};

export default connectFunc(Presentation);
