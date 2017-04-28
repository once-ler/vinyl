export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

const initialState = {
  modalType: null,
  modalIsOpen: false,
  modalProps: {}
}

export const hideModal = () => ({ type: HIDE_MODAL });

export default function modal(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        modalIsOpen: true,
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case 'HIDE_MODAL':
      return initialState;
    default:
      return state;
  }
}
