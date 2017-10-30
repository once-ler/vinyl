/* @flow */
import EnhancedScrollSync from '../EnhancedScrollSync';
import {withProps} from 'recompose';

const enhanceScrollSyncWithProps = withProps(props => ({
  freezeColumns: 1
}));

export default enhanceScrollSyncWithProps(EnhancedScrollSync);
