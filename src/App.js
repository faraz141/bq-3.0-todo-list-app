// src/App.js
import React from 'react';
import TodoList from './TodoList';
import { TodoProvider } from './TodoContext';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 py-10">
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
