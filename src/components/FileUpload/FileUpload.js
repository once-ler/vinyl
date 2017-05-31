import React from 'react';
import { Field, Submit } from 'simpler-redux-form';
import Dropzone from 'react-dropzone';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import toClass from 'recompose/toClass';
import compose from 'recompose/compose';
import Legend from '../Legend/Legend';
import SubmitButton from '../Button/SubmitButton';
import Button from '../Button/Button';
import Container from '../Container/Container';
import FormComponent from '../Form/Form';
import ResponsiveRow from '../Row/ResponsiveRow';
import SlideContainer from '../Container/SlideContainer';
import List from '../List/List';

const renderDropzoneInput1 = (field) => {
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

let files_ = [];

const handleDestroy = ({text, dispatch}) => e => {
  e.preventDefault();
  console.log([text, dispatch, e.target]);
  files_.splice(files_.indexOf(text), 1);
};

const enhanceWithState = withState('files1', 'setFiles', []);
const enhanceWithHandlers = withHandlers({
  handleDestroy: props => extra => e => {
    e.preventDefault();
    console.log(e);
    console.log(extra)
    console.log(props);
  }
});

const renderDropzoneInput = (field) => {
  const files = field.value;
  if (files) files_ = files;
  // if (files) field.setFiles(files);
  console.log(field);
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => { field.onChange(filesToUpload); field.setFiles(filesToUpload); }}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.error &&
        <span className="error">{field.error}</span>}
      {files && Array.isArray(files) && (
        <List list={files.map(file => file.name)} handleDestroy={field.handleDestroy} dispatch={field.dispatch} />
      )}
    </div>
  );
}

// const enahceRenderDropzoneInput = toClass(renderDropzoneInput);
const enahceRenderDropzoneInput = compose(
  enhanceWithState,
  enhanceWithHandlers,
  toClass
 )(renderDropzoneInput);

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
