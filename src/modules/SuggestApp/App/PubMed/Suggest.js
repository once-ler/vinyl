import {withProps, compose} from 'recompose';
import connectFunc from '../Connect';
import Suggest from '../../../Suggest';

const enhanceSuggestWithProps = withProps(props => ({
  parseForSuggestions: ({payload}) => (payload ? payload: []),
  parseForErrors: () => {},
  getSuggestionValue: suggestion => suggestion.title,
  afterSuggestionSelected: suggestion => suggestion,
  suggestMatchQuery: {},
  emptySuggestQuery: {},
  suggestType: 'pubmed',
  suggestSelectedType: 'pubmedSelected'
}));

export default compose(
  connectFunc,
  enhanceSuggestWithProps
)(Suggest);
