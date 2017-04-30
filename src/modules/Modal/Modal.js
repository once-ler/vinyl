import React from 'react';
import { connect } from 'react-redux';

import DefaultModal from './DefaultModal'

const MODAL_COMPONENTS = {
  'DEFAULT_MODAL': DefaultModal
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <span />
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...modalProps} />
}

export default connect(
  state => state.modal
)(ModalRoot);
