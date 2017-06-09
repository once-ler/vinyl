import React, { PropTypes, Component } from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import withHandlers from 'recompose/withHandlers';

const enhanceWithHandlers = withHandlers({
  renderSuggestion: props => (suggestion, { value, valueBeforeUpDown }) => {
    const suggest = JSON.stringify(suggestion, null, '  ');
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
  loadingSuggest,
  suggestions,
  value,
  getSuggestionValue,
  onSuggestionsFetchRequested,
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
      <Autosuggest suggestions={suggestions || []}
                   onSuggestionsFetchRequested={onSuggestionsFetchRequested}
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
