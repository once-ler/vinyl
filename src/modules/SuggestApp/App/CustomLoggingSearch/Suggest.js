import {withProps, compose} from 'recompose';
import connectFunc from '../Connect';
import Suggest from '../../../Suggest';

const enhanceSuggestWithProps = withProps(props => ({
  parseForSuggestions: ({payload}) => (payload && payload.children ? payload.children : []),
  parseForErrors: () => {},
  getSuggestionValue: suggestion => suggestion.data.study_id,
  afterSuggestionSelected: suggestion => suggestion,
  suggestMatchQuery: {},
  emptySuggestQuery: {},
  suggestType: 'logging',
  suggestSelectedType: 'loggingSelected'
}));

export default compose(
  connectFunc,
  enhanceSuggestWithProps
)(Suggest);
