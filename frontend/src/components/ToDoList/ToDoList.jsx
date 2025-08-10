import React, { useState, useEffect } from 'react'
import { serverHost } from '../../config';
import useFetch from '../../hooks/useFetch';
// import Button from '../Button/Button';

function ToDoList() {
  const { callFetch, result, error, loading } = useFetch();
  const [toDoList, setToDoList] = useState([]);

  const fetchToDoList = () => {
    callFetch({ uri: `${serverHost}/toDoList` });
  };

  useEffect(() => {
    fetchToDoList();
  }, []);

  useEffect(() => {
    if (result) {
      setToDoList(result);
    }
  }, [result]);

  return (
    <div>
      <h1>To Do List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {toDoList.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default ToDoList