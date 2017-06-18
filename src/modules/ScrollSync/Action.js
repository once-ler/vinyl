/* @flow */
const SCROLLSYNC_LIST = 'SCROLLSYNC_LIST';
const SCROLLSYNC_LIST_RESET = 'SCROLLSYNC_LIST_RESET';
const SCROLLSYNC_COLUMNS = 'SCROLLSYNC_COLUMNS';
const initialState = {
  list: [],
  columns: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SCROLLSYNC_LIST:
      state.list = action.list;
      return state;
    case SCROLLSYNC_LIST_RESET:
      state.list = [];
      return state;
    case SCROLLSYNC_COLUMNS:
      state.columns = action.columns;
      return state;
    default:
      return state;
  }
};

export const setList = list => {
  return {
    type: SCROLLSYNC_LIST,
    list
  };
};

export const resetList = () => {
  return {
    type: SCROLLSYNC_LIST_RESET
  };
};

export const setColumns = columns => {
  return {
    type: SCROLLSYNC_COLUMNS,
    columns
  };
};

export default reducer;
