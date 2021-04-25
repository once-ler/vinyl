import React, { useRef } from 'react';
// import toClass from 'recompose/toClass';
import ValidatedInput from './ValidatedInput';

const BorderedValidateInputComponent = props => {
  const validatedInputRef = useRef()
  return (<ValidatedInput ref={validatedInputRef} right={true} {...props} />)
}

export default BorderedValidateInputComponent
