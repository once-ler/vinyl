/* @flow */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native'
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
    limit: state.list.limit,
    total: state.list.total
  }),
  dispatch => bindActionCreators({...listActions, ...suggesActions}, dispatch)
)

const enhanceFlatListTab = props => (
  <View style={[styles.container]}>
  <View style={[styles.container, {flexDirection: 'row'}]}>
    <Text style={[styles.text]}>{`Search total: ${props.total}`}</Text>
  </View>
  <FlatListTab {...props} />
  </View>
)

export default compose(
  connectFunc
)(enhanceFlatListTab)

const styles = StyleSheet.create({
  container: { flex: 1, padding: '1%', marginBottom: 5 },
  text: {
    fontSize: 12, 
    color: '#0a0a0a', 
    lineHeight: 10
  }
})