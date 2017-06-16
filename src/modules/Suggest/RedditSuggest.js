import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import Suggest from './Suggest';
import ScrollSync from '../ScrollSync/ScrollSync';
import Cell from '../ScrollSync/Cell';
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
  state => ({
    selected: state.suggest.selected
  }),
  dispatch => bindActionCreators(suggestActions, dispatch)
);

const enhanceScrollSync = withProps(props => ({
  renderBodyCell: ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1) return;
    return (
      <Cell
        key={key}
        style={style}
      >
        ABC
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
  <div>
    <RedditSuggest />
    <RedditScrollSync />
  </div>
);

export default Presentation;
