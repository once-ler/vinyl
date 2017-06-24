import React, { PropTypes, Component } from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import withHandlers from 'recompose/withHandlers';
import SlideContainer from '../Container/SlideContainer';
import Row from '../Row/Row';
import Button from '../Button/Button';
import SuggestTheme from './SuggestTheme';

const enhanceWithHandlers = withHandlers({
  renderSuggestion: props => (suggestion, { value, valueBeforeUpDown }) => {
    const suggest = props.getSuggestionValue(suggestion);
    const query = (props.value || valueBeforeUpDown || value ).trim();
    const matches = match(suggest, query);
    const parts = parse(suggest, matches);

    return (
      <div>
        <span>
          {
            parts.map((part, index) => {
              const highlightStyle = part.highlight ? {background: 'yellow'} : null;
              return (
                <span style={highlightStyle} key={index}>{part.text}</span>
              );
            })
          }
        </span>
      </div>
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
  parseForSuggestions,
  theme
}) => {
  const inputProps = {
    placeholder: 'search...',
    value,
    onChange
  };
  // const status = (loading ? 'Loading...' : 'Type to load suggestions');
  return (
    <SlideContainer direction="right" style={{maxWidth: '420px'}}>
      <Row middle>
      <Autosuggest suggestions={suggestions ? parseForSuggestions(suggestions) : []}
                   onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                   onSuggestionsClearRequested={onSuggestionsClearRequested}
                   onSuggestionSelected={onSuggestionSelected}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps}
                   theme={SuggestTheme(theme)}
                   focusInputOnSuggestionClick={false} />
      <Button onClick={clearInput} clear style={{minWidth: '27px', marginLeft: '40px'}}>
        X
      </Button>
      </Row>
    </SlideContainer>
  );
};

export default enhanceWithHandlers(Presentation);
