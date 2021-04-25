import React from "react";
import PropTypes from "prop-types";
import { Animated, View, TouchableOpacity, Text } from "react-native";
// Web
// import VirtualizedSelect from 'react-virtualized-select'
import Select from 'react-select'

const Presentation = props => {
  const {locals, multi} = props
  const onChange = selected => {
    locals.onChange(selected ? selected.value : selected)
  }

  return <Select {...props} value={locals.value} labelKey="text" isMulti={multi} options={locals.options} onChange={onChange} />
}

function select(locals) {
  if (locals.hidden) {
    return null;
  }

  const stylesheet = locals.stylesheet;
  let formGroupStyle = stylesheet.formGroup.normal;
  let controlLabelStyle = stylesheet.controlLabel.normal;
  let selectStyle = stylesheet.select.normal;
  let helpBlockStyle = stylesheet.helpBlock.normal;
  let errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    selectStyle = stylesheet.select.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  const label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null;
  const help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;
  const error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  return (
    <View style={formGroupStyle}>
      {label}
      <Presentation locals={locals} multi={false} />
      {help}
      {error}
    </View>
  );
}

module.exports = select;
