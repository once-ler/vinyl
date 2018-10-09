import React from 'react';
import {connect} from 'react-redux';
// import { Form as SimplerForm, } from 'simpler-redux-form';
// import { Form as SimplerForm, } from 'easy-react-form';
import toClass from 'recompose/toClass';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import {uploadDocumentRequest} from './Action';
import Presentation from '../../components/FileUpload/FileUpload';

const enhanceWithProps = withProps(
  ownerProps => ({
    submitAction: dispatch => data => {
      console.log(FormData);

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
    },
    validateNotEmpty: input => !input ? 'Required.' : undefined
  })
);

const connectFunc = connect(
  state => ({
    files: state.upload.files
  }),
  dispatch => ({
    dispatch
  })
);

export default compose(
  connectFunc,
  // SimplerForm({id: 'upload'}),
  toClass,
  enhanceWithProps  
)(Presentation);
