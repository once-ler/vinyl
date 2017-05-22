import React from 'react';
import {connect, bindActionCreators} from 'react-redux';
import { Form as SimplerForm, Field, Submit } from 'simpler-redux-form';
import Dropzone from 'react-dropzone';
import toClass from 'recompose/toClass';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';

import {uploadDocumentRequest} from './Action';
import Legend from '../../components/Legend/Legend';
import SubmitButton from '../../components/Button/SubmitButton';
import Container from '../../components/Container/Container';
import FormComponent from '../../components/Form/Form';
import ResponsiveRow from '../../components/Row/ResponsiveRow';
import SlideContainer from '../../components/Container/SlideContainer';

// import FileUpload from '../../components/FileUpload/FileUpload';

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

const submitAction1 = data => (dispatch, getState) => dispatch({ type: 'SUBMIT_REQUEST', data });

const submitAction = data => { console.log(data); return (dispatch, getState) => {
  console.log(dispatch);
  const body = new FormData();
  Object.keys(data).forEach(( key ) => {
    body.append(key, data[ key ]);
  });

  console.info('POST', body, data);
  console.info('This is expected to fail:');
  fetch(`http://example.com/send/`, {
    method: 'POST',
    body: body,
  })
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
};
};

const Presentation = props => {
  const {onSubmit, submit, error, reset} = props;
  
  return (
    <SlideContainer {...props}>      
      <Container backgroundColor="#fefefe">
        <FormComponent
          onSubmit={onSubmit}>
          <ResponsiveRow><Legend>Upload Form</Legend></ResponsiveRow>
          <ResponsiveRow>
          <Field
            name="files"
            component={enahceRenderDropzoneInput}
            type="file"
          />
          </ResponsiveRow>
          <ResponsiveRow middle center>
          <Submit component={ SubmitButton }>Upload</Submit>
          </ResponsiveRow>
          <ResponsiveRow middle center>
          <button onClick={reset}>
            Clear Values
          </button>
          </ResponsiveRow>
        </FormComponent>
      </Container>
    </SlideContainer>);
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  submitAction
});

const connectFunc = connect(
  state => ({
    files: state.upload.files
  }),
  mapDispatchToProps
);

const enhanceWithForm = SimplerForm({id: 'upload'});

const enhanceWithHandlers = withHandlers({
  onSubmit: props => event => {
    const {submit, reset, dispatch, submitAction, files} = props;
    const capture = submit(submitAction);
    capture(event);
  }
});

export default compose(
  connectFunc,
  enhanceWithForm,
  enhanceWithHandlers,
  toClass  
)(Presentation);
