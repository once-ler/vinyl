/* @flow */
import React from 'react';
import FlatListTab from '../../../../components/FlatListTab/Native/FlatListTab'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {bindActionCreators} from 'redux'
import * as listActions from './FlatListAction'
import * as suggesActions from '../Suggest/SuggestAction'

const connectFunc = connect(
  state => ({
    selected: state.suggest.selected,
    refreshing: state.list.refreshing, 
    data: state.list.data,
    offset: state.list.offset,
    limit: state.list.limit
  }),
  dispatch => bindActionCreators({...listActions, ...suggesActions}, dispatch)
)

export default compose(
  connectFunc
)(FlatListTab)
