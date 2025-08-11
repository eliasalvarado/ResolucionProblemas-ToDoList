import React, { useState, useEffect } from 'react';
import { serverHost } from '../../config';
import useFetch from '../../hooks/useFetch';
import styles from './ToDoList.module.css';

function ToDoList() {
  const { callFetch, result, error, loading } = useFetch();
  const [tasks, setTasks] = useState([]);

  const fetchToDoList = () => {
    callFetch({ uri: `${serverHost}/toDoList` });
  };

  const sortTasks = (tasksArray) => {
    return tasksArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getDateString = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true, day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString).toLocaleString('es-GT', options);
    const [datePart, timePart] = date.split(", ");
    return `${timePart}, ${datePart}`;
  }

  useEffect(() => {
    fetchToDoList();
  }, []);

  useEffect(() => {
    if (result) {
      setTasks(sortTasks(result));
    }
  }, [result]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul className={styles.todoList}>
        {tasks.length === 0 ? (
          <div className={styles.noTasks}>No Todo Found</div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={styles.todoItem}>
              <input type="checkbox" className={styles.checkbox} />
              <div className={styles.taskInfo}>
                <span className={styles.taskTitle}>{task.title}</span>
                <span className={styles.taskDate}>{getDateString(task.createdAt)}</span>
              </div>
              <div className={styles.taskActions}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default ToDoList;