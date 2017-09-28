import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as suggestActions from '../../Suggest/Action';

export default connect(
  state => ({
    selectedValue: state.select.value,
    suggestedData: state.suggest.suggestedData,
    columns: state.suggest.columns,
    rowCount: state.suggest.rowCount,
    columnCount: state.suggest.columnCount,
    theme: state.theme,
    progress: state.progress
  }),
  dispatch => bindActionCreators(suggestActions, dispatch)
);
