/* @flow */
import React from 'react';
import styled from 'styled-components';
import lifecycle from 'recompose/lifecycle';
import compose from 'recompose/compose';
import Container from '../../../../components/Container/Container';
import Row from '../../../../components/Row/Row';
import Cell from '../../../../components/Cell/Cell';
import {connectFunc} from './Connect';
import Select from '../../../Select/Select';
import AutoComplete from '../AutoComplete/AutoComplete'
import FlatListTab from '../List/FlatListTab'
import Progress from 'react-progress-2';
import options from './SuggestOptions';
import Modal from '../../../Modal/Modal'

const GradientContainer = styled(Container)`
  background-image: ${p => `linear-gradient(to right, ${p.theme.secondary}, ${p.theme.main})`};
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 30px 50px;
  z-index: 0;
`;

const Presentation = props => {
  return (
    <Container style={{flex: 1, width: '100%', height: '500px', position: 'relative'}}>
      <Modal></Modal>
      <Progress.Component style={{backgroundColor: '#fefefe'}} />
      <Container style={{width: '100%', position: 'absolute', zIndex: 4, backgroundColor: 'transparent', padding: '8px 0 0 8px'}}>
        <Row><Cell style={{color: props.theme.secondary, padding: '6px 8px 0 28px', maxHeight: '45px', overflow: 'hidden'}}>Cloud source</Cell><Select style={{width: '400px'}} options={options} /></Row>
      </Container>
      <Container style={{position: 'absolute', top: 30, zIndex: 3, margin: '12px 0', backgroundColor: 'transparent', padding: '8px 0 0 8px'}}>
        
        <Row style={{padding: '0 0 0 130px'}}><AutoComplete /><Cell style={{color: props.theme.tertiary, padding: '6px 0 0 8px', maxHeight: '45px', overflow: 'hidden'}}>{props.lastInputValue}</Cell></Row>
        
      </Container>
      <Container style={{width: '100%', position: 'absolute', top: 120, zIndex: 2}}>
        <div>Here</div>
        <FlatListTab />  
      </Container>
      
    </Container>
  );
};

const enhanceWithLifecycle = lifecycle({
  componentWillReceiveProps(nextProps) {
    /*
    if (this.props.selectedValue !== nextProps.selectedValue) {
      this.props.clearSuggestions();
      this.props.resetFreezeColumns();
    }
    */
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
