import React from 'react';
import {connect} from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import _ from 'lodash';
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
    load: state.suggest.load
  }),
  mapDispatchToProps => dispatch => ({
    ...suggestActions,
    dispatch
  })
);

const enhanceWithProps = withProps(ownerProps => ({
  getSuggestions: (value, { debounce } = {}) => {
    const cri = this.createMatchQuery(this.props.suggestMatchQueryFunc, value);
    if (debounce === true) {
      this.debouncedLoadSuggestions(cri);
    } else {
      this.props.fetchSuggest(cri);
    }
  },
  createMatchQuery: (f, v = null) => {
    const query = f(v);
    const {database, modelName} = this.props;
    return Object.assign({params: query}, { database, modelName });
  },
  escapeRegexCharacters: str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  debouncedLoadSuggestions: _.debounce(this.props.fetchSuggest, 100)  
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
  onSuggestionsUpdateRequested: props => ({ value, reason }) => {
    props.getSuggestions(value, { debounce: reason === 'type' });
  },
  onSuggestionSelected: props => (e, { suggestionValue }) => {
    const {createMatchQuery, onSuggestSelectedMatchQueryFunc, updateSelected} = props;
    const cri = createMatchQuery(onSuggestSelectedMatchQueryFunc, suggestionValue);
    updateSelected(cri);
  }
});

export default compose(
  connectFunc,
  withProps,
  withHandlers
)(Presentation);
