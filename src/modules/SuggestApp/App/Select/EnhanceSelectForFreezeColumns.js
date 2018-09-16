/* @flow */
/* eslint max-len: 0 */
import type {MergeFreezeListResult} from '../Util'
import React from 'react'
import Select from '../../../../components/Select/Select';
import optionRenderer from '../../../Select/OptionRenderer';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withState, withProps, withHandlers, compose} from 'recompose';
import * as selectActionCreators from './FreezeColumnAction'
import * as suggestActionCreators from '../../../Suggest/Action'
import {mergeFreezeList} from '../Util'

const connectFunc = connect(
  state => ({
    suggestData: state.suggest.suggestedData,
    columns: state.suggest.columns,
    freezeColumns: state.freezeColumns.columns,
    theme: state.theme
  }),
  dispatch => ({
    suggestActions: bindActionCreators(suggestActionCreators, dispatch),
    selectActions: bindActionCreators(selectActionCreators, dispatch)
  })
)

const enhanceWithState = withState('value', 'setValue', '');

const enhanceWithProps = withProps(({theme}) => ({
  searchable: true,
  labelKey: 'name',
  valueKey: 'value',
  optionRenderer: optionRenderer(theme)
}))

const enhanceWithHandlers = withHandlers({
  onChange: ({suggestActions, selectActions, suggestData, setValue}) => value => {
    setValue(value)
    const fset = value.split(',')
    selectActions.changeFreezeColumns(fset)
    
    const {payload} = suggestData;
    const result: MergeFreezeListResult = mergeFreezeList(payload, fset)
    const {list} = result
    suggestActions.fetchSuggestSelectedSuccess(list)
  },
  optionHeight: () => () => 40
})

const Presentation = props => {
  const ops = props.columns.sort().map(a => ({name: a, value: a}))
  return <Select {...props} multi={true} options={ops} />
}

export default compose(
  enhanceWithState,
  connectFunc,
  enhanceWithProps,
  enhanceWithHandlers
)(Presentation);
