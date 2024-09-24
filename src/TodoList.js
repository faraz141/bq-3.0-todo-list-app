// src/TodoList.js
import React, { useState } from 'react';
import { useTodos } from './TodoContext';
import './App.css';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const { state, dispatch } = useTodos();

  const handleAddTodo = () => {
    if (inputValue.trim() === '') {
      alert('You must write something!');
    } else {
      dispatch({
        type: 'ADD_TODO',
        payload: { id: Date.now(), text: inputValue.trim(), completed: false },
      });
      setInputValue('');
    }
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>To-Do list</h2>
        <div className="row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            id="input-box"
            placeholder="Add your text"
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul id="list-container">
          {state.todos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed ? 'checked' : ''}
              onClick={() =>
                dispatch({ type: 'TOGGLE_TODO', payload: todo.id })
              }
            >
              {todo.text}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'REMOVE_TODO', payload: todo.id });
                }}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
