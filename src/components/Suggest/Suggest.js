import React, { PropTypes, Component } from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import withHandlers from 'recompose/withHandlers';

const enhanceWithHandlers = withHandlers({
  renderSuggestion: props => (suggestion, { value, valueBeforeUpDown }) => {
    // const {title: suggest} = suggestion;
    const suggest = props.getSuggestionValue(suggestion);
    const query = (props.value || valueBeforeUpDown || value ).trim();
    const matches = match(suggest, query);
    const parts = parse(suggest, matches);
    
    return (
      <span>
        <span>
          {
            parts.map((part, index) => {
              // const className = part.highlight ? 'highlight' : null;
              const highlightStyle = part.highlight ? {background: 'yellow'} : null;
              return (
                <span style={highlightStyle} key={index}>{part.text}</span>
              );
            })
          }
        </span>
      </span>
    );
  }
});

const Presentation = ({
  loading,
  suggestions,
  value,
  getSuggestionValue,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  onSuggestionSelected,
  onChange,
  renderSuggestion,
  clearInput,
  parseForSuggestions
}) => {
  const inputProps = {
    placeholder: 'search...',
    value,
    onChange
  };
  const status = (loading ? 'Loading...' : 'Type to load suggestions');
  return (
    <div>
      <Autosuggest suggestions={suggestions ? parseForSuggestions(suggestions) : []}
                   onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                   onSuggestionsClearRequested={onSuggestionsClearRequested}
                   onSuggestionSelected={onSuggestionSelected}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps} />
      <span><button onClick={clearInput}>Clear</button></span>
      <div>
        <strong>Status:</strong> {status}
      </div>
    </div>
  );
};

export default enhanceWithHandlers(Presentation);
