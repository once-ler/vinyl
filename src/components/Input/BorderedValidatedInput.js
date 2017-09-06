import React from 'react';
import toClass from 'recompose/toClass';
import ValidatedInput from './ValidatedInput';

export default toClass(props => (<ValidatedInput right={true} {...props} />));
