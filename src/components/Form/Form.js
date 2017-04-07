/* @flow */
import React from 'react';
import styled from 'styled-components';
import Row from '../Row/Row';

const DefaultForm = styled.form `
  height: 100%;
  width: 100%;
  background-color: #fefefe;
  * {
    box-sizing: border-box;
  }
  *::before {
    box-sizing: border-box;
  }
  *::after {
    box-sizing: border-box;
  }
`;

const Form = props => {
  const { children, ...rest } = props;
  return (
    <Row wrap center padding="20px"><DefaultForm {...rest}>{children}</DefaultForm></Row>
  );
};

export default Form;
