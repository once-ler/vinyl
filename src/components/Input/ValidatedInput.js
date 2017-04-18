import React from 'react';
import styled from 'styled-components';
import toClass from 'recompose/toClass';
import FormCell from '../Cell/FormCell';
import Label from '../Label/Label';
import Input from './Input';

const FieldContainer = styled.div`
  height: 54px;
  border-right: 1px solid #333333;
  display: block;
  padding: 8px;
`;

const ValidatedInput = props => {
  const { error, indicateInvalid, label, growBasis, ...rest } = props;
  return (
    <FormCell growBasis={growBasis}>
      <FieldContainer>
      <Label>{label}</Label>
      <Input {...rest}></Input>
      { indicateInvalid && <div className="error">{error}</div> }
      </FieldContainer>
    </FormCell>
  );
};

export default toClass(ValidatedInput);
