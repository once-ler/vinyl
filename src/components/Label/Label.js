/* @flow */
import styled from 'styled-components';

const Label = styled.label `
  margin-top: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 10px;
  color: #333;
  display: block;
  margin-bottom: 4px;
  cursor: text;
  &:hover {
    color: #262626;
  }
`;

export default Label;
