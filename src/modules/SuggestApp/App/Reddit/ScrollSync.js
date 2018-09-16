/* @flow */
import EnhancedScrollSync from '../EnhancedScrollSync';
import {withProps, compose} from 'recompose';
import {freezeColumnNames} from './Middleware';
import {connect} from 'react-redux'

const connectFunc = connect(
  state => ({ freezeColumns: state.freezeColumns.columns })
)

const enhanceScrollSyncWithProps = withProps(({freezeColumns}) => ({
  freezeColumns: freezeColumns.length || freezeColumnNames.length
}));

export default compose(
  connectFunc,
  enhanceScrollSyncWithProps
)(EnhancedScrollSync);
