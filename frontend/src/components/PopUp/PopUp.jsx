import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './PopUp.module.css';

function PopUp({
  close, maxWidth, closeWithBackground, closeButton, children, callback,
}) {
  const refPopUp = useRef();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      close();
    }, 500);
  };

  const handleCloseWithBackground = (e) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();

      if (closeWithBackground) {
        handleClose();
      }
    }
  };

  const handleCloseWithButton = (e) => {
    e.stopPropagation();
    if (closeButton) {
      handleClose();
    }
  };

  return (
    <div
      className={`${styles.popUp} ${isClosing ? styles.popUpFadeOut : ''}`}
      ref={refPopUp}
      onClick={handleCloseWithBackground}
      onKeyUp={handleCloseWithBackground}
      role="button"
      tabIndex="0"
    >
      <div className={`${styles.popUpBody}`} style={{ maxWidth: `${maxWidth}px` }}>
        <div className={styles.popUpHeader}>
          {closeButton ? (
            <div
              className={styles.xIcon}
              onClick={handleCloseWithButton}
              onKeyUp={handleCloseWithButton}
              role="button"
              tabIndex="0"
            />
          ) : null}
        </div>
        <div className={styles.popUpBodyContainer}>
          {React.cloneElement(children, {
            handleClose,
            close,
            callback,
          })}
        </div>
      </div>
    </div>
  );
}

export default PopUp;

PopUp.propTypes = {
  maxWidth: PropTypes.number,
  close: PropTypes.func.isRequired,
  callback: PropTypes.func,
  closeWithBackground: PropTypes.bool,
  closeButton: PropTypes.bool,
  children: PropTypes.node,
};

PopUp.defaultProps = {
  maxWidth: 700,
  closeWithBackground: true,
  closeButton: true,
  callback: null,
  children: null,
};