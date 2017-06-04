import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import debounce from 'lodash/debounce';
import Presentation from '../../components/Suggest/Suggest';
import * as suggestActions from './Action';

const connectFunc = connect(
  state => ({
    value: state.suggest.value,
    suggestions: state.suggest.data,
    errorSuggest: state.suggest.error,
    loadingSuggest: state.suggest.loadingSuggest,
    clearSuggestions: state.suggest.clearSuggestions,
    updateInputValue: state.suggest.updateInputValue,
    getSuggestionValue: state.suggest.getSuggestionValue,
    suggestMatchQuery: state.suggest.suggestMatchQuery,
    load: state.suggest.load
  }),
  dispatch => bindActionCreators(suggestActions, dispatch)
);

const enhanceWithProps = withProps(props => ({
  getSuggestions: (value, { debounce } = {}) => {
    const {suggestMatchQuery, database, modelName, fetchSuggest} = props;
    const params = suggestMatchQuery(value);
    const cri = { params, database, modelName };
    if (debounce === true) {
      debouncedLoadSuggestions(cri);
    } else {
      fetchSuggest(cri);
    }
  },
  debouncedLoadSuggestions: debounce(props.fetchSuggest, 100),
  escapeRegexCharacters: str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}));

const enhanceWithHandlers = withHandlers({
  onChange: ({updateInputValue, emptySuggestInputMatchQuery, defaultSuggestions}) => (e, { newValue }) => {
    updateInputValue(newValue);
    const value = newValue.trim();
    if (value === '') {
      defaultSuggestions(value);
      debouncedLoadSuggestions(emptySuggestInputMatchQuery);
    }
  },
  onSuggestionsFetchRequested: ({getSuggestions}) => ({ value, reason }) => {
    getSuggestions(value, { debounce: reason === 'type' });
  },
  onSuggestionSelected: ({onSuggestSelectedMatchQuery, updateSelected}) => (e, { suggestionValue }) => {
    const cri = onSuggestSelectedMatchQuery(suggestionValue);
    updateSelected(cri);
  },
  onSuggestionsClearRequested: ({clearSuggestions}) => () => clearSuggestions()
});

export default compose(
  connectFunc,
  enhanceWithProps,
  enhanceWithHandlers
)(Presentation);
