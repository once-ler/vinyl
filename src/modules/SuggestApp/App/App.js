/* @flow */
import React from 'react';
import styled from 'styled-components';
import lifecycle from 'recompose/lifecycle';
import compose from 'recompose/compose';
import Container from '../../../components/Container/Container';
import Row from '../../../components/Row/Row';
import Cell from '../../../components/Cell/Cell';
import connectFunc from './Connect';
import Select from '../../Select/Select';
import SuggestComponents from './SuggestComponents';
import ScrollSyncComponents from './ScrollSyncComponents';
import {suggestActions} from '../../Suggest';
import Progress from 'react-progress-2';
import options from './SuggestOptions';
import FreezeColumnsSelect from './Select/EnhanceSelectForFreezeColumns';
import Modal from '../../Modal/Modal'

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
      <Modal></Modal>
      <Progress.Component style={{backgroundColor: '#fefefe'}} />
      <Container style={{width: '100%', position: 'absolute', zIndex: 4, backgroundColor: 'transparent', padding: '8px 0 0 8px'}}>
        <Row><Cell style={{color: props.theme.secondary, padding: '6px 8px 0 28px', maxHeight: '45px', overflow: 'hidden'}}>Cloud source</Cell><Select style={{width: '400px'}} options={options} /></Row>
      </Container>
      <Container style={{position: 'absolute', top: 30, zIndex: 3, margin: '12px 0', backgroundColor: 'transparent', padding: '8px 0 0 8px'}}>
        <Row style={{padding: '0 0 0 130px'}}>{ Suggest && <Suggest /> }<Cell style={{color: props.theme.tertiary, padding: '6px 0 0 8px', maxHeight: '45px', overflow: 'hidden'}}>{props.lastInputValue}</Cell></Row>
      </Container>
        { props.suggestedData &&
        <Container style={{position: 'absolute', top: 90, zIndex: 2, margin: '12px 0', backgroundColor: 'transparent', padding: '8px 0 0 8px'}}>
          <Row><Cell style={{color: props.theme.tertiary, padding: '6px 8px 0 8px', maxHeight: '45px', overflow: 'hidden'}}>Freeze Columns</Cell><FreezeColumnsSelect style={{width: '400px'}} /></Row> 
        </Container>
        }
      <GradientContainer style={{width: '100%', position: 'absolute', zIndex: 1}}>
        { ScrollSync && <ScrollSync top={props.suggestedData ? 48 : 34} /> }
      </GradientContainer>
    </Container>
  );
};

const enhanceWithLifecycle = lifecycle({
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedValue !== nextProps.selectedValue) {
      this.props.clearSuggestions();
      this.props.resetFreezeColumns();
    }
  },
  componentWillUpdate(nextProps, nextState) {
  },
  componentWillMount() {
  },
  componentWillUnmount() {
    document.body.style.backgroundColor = '#ffffff';
  },
  componentDidMount() {
  }
});

export default compose(
  connectFunc,
  enhanceWithLifecycle
)(Presentation);
