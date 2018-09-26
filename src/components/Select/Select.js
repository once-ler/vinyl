import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';

export default ({
  labelKey,
  multi,
  onChange,
  onInputChange,
  optionHeight,
  optionRenderer,
  options,
  searchable,
  value,
  valueKey,
  style
}) => (
  <div style={{...style}}>
  <VirtualizedSelect
    labelKey={labelKey}
    multi={multi}
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
  </div>
);
