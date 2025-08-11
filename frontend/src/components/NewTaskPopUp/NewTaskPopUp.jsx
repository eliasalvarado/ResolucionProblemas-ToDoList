import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { serverHost } from '../../config'
import useFetch from '../../hooks/useFetch'
import PopUp from '../PopUp/PopUp'
import styles from './NewTaskPopUp.module.css'

function NewTaskPopUp({ close }) {
  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState(false)
  const { callFetch, loading, error } = useFetch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await callFetch({
      uri: `${serverHost}/toDoList`,
      method: 'POST',
      body: JSON.stringify({ title, completed }),
    })
    close()
  }

  return (
    <PopUp close={close} closeWithBackground closeButton>
      <div className={styles.popupContainer}>
        <h2 className={styles.popupHeader}>Add Task</h2>
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
          {loading && <p>Saving...</p>}
          {error && <p>Error: {error.message}</p>}
          <div className={styles.buttonGroup}>
            <button
              type="submit"
              disabled={loading}
              className={`${styles.button} ${styles.saveButton}`}
            >
              AddTask
            </button>
            <button
              type="button"
              onClick={close}
              disabled={loading}
              className={`${styles.button} ${styles.cancelButton}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </PopUp>
  )
}

NewTaskPopUp.propTypes = {
  close: PropTypes.func.isRequired,
}

export default NewTaskPopUp