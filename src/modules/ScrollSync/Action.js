/* @flow */
const LONG_LIST = 'LONG_LIST_RELOAD';
const LONG_LIST_REFERSH = 'LONG_LIST_REFERSH';
const initialState = {
  list: []
};

const resources = (state = initialState, action) => {
  switch (action.type) {
    case LONG_LIST:
      state.list = state.list.concat(action.list);
      return state;
    case LONG_LIST_REFERSH:
      state.list = [];
      return state;
    default:
      return state;
  }
};

export const add = list => {
  return {
    type: LONG_LIST,
    list
  };
};

export const reset = () => {
  return {
    type: LONG_LIST_REFERSH
  };
};

export default resources;
