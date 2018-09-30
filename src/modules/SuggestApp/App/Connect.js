/* @flow */
/* eslint max-len: 0 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as suggestActions from '../../Suggest/Action';
import * as selectActions from '../../Select/Action';
import * as scrollSyncActions from '../../ScrollSync/Action';
import * as freezeColumnsActions from './Select/FreezeColumnAction';

export default connect(
  state => ({
    selectedValue: state.select.value,
    lastInputValue: state.suggest.lastValue,
    suggestedData: state.suggest.suggestedData,
    columns: state.suggest.columns,
    rowCount: state.suggest.rowCount,
    columnCount: state.suggest.columnCount,
    theme: state.theme,
    progress: state.progress
  }),
  dispatch => bindActionCreators({...suggestActions, ...selectActions, ...scrollSyncActions, ...freezeColumnsActions}, dispatch)
);
