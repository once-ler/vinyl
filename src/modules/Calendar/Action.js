import events from './events';

const ADD_EVENT = 'ADD_EVENT';

export default (state = { events }, action) => {
  switch (action.type) {
    case ADD_EVENT:
      const events = [...state.events, action.event];
      return {events};
    default:
      return state;
  }
};

export const addEvent = event => ({TYPE: ADD_EVENT, event});
