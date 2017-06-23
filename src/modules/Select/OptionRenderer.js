import React from 'react';

export default ({
  focusedOption,
  focusedOptionIndex,
  focusOption,
  key,
  labelKey,
  option,
  optionIndex,
  options,
  selectValue,
  style,
  valueArray
}) => {
  if (option.type === 'header') {
    return (
      <div
        key={key}
        style={style}
      >
        {option.name}
      </div>
    )
  } else {
    return (
      <div
        key={key}
        onClick={() => selectValue(option)}
        onMouseOver={() => focusOption(option)}
        style={style}
      >
        {option.name}
      </div>
    )
  }
};
