import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import Suggest from './Suggest';
import ScrollSync from '../ScrollSync/ScrollSync';
import Cell from '../ScrollSync/Cell';
import HeaderCell from '../ScrollSync/HeaderCell';
import Container from '../../components/Container/Container';
import Row from '../../components/Row/Row'; 
import * as suggestActions from './Action';

const enhanceWithProps = withProps(props => ({
  parseForSuggestions: ({payload}) => (payload ? payload.children: []),
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
  state => ({
    suggestedData: state.suggest.suggestedData
  }),
  dispatch => bindActionCreators(suggestActions, dispatch)
);

const enhanceScrollSyncWithProps = withProps(props => ({
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
  },
  renderHeaderCell: ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1) return;

    return (
      <HeaderCell
        key={key}
        style={style}
      >
        {`XYZ${columnIndex}`}
      </HeaderCell>
    );
  }
}));

const RedditScrollSync = compose(
  connectFunc,
  enhanceScrollSyncWithProps
)(ScrollSync);

const Presentation = props => (
  <Container style={{width: '100%', position: 'relative'}}>    
    <Container style={{width: '100%', position: 'absolute', zIndex: 2}}>
      <RedditSuggest />
    </Container>
    <Container style={{width: '100%', position: 'absolute', zIndex: 1}}>
      <RedditScrollSync top={30} />
    </Container>
  </Container>
);

const Wrapper = compose(
  connectFunc
)(Presentation);

export default Wrapper;
