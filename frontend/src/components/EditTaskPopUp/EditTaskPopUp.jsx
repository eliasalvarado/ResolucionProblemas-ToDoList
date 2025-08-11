import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { serverHost } from '../../config';
import useFetch from '../../hooks/useFetch';
import PopUp from '../PopUp/PopUp';
import Spinner from '../Spinner/Spinner';
import styles from './EditTaskPopUp.module.css';

function EditTaskPopUp({ close, task }) {
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);
  const { callFetch, loading, error } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await callFetch({
      uri: `${serverHost}/toDoList/${task.id}`,
      method: 'PUT',
      body: JSON.stringify({ title, completed }),
      headers: { 'Content-Type': 'application/json' },
    });
    close();
  };

  return (
    <PopUp close={close} closeWithBackground closeButton>
      <div className={styles.popupContainer}>
        <h2 className={styles.popupHeader}>Update Task</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="completed" className={styles.label}>
              Status
            </label>
            <select
              id="completed"
              value={completed}
              onChange={(e) => setCompleted(e.target.value === 'true')}
              className={styles.select}
            >
              <option value="false">Incomplete</option>
              <option value="true">Complete</option>
            </select>
          </div>
          {error && <p>Error: {error.message}</p>}
          <div className={styles.buttonGroup}>
            {loading ? <Spinner /> : (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  className={`${styles.button} ${styles.saveButton}`}
                >
                  Update Task
                </button>
                <button
                  type="button"
                  onClick={close}
                  disabled={loading}
                  className={`${styles.button} ${styles.cancelButton}`}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </PopUp>
  );
}

EditTaskPopUp.propTypes = {
  close: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default EditTaskPopUp;
