import React, { useState } from 'react'
import ToDoList from '../../components/ToDoList/ToDoList'
import NewTaskPopUp from '../../components/NewTaskPopUp/NewTaskPopUp'
import styles from './Home.module.css'

function Home() {
  const [showPopUp, setShowPopUp] = useState(false)
  const [filter, setFilter] = useState('All')
  const [refresh, setRefresh] = useState(false)

  const handleOpenPopUp = () => {
    setShowPopUp(true)
  }

  const handleClosePopUp = () => {
    setShowPopUp(false)
    setRefresh(!refresh)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>TODO LIST</h1>
      <div className={styles.bodyContainer}>
        <div className={styles.header}>
          <button className={styles.addButton} onClick={handleOpenPopUp}>Add Task</button>
          <select className={styles.filter} value={filter} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>
        <ToDoList filter={filter} refresh={refresh} />
      </div>
      {showPopUp && (
        <NewTaskPopUp close={handleClosePopUp} />
      )}
    </div>
  )
}

export default Home