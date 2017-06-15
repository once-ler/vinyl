import withProps from 'recompose/withProps';
import Suggest from './Suggest';

const enhanceWithProps = withProps(props => ({
  parseForSuggestions: ({payload}) => (payload.hn.topStories),
  parseForErrors: () => {},
  getSuggestionValue: suggestion => suggestion.title,
  suggestMatchQuery: {},
  emptySuggestQuery: {}
}));

export default enhanceWithProps(Suggest);
