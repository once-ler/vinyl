/* eslint max-len: 0 */
const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
const SUBMIT_FAILURE = 'SUBMIT_FAILURE';

const initialState = {
  user: {},
  loading: false,
  loaded: false,
  error: ''
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_REQUEST:
      return {
        ...action,
        loading: true,
        loaded: false,
        error: '',
        user: {}
      };

    case SUBMIT_SUCCESS:
      return {
        ...action,
        loaded: true,
        loading: false,
        error: '',
        user: { name: 'Foo', id: 'foo' }
      };

    case SUBMIT_FAILURE:
      return {
        ...action,
        error: `${action.error.response.status} -> ${action.error.response.statusText}`,
        loading: false,
        loaded: false,
        user: { name: 'Unauthorized', id: 'X' }
      };

    default:
      return state;
  }
};

export default profile;
