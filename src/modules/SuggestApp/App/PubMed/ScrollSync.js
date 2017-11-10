/* @flow */
import EnhancedScrollSync from '../EnhancedScrollSync';
import {withProps} from 'recompose';
import {freezeColumnNames} from './Middleware';

const enhanceScrollSyncWithProps = withProps(props => ({
  freezeColumns: freezeColumnNames.length
}));

export default enhanceScrollSyncWithProps(EnhancedScrollSync);
