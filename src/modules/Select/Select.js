import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';
import Select from '../../components/Select/Select';
import Container from '../../components/Container/Container';
import * as selectActions from './Action';
import optionRenderer from './OptionRenderer';
import options from './Options';

const connectFunc = connect(
  state => ({
    globalValue: state.select.value,
    theme: state.theme  
  }),
  dispatch => bindActionCreators(selectActions, dispatch)
);

const enhanceWithState = withState('value', 'setValue', '');

const enhanceWithProps = withProps(({value, theme}) => ({
  searchable: true,
  labelKey: 'name',
  valueKey: 'name',
  optionRenderer: optionRenderer(theme),
  options,
  value
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
