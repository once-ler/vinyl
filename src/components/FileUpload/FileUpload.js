import React from 'react';
// import { Field, Submit } from 'simpler-redux-form';
import { Form as FormComponent, Field, Submit } from 'easy-react-form';
import Legend from '../Legend/Legend';
import SubmitButton from '../Button/SubmitButton';
import Button from '../Button/Button';
import Container from '../Container/Container';
// import FormComponent from '../Form/Form';
import ResponsiveRow from '../Row/ResponsiveRow';
import SlideContainer from '../Container/SlideContainer';

import RenderDropzoneInput from './RenderDropzoneInput';

// TODO.  This is a stub for deprecated simpler-redux-form.
const submit = f => {}

export default ({submitAction, validateNotEmpty, error, reset, dispatch}) => (
  <SlideContainer>      
    <Container backgroundColor="#fefefe">
      <FormComponent
        onSubmit={ submit(submitAction(dispatch)) }>
        <ResponsiveRow><Legend>Upload Form</Legend></ResponsiveRow>
        <ResponsiveRow>
        <Field
          name="files"
          component={RenderDropzoneInput}
          type="file"
          validate={validateNotEmpty}
        />
        </ResponsiveRow>
        <ResponsiveRow middle center>
        <Submit component={ SubmitButton }>Upload</Submit>
        </ResponsiveRow>
        <ResponsiveRow middle center>
        <Button onClick={reset}>
          Clear Values
        </Button>
        </ResponsiveRow>
      </FormComponent>
    </Container>
  </SlideContainer>
);
