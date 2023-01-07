import React from 'react';
import stylesForModalOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
  const handleClickOnOverlay = (event) => {
    if (event.target === event.currentTarget) {
      props.closeModal();
    }
  };

  return (
    <section
      className={stylesForModalOverlay.modalOverlay}
      onClick={handleClickOnOverlay}
    >
      {props.children}
    </section>
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalOverlay;
