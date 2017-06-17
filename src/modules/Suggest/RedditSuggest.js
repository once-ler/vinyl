import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import Suggest from './Suggest';
import ScrollSync from '../ScrollSync/ScrollSync';
import Cell from '../ScrollSync/Cell';
import Container from '../../components/Container/Container';
import Row from '../../components/Row/Row'; 
import * as suggestActions from './Action';

const enhanceWithProps = withProps(props => ({
  parseForSuggestions: ({payload}) => { console.log(payload); return (payload.children)},
  parseForErrors: () => {},
  getSuggestionValue: suggestion => suggestion.data.title,
  afterSuggestionSelected: suggestion => suggestion,
  suggestMatchQuery: {},
  emptySuggestQuery: {},
  suggestType: 'reddit',
  suggestSelectedType: 'redditSelected'
}));

const RedditSuggest = enhanceWithProps(Suggest);


const connectFunc = connect(
  state => ({suggestedData: state.suggest.suggestedData}),
  dispatch => bindActionCreators(suggestActions, dispatch)
);

const enhanceScrollSync = withProps(props => ({
  renderBodyCell: ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1 || !props.suggestedData || !props.suggestedData.payload[rowIndex]) return;
    
    return (
      <Cell
        key={key}
        style={style}
      >
        {props.suggestedData.payload[rowIndex][columnIndex]}
      </Cell>
    );
    // return renderLeftSideCell({ columnIndex, key, rowIndex, style });
  }
}));

const RedditScrollSync = compose(
  connectFunc,
  enhanceScrollSync
)(ScrollSync);

const Presentation = props => (
  <Container style={{width: '100%'}}>
    <Row><RedditSuggest /></Row>
    <Row><RedditScrollSync /></Row>
  </Container>
);

export default Presentation;
