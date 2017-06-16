import React from 'react';
import withProps from 'recompose/withProps';
import Suggest from './Suggest';
import ScrollSync from '../ScrollSync/ScrollSync';
import Cell from '../ScrollSync/Cell';

const enhanceWithProps = withProps(props => ({
  parseForSuggestions: ({payload}) => { console.log(payload); return (payload.children)},
  parseForErrors: () => {},
  getSuggestionValue: suggestion => suggestion.data.title,
  suggestMatchQuery: {},
  emptySuggestQuery: {},
  suggestType: 'reddit'
}));

const RedditSuggest = enhanceWithProps(Suggest);

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

const RedditScrollSync = enhanceScrollSync(ScrollSync);

const Presentation = props => (
  <div>
    <RedditSuggest />
    <RedditScrollSync />
  </div>
);

export default Presentation;
