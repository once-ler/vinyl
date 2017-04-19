import React from 'react';
import toClass from 'recompose/toClass';
import FormCell from '../Cell/FormCell';
import Label from '../Label/Label';
import ErrorLabel from '../Label/ErrorLabel';
import Input from './Input';
import FieldContainer from '../Field/FieldContainer';

const ValidatedInput = props => {
  const { error, indicateInvalid, label, growBasis, ...rest } = props;
  return (
    <FormCell growBasis={growBasis}>
      <FieldContainer>
      <Label>{label}</Label>
      <Input {...rest}></Input>
      { indicateInvalid && <ErrorLabel>{error}</ErrorLabel> }
      </FieldContainer>
    </FormCell>
  );
};

export default toClass(ValidatedInput);
