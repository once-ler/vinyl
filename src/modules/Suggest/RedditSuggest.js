import React from 'react';
import compose from 'recompose/compose';
import Container from '../../components/Container/Container';
import Row from '../../components/Row/Row';
import connectFunc from './Connect';
import Select from '../Select/Select';
import RedditSuggest from './Reddit/Suggest';
import SuggestScrollSync from './SuggestScrollSync';

const Presentation = props => (
  <Container style={{width: '100%', position: 'relative'}}>
    <Container style={{width: '100%', position: 'absolute', zIndex: 3}}>
      <Select style={{maxWidth: '400px'}}/>
    </Container>
    <Container style={{position: 'absolute', top: 30, zIndex: 2, margin: '10px 0'}}>
      <RedditSuggest />
    </Container>
    <Container style={{width: '100%', position: 'absolute', zIndex: 1}}>
      <SuggestScrollSync top={30} />
    </Container>
  </Container>
);

const Wrapper = compose(
  connectFunc
)(Presentation);

export default Wrapper;
