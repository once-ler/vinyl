import React from 'react';
import { Field, Submit } from 'simpler-redux-form';
import Dropzone from 'react-dropzone';
import toClass from 'recompose/toClass';
import Legend from '../Legend/Legend';
import SubmitButton from '../Button/SubmitButton';
import Button from '../Button/Button';
import Container from '../Container/Container';
import FormComponent from '../Form/Form';
import ResponsiveRow from '../Row/ResponsiveRow';
import SlideContainer from '../Container/SlideContainer';

const renderDropzoneInput = (field) => {
  const files = field.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.error &&
        <span className="error">{field.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

const enahceRenderDropzoneInput = toClass(renderDropzoneInput);

export default ({submitAction, validateNotEmpty, submit, error, reset, dispatch}) => (
  <SlideContainer>      
    <Container backgroundColor="#fefefe">
      <FormComponent
        onSubmit={ submit(submitAction(dispatch)) }>
        <ResponsiveRow><Legend>Upload Form</Legend></ResponsiveRow>
        <ResponsiveRow>
        <Field
          name="files"
          component={enahceRenderDropzoneInput}
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
