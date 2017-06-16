import withProps from 'recompose/withProps';
import Suggest from './Suggest';

const enhanceWithProps = withProps(props => ({
  parseForSuggestions: ({payload}) => (payload.children),
  parseForErrors: () => {},
  getSuggestionValue: suggestion => suggestion.data.public_description,
  suggestMatchQuery: {},
  emptySuggestQuery: {}
}));

export default enhanceWithProps(Suggest);
