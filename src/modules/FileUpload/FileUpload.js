import React from 'react';
import {connect, bindActionCreators} from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import compose from 'recompose/compose';
import {uploadDocumentRequest} from './Action';
import FileUpload from '../../components/FileUpload/FileUpload';

const mapDispatchToProps = dispatch => ({
  uploadDocumentRequest, dispatch
});

const connectFunc = connect(
  state => ({upload: state.upload}),
  mapDispatchToProps
);

const enhanceWithHandlers = withHandlers({
  handleFileUpload: props => ({files}) => {
    const file = files[0];
    uploadDocumentRequest({
       file,
       name: 'Awesome Cat Pic'
    });
  },
  onChange: props => event => {
    const { handleFileUpload, multiple } = props;
    let data = event.target.files;
    if (!multiple) {
      data = data[0];
    }
    handleFileUpload(data);
  }  
});

export default compose(
  connectFunc,
  enhanceWithHandlers
)(FileUpload);
