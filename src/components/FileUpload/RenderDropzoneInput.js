import React from 'react';
import Dropzone from 'react-dropzone';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import toClass from 'recompose/toClass';
import compose from 'recompose/compose';
import List from '../List/List';

const enhanceWithState = withState('files', 'setFiles', []);

const enhanceWithHandlers = withHandlers({
  handleDestroy: props => ctx => e => {
    e.preventDefault();
    const {setFiles, files} = props;

    setFiles(files.filter(n => n.data.text !== ctx.text));
  }
});
const enhanceWithLifecycle = lifecycle({
  componentWillReceiveProps(nextProps) {
    if (nextProps.files.length > 0 && typeof nextProps.value === 'undefined')
      this.props.setFiles([]);
  }
});

const renderDropzoneInput = (field) => {
  const { files, setFiles, handleDestroy } = field;
  
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, rejectedFiles ) => {
          field.onChange(filesToUpload);
          setFiles(filesToUpload.map((file, i) => ({ key: `f${i}`, data: { text: file.name }})));
        }}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.error &&
        <span className="error">{field.error}</span>}

      {files && Array.isArray(files) && (
        <List list={files} handleDestroy={handleDestroy} />
      )}
    </div>
  );
}

export default compose(
  enhanceWithState,
  enhanceWithLifecycle,
  enhanceWithHandlers,
  toClass
)(renderDropzoneInput);
