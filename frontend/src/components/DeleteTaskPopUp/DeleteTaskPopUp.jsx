import React from 'react';
import PropTypes from 'prop-types';
import PopUp from '../PopUp/PopUp';
import styles from './DeleteTaskPopUp.module.css';

function DeleteTaskPopUp({ close, confirm, taskTitle }) {
  return (
    <PopUp close={close} closeWithBackground closeButton>
      <div className={styles.popupContainer}>
        <h2 className={styles.popupHeader}>Confirm Delete</h2>
        <p className={styles.popupMessage}>Are you sure you want to delete the task "{taskTitle}"?</p>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={confirm}
            className={`${styles.button} ${styles.confirmButton}`}
          >
            Yes, Delete
          </button>
          <button
            type="button"
            onClick={close}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
        </div>
      </div>
    </PopUp>
  );
}

DeleteTaskPopUp.propTypes = {
  close: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  taskTitle: PropTypes.string.isRequired,
};

export default DeleteTaskPopUp;
