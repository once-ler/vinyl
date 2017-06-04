import React, { PropTypes, Component } from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import withHandlers from 'recompose/withHandlers';

const enhanceWithHandlers = withHandlers({
  renderSuggestion: props => (suggestion, { value, valueBeforeUpDown }) => {
    const suggest = JSON.stringify(suggestion, null, '  ');
    const query = (valueBeforeUpDown || value || props.value).trim();
    const matches = match(suggest, query);
    const parts = parse(suggest, matches);
    return (
      <span>
        <span>
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;

              return (
                <span className={className} key={index}>{part.text}</span>
              );
            })
          }
        </span>
      </span>
    );
  }
});

const Presentation = ({
  loadingSuggest,
  viewDefSuggest,
  value,
  getSuggestionValue,
  onSuggestionsFetchRequested,
  onSuggestionSelected,
  onSuggestionsClearRequested,
  onChange,
  renderSuggestion
}) => {
  const inputProps = {
    placeholder: 'search...',
    value,
    onChange
  };
  const status = (loadingSuggest ? 'Loading...' : 'Type to load suggestions');

  return (
    <div className="app-container">
      <Autosuggest suggestions={viewDefSuggest && viewDefSuggest.data ? viewDefSuggest.data : []}
                   onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                   onSuggestionSelected={onSuggestionSelected}
                   onSuggestionsClearRequested={onSuggestionsClearRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps} />
      <div className="status">
        <strong>Status:</strong> {status}
      </div>
    </div>
  );
};

export default enhanceWithHandlers(Presentation);
