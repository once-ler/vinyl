/* @flow */
const NAV_UPDATE = 'NAV_UPDATE';

const initialState = {
  toggle: false
};

const nav = (state = initialState, action) => {
  switch (action.type) {
    case NAV_UPDATE:
      return {
        ...state,
        ...action,
        toggle: !state.toggle
      };
    default:
      return state;
  }
};

export const update = data => {
  return {
    type: NAV_UPDATE,
    ...data
  };
};

export default nav;
