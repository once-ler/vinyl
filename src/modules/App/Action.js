/* @flow */
const NAV_ACTIVE = 'NAV_ACTIVE';

const initialState = {
  active: '/'
};

const nav = (state = initialState, action) => {
  switch (action.type) {
    case NAV_ACTIVE:
      return {
        ...action
      };
    default:
      return state;
  }
};

export const makeActive = key => {
  console.log(key);
  return {
    type: NAV_ACTIVE,
    active: key
  };
};

export default nav;
