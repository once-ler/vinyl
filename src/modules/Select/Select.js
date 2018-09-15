import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withState, withProps, withHandlers,compose} from 'recompose';
import Select from '../../components/Select/Select';
import * as selectActions from './Action';
import optionRenderer from './OptionRenderer';

const connectFunc = connect(
  state => ({
    globalValue: state.select.value,
    theme: state.theme  
  }),
  dispatch => bindActionCreators(selectActions, dispatch)
);

const enhanceWithState = withState('value', 'setValue', '');

const enhanceWithProps = withProps(({value, theme, options, multi}) => ({
  searchable: true,
  labelKey: 'name',
  valueKey: 'value',
  optionRenderer: optionRenderer(theme),
  options,
  value,
  multi
}));

const enhanceWithHandlers = withHandlers({
  onChange: ({updateSelected, setValue}) => value => {
    setValue(value);
    updateSelected(value);
  },
  optionHeight: () => ({ option }) => option.type === 'header' ? 35 : 40
});

const Presentation = props => (
  <Select {...props}/>
);

export default compose(
  enhanceWithState,
  connectFunc,
  enhanceWithProps,
  enhanceWithHandlers
)(Presentation);
