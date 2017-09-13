import {withProps, compose} from 'recompose';
import connectFunc from '../Connect';
import Suggest from '../../Suggest';

const enhanceSuggestWithProps = withProps(props => ({
  parseForSuggestions: ({payload}) => (payload ? payload.children : []),
  parseForErrors: () => {},
  getSuggestionValue: suggestion => suggestion.data.title,
  afterSuggestionSelected: suggestion => suggestion,
  suggestMatchQuery: {},
  emptySuggestQuery: {},
  suggestType: 'reddit',
  suggestSelectedType: 'redditSelected'
}));

export default compose(
  connectFunc,
  enhanceSuggestWithProps
)(Suggest);
