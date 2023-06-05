import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForModal from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { MODAL_ROOT } from '../../utils/constants';

const Modal = ({ closeModal, title, children }) => {
  useEffect(() => {
    const pressEsc = (event) => {
      event.key === 'Escape' && closeModal();
    };
    document.addEventListener('keydown', pressEsc);
    return () => {
      document.removeEventListener('keydown', pressEsc);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={closeModal} closeModal={closeModal}>
      <div className={stylesForModal.modalContainer}>
        <h4 className="text text_type_main-large">{title}</h4>
        <div className={stylesForModal.modalClose} onClick={closeModal}>
          <CloseIcon className type="primary" />
        </div>
        <div className={stylesForModal.modalWrapper}>{children}</div>
      </div>
    </ModalOverlay>,
    MODAL_ROOT
  );
};

Modal.propTypes = {
  // closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
