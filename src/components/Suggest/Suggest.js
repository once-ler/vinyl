import React, { PropTypes, Component } from 'react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlight from 'autosuggest-highlight';

export default props => {
  const {
    loadingSuggest,
    viewDefSuggest,
    value,
    getSuggestionValueFunc,
    onSuggestionsUpdateRequested,
    onSuggestionSelected,
    onChange,
    renderSuggestion
  } = props;
  const inputProps = {
    placeholder: 'search...',
    value,
    onChange: onChange
  };
  const status = (loadingSuggest ? 'Loading...' : 'Type to load suggestions');

  return (
    <div className="app-container">
      <Autosuggest suggestions={viewDefSuggest && viewDefSuggest.data ? viewDefSuggest.data : []}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   onSuggestionSelected={onSuggestionSelected}
                   getSuggestionValue={getSuggestionValueFunc}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps} />
      <div className="status">
        <strong>Status:</strong> {status}
      </div>
    </div>
  );
};
