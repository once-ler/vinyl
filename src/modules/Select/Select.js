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
    globalValue: state.select.value    
  }),
  dispatch => bindActionCreators(selectActions)
);

const enhanceWithState = withState('value', 'setValue', '');

const enhanceWithProps = withProps(props => ({
  searchable: true,
  labelKey: 'interest',
  valueKey: 'interest',
  optionRenderer,
  options
}));

const enhanceWithHandlers = withHandlers({
  onChange: ({selectActions, setValue}) => ({value}) => {
    setValue(value);
    selectActions.updateSelected(value);
  },
  optionHeight: () => ({ option }) => option.type === 'header' ? 25 : 35
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
