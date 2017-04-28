import React from 'react';
import { connect } from 'react-redux';

import NestedJsonModal from './NestedJsonModal'

const MODAL_COMPONENTS = {
  'NESTED_JSON_MODAL': NestedJsonModal
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
