import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import Suggest from './Suggest';
import ScrollSync from '../ScrollSync/ScrollSync';
import Select from '../Select/Select';
import Cell from '../ScrollSync/Cell';
import HeaderCell from '../ScrollSync/HeaderCell';
import Container from '../../components/Container/Container';
import Row from '../../components/Row/Row';
import * as suggestActions from './Action';

const connectFunc = connect(
  state => ({
    suggestedData: state.suggest.suggestedData,
    columns: state.suggest.columns,
    theme: state.theme
  }),
  dispatch => bindActionCreators(suggestActions, dispatch)
);

const enhanceSuggestWithProps = withProps(props => ({
  parseForSuggestions: ({payload}) => (payload ? payload.children: []),
  parseForErrors: () => {},
  getSuggestionValue: suggestion => suggestion.data.title,
  afterSuggestionSelected: suggestion => suggestion,
  suggestMatchQuery: {},
  emptySuggestQuery: {},
  suggestType: 'reddit',
  suggestSelectedType: 'redditSelected'
}));

const RedditSuggest = compose(
  connectFunc,
  enhanceSuggestWithProps
)(Suggest);

const enhanceScrollSyncWithProps = withProps(props => ({
  renderBodyCell: ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1 || !props.suggestedData || !props.suggestedData.payload[rowIndex]) return;
    
    return (
      <Cell
        key={key}
        style={style}
      >
        <span style={{padding: '0 5px'}}>{props.suggestedData.payload[rowIndex][columnIndex]}</span>
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
        <span style={{padding: '0 5px'}}>{(props.columns[columnIndex] || `C${columnIndex}`).replace(/_/g, ' ')}</span>
      </HeaderCell>
    );
  }
}));

const RedditScrollSync = compose(
  connectFunc,
  enhanceScrollSyncWithProps
)(ScrollSync);

// const RedditScrollSync = connectFunc(ScrollSync);

const Presentation = props => (
  <Container style={{width: '100%', position: 'relative'}}>
    <Container style={{width: '100%', position: 'absolute', zIndex: 3}}>
      <Select style={{maxWidth: '400px'}}/>
    </Container>
    <Container style={{position: 'absolute', top: 30, zIndex: 2, margin: '10px 0'}}>
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
