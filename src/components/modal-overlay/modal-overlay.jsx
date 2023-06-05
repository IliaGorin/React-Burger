import React from 'react';
import stylesForModalOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ closeModal, children }) => {
  const handleClickOnOverlay = (event) => {
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

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalOverlay;
