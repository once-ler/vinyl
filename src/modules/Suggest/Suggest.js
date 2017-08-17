import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import defaultProps from 'recompose/defaultProps';
import compose from 'recompose/compose';
import debounce from 'lodash/debounce';
import Presentation from '../../components/Suggest/Suggest';
import * as suggestActions from './Action';

// These props need to be overriden by user.
const enhanceWithDefaultProps = defaultProps({
  parseForSuggestions: ({payload}) => payload.data,
  parseForErrors: ({payload}) => payload.error,
  getSuggestionValue: suggestion => suggestion.title,
  afterSuggestionSelected: suggestion => suggestion,
  suggestMatchQuery: {},
  emptySuggestQuery: {},
  suggestType: '',
  suggestSelectedType: ''
});

const connectFunc = connect(
  state => ({
    value: state.suggest.value,
    suggestions: state.suggest.data,
    error: state.suggest.error,
    loading: state.suggest.loading
  }),
  dispatch => bindActionCreators(suggestActions, dispatch)
);

const enhanceWithProps = withProps(props => ({
  debouncedLoadSuggestions: debounce(props.fetchSuggest, 100),
  escapeRegexCharacters: str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}));

const enhanceWithHandlers = withHandlers({
  onChange: ({updateInputValue, emptySuggestQuery, defaultSuggestions, debouncedLoadSuggestions, suggestType, dispatchBySuggestType}) => (e, { newValue, method }) => {
    if (method.search(/^up|down/) !== -1) return;
    
    updateInputValue(newValue);
    const value = newValue.trim();
    if (value === '') {
      defaultSuggestions(value);
      debouncedLoadSuggestions({...emptySuggestQuery, value, suggestType});
    }
  },
  onSuggestionsFetchRequested: ({debouncedLoadSuggestions, suggestQuery, suggestType, dispatchBySuggestType, value}) => ({ value, reason }) => debouncedLoadSuggestions({...suggestQuery, value, suggestType}),
  onSuggestionSelected: ({updateSelected, afterSuggestionSelected, suggestSelectedType, fetchSuggestSelected}) => (e, { suggestion, suggestionValue }) => {
    updateSelected(suggestion);
    const maybeModifiedSuggestion = afterSuggestionSelected(suggestion);
    fetchSuggestSelected({...maybeModifiedSuggestion, suggestSelectedType})
  },
  onSuggestionsClearRequested: ({clearSuggestions}) => () => clearSuggestions(),
  clearInput: ({updateInputValue}) => e => { e.preventDefault(); updateInputValue(''); }
});

export default compose(
  connectFunc,
  enhanceWithDefaultProps,
  enhanceWithProps,
  enhanceWithHandlers
)(Presentation);
