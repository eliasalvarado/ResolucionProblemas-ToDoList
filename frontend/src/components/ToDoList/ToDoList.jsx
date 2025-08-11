import React, { useState, useEffect, useCallback } from 'react';
import { serverHost } from '../../config';
import Spinner from '../Spinner/Spinner';
import useFetch from '../../hooks/useFetch';
import { FaTrash } from 'react-icons/fa';
import { MdModeEdit } from "react-icons/md";
import EditTaskPopUp from '../EditTaskPopUp/';
import styles from './ToDoList.module.css';

function ToDoList({ filter, refresh }) {
  const { callFetch, result, error, loading } = useFetch();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchToDoList = useCallback(() => {
    callFetch({ uri: `${serverHost}/toDoList` });
  }, [callFetch]);

  const updateTaskStatus = async (taskId, completed) => {
    await callFetch({
      uri: `${serverHost}/toDoList/${taskId}`,
      method: 'PUT',
      body: JSON.stringify({ completed }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchToDoList();
  };

  const deleteTask = async (taskId) => {
    await callFetch({
      uri: `${serverHost}/toDoList/${taskId}`,
      method: 'DELETE',
    });
    fetchToDoList();
  };

  const sortTasks = (tasksArray) => {
    return tasksArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getDateString = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true, day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString).toLocaleString('es-GT', options);
    const [datePart, timePart] = date.split(", ");
    return `${timePart}, ${datePart}`;
  };

  const filterTasks = (tasksArray) => {
    if (filter === 'Complete') {
      return tasksArray.filter((task) => task.completed);
    }
    if (filter === 'Incomplete') {
      return tasksArray.filter((task) => !task.completed);
    }
    return tasksArray;
  };

  useEffect(() => {
    fetchToDoList();
  }, [refresh]);

  useEffect(() => {
    if (result) {
      setTasks(sortTasks(result));
    }
  }, [result]);

  useEffect(() => {
    if (editingTask === null) {
      fetchToDoList();
    }
  }, [editingTask]);

  const filteredTasks = filterTasks(tasks);

  const closeEditPopUp = () => {
    setEditingTask(null);
  };

  return (
    <div>
      {editingTask && (
        <EditTaskPopUp
          task={editingTask}
          close={closeEditPopUp}
        />
      )}
      {error && <p>Error: {error.message}</p>}
      {loading ? <Spinner /> : (
        <ul className={filteredTasks.length === 0 ? styles.todoListNoTasks : styles.todoList}>
          {filteredTasks.length === 0 ? (
            <div className={styles.noTasks}>No Todo Found</div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className={styles.todoItem}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={task.completed}
                  onChange={() => updateTaskStatus(task.id, !task.completed)}
                />
                <div className={styles.taskInfo}>
                  <span className={`${styles.taskTitle} ${task.completed ? styles.completed : ''}`}>{task.title}</span>
                  <span className={styles.taskDate}>{getDateString(task.createdAt)}</span>
                </div>
                <div className={styles.taskActions}>
                  <button className={styles.deleteButton} onClick={() => deleteTask(task.id)}><FaTrash /></button>
                  <button className={styles.editButton} onClick={() => setEditingTask(task)}><MdModeEdit /></button>
                </div>
              </div>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default ToDoList;