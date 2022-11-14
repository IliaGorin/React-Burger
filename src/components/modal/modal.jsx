import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForModal from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { MODAL_ROOT } from '../../utils/constants';

const Modal = (props) => {
  useEffect(() => {
    if (!props.isActive) return;

    const pressEsc = (event) => {
      event.key === 'Escape' && props.closeModal();
    };
    document.addEventListener('keydown', pressEsc);
    return () => {
      document.removeEventListener('keydown', pressEsc);
    };
  }, [props.closeModal, props.isActive]);

  return ReactDOM.createPortal(
    <ModalOverlay
      isActive={props.isActive}
      onClick={props.closeModal}
      closeModal={props.closeModal}
    >
      <div className={stylesForModal.modalContainer}>
        <div className={stylesForModal.modalClose} onClick={props.closeModal}>
          <CloseIcon className type="primary" />
        </div>
        <div className={stylesForModal.modalWrapper}>{props.children}</div>
      </div>
    </ModalOverlay>,
    MODAL_ROOT
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
