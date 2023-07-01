import React, { FC, ReactNode, MouseEventHandler } from 'react';
import stylesForModalOverlay from './modal-overlay.module.css';

const ModalOverlay: FC<{
  closeModal: () => void;
  children: ReactNode;
}> = ({ closeModal, children }) => {
  const handleClickOnOverlay: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <section
      className={stylesForModalOverlay.modalOverlay}
      onClick={handleClickOnOverlay}
    >
      {children}
    </section>
  );
};

export default ModalOverlay;
