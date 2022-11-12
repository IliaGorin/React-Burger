import React from 'react';
import stylesForModalOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
  const handleClickOnOverlay = (event) => {
    if (event.target === event.currentTarget) {
      props.closeModal();
    }
  };

  let modalCurrentStyle = props.isActive
    ? `${stylesForModalOverlay.modalOverlay} ${stylesForModalOverlay.modalOverlay_active}`
    : `${stylesForModalOverlay.modalOverlay}`;

  return (
    <section className={modalCurrentStyle} onClick={handleClickOnOverlay}>
      {props.children}
    </section>
  );
};

// ModalOverlay.propTypes = {

// };

export default ModalOverlay;
