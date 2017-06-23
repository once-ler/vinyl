import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';

export default ({
  labelKey,
  onChange,
  onInputChange,
  optionHeight,
  optionRenderer,
  options,
  searchable,
  value,
  valueKey
}) => (
  <VirtualizedSelect
    labelKey={labelKey}
    onChange={onChange}
    onInputChange={onInputChange}
    optionHeight={optionHeight || 35}
    optionRenderer={optionRenderer}
    options={options}
    searchable={searchable}
    simpleValue
    value={value}
    valueKey={valueKey}
  />
);
