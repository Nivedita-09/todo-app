import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Fetch all to-do items from the backend
    axios
      .get("http://localhost:3001/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddTodo = () => {
    // Create a new to-do item
    axios
      .post("http://localhost:3001/todos", { title: newTodo, completed: false })
      .then((response) => {
        const newTodoItem = {
          id: response.data.id,
          title: newTodo,
          completed: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateTodo = (id, completed) => {
    // Update the completion status of a to-do item
    axios
      .put(`http://localhost:3001/todos/${id}`, { completed: !completed })
      .then(() => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed: !completed };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteTodo = (id) => {
    // Delete a to-do item
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEditTodo = (id) => {
    const newTitle = prompt("Enter the new title:");
    if (newTitle) {
      // Update the title of a to-do item
      axios
        .put(`http://localhost:3001/todos/${id}`, { title: newTitle })
        .then(() => {
          const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, title: newTitle };
            }
            return todo;
          });
          setTodos(updatedTodos);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new task"
        className="center-it"
      />
      <button type="button" onClick={handleAddTodo} className="center-it">
        Add
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleUpdateTodo(todo.id, todo.completed)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>

            <button type="button" onClick={() => handleEditTodo(todo.id)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
