import React, { createContext, useReducer, useContext } from 'react';

const TodoContext = createContext();

const initialState = {
  todos: localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const updatedTodosAdd = [...state.todos, action.payload];
      localStorage.setItem('todos', JSON.stringify(updatedTodosAdd));
      return { todos: updatedTodosAdd };

    case 'TOGGLE_TODO':
      const updatedTodosToggle = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodosToggle));
      return { todos: updatedTodosToggle };

    case 'REMOVE_TODO':
      const updatedTodosRemove = state.todos.filter(
        (todo) => todo.id !== action.payload,
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodosRemove));
      return { todos: updatedTodosRemove };

    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
