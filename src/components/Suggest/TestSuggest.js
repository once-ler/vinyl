import React from 'react';
import Suggest from './Suggest';

export default props => (<Suggest  getSuggestionValue={ suggestion => suggestion.text } />);
