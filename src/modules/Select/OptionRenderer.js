import React from 'react';
import styled from 'styled-components';

const Base = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 4px;
  transition-duration: 0.4s;
`;

const Header = styled(Base)`
  font-weight: 700;
  box-shadow: 0 8px 6px -6px #777;
  justify-content: center;
`;

const Option = styled(Base)`
  cursor: pointer;
  margin-left: 15px;
  :hover {
    font-weight: 900;
    letter-spacing: 1px;
  }
`;

export default theme =>
({
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
      <Header
        key={key}
        style={{...style, color: theme.main}}
      >
        {option.name}
      </Header>
    )
  } else {
    return (
      <Option
        className="customOption"
        key={key}
        onClick={() => selectValue(option)}
        onMouseOver={() => focusOption(option)}
        style={{...style, color: theme.secondary}}
      >
        {option.name}
      </Option>
    )
  }
};
