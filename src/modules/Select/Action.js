const UPDATE_SELECTED = 'UPDATE_SELECTED';

const initialState = {
  value: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_SELECTED:
      return {
        value: action.value
      };
    default:
      return state;
  }
}

export const updateSelected = value => ({type: UPDATE_SELECTED, value});
