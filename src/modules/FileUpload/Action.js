// import FormData from 'form-data';
import axios from 'axios';

export const UPLOAD_DOCUMENT_SUCCESS = 'UPLOAD_DOCUMENT_SUCCESS';
export const UPLOAD_DOCUMENT_FAIL = 'UPLOAD_DOCUMENT_FAIL';

export function uploadSuccess({ data }) {
  return {
    type: UPLOAD_DOCUMENT_SUCCESS,
    data
  };
}

export function uploadFail(error) {
  return {
    type: UPLOAD_DOCUMENT_FAIL,
    error
  };
}

export function uploadDocumentRequest({ file, name }) {  
  let data = new FormData();
  data.append('file', document);
  data.append('name', name);

  return (dispatch) => {
    axios.post('/files', data)
      .then(response => dispatch(uploadSuccess(response)))
      .catch(error => dispatch(uploadFail(error)));
  };
}

const initialState = {
  files: []
};

export default function upload(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_DOCUMENT_SUCCESS:
      return {...state, ...action.data};
    case UPLOAD_DOCUMENT_FAIL:
      return {...state, ...action.error};
    default:
      return state; 
  }
};
