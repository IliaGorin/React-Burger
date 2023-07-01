import React, { useEffect, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForModal from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { MODAL_ROOT } from '../../utils/constants';

const Modal: FC<{
  closeModal: () => void;
  title: string;
  children: ReactNode;
}> = ({ closeModal, title, children }) => {
  useEffect(() => {
    const pressEsc = (event: KeyboardEvent) => {
      event.key === 'Escape' && closeModal();
    };
    document.addEventListener('keydown', pressEsc);
    return () => {
      document.removeEventListener('keydown', pressEsc);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={stylesForModal.modalContainer}>
        <h4 className="text text_type_main-large">{title}</h4>
        <div className={stylesForModal.modalClose} onClick={closeModal}>
          <CloseIcon type="primary" />
        </div>
        <div className={stylesForModal.modalWrapper}>{children}</div>
      </div>
    </ModalOverlay>,
    MODAL_ROOT
  );
};

export default Modal;
