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
    const {suggestMatchQuery, database, modelName} = props;
    const params = suggestMatchQuery(value);
    const cri = { params, database, modelName };
    if (debounce === true) {
      debouncedLoadSuggestions(cri);
    } else {
      props.fetchSuggest(cri);
    }
  },
  debouncedLoadSuggestions: debounce(props.fetchSuggest, 100),
  escapeRegexCharacters: str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}));

const enhanceWithHandlers = withHandlers({
  onChange: props => (e, { newValue }) => {
    props.updateInputValue(newValue);
    const value = newValue.trim();
    if (value === '') {
      const cri = props.createMatchQuery(props.emptySuggestInputMatchQueryFunc);
      props.defaultSuggestions(cri);
    }
  },
  onSuggestionsFetchRequested: props => ({ value, reason }) => {
    console.log(props);
    props.getSuggestions(value, { debounce: reason === 'type' });
  },
  onSuggestionSelected: props => (e, { suggestionValue }) => {
    const {createMatchQuery, onSuggestSelectedMatchQueryFunc, updateSelected} = props;
    const cri = createMatchQuery(onSuggestSelectedMatchQueryFunc, suggestionValue);
    updateSelected(cri);
  },
  onSuggestionsClearRequested: props => () => props.clearSuggestions()
});

export default compose(
  connectFunc,
  enhanceWithProps,
  enhanceWithHandlers
)(Presentation);
