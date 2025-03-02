import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import TodoItem from "./TodoItem";
import Form from "./Form";
import UserContext from "./UserContext";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const userContext = useContext(UserContext);

  const fetchPriorityList = useCallback(async () => {
    if (!userContext.user) return;

    try {
      const res = await axios.get("/api/todos", {
        withCredentials: true,
      });
      const data = await res.data;
      setTodos(data);
    } catch (e) {
      console.error("failed to fetch todos", e);
    }
  }, [userContext.user]);

  useEffect(() => {
    fetchPriorityList();
  }, [fetchPriorityList]);

  const addTodo = async (newText) => {
    if (!userContext.user) {
      alert("Please log in to add");
      return;
    }

    try {
      await axios.post(
        "/api/todos",
        { text: newText.trim() },
        { withCredentials: true }
      );

      fetchPriorityList();
    } catch (e) {
      console.error("failed to add new todo in front", e);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/delete/${id}`, {
        withCredentials: true,
      });

      setTodos((todos) => todos.filter((item) => item.id !== id));
    } catch (e) {
      console.error("failed to delete a todo", e);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await axios.put(
        `/api/todos/toggle/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (!res.data || res.status !== 200) {
        throw new Error("Invalid response from server");
      }

      setTodos((todos) =>
        todos.map((todo) =>
          todo.id == id ? { ...todo, completed: res.data.completed } : todo
        )
      );
    } catch (e) {
      console.error("failed to update new todo in front", e);
    }
  };

  const editTodo = async (id, text) => {
    try {
      const res = await axios.put(
        `/api/todos/${id}`,
        { text: text.trim() },
        { withCredentials: true }
      );

      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: res.data.text } : todo
        )
      );
    } catch (e) {
      console.error("failed to update new todo in front", e);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">TO DO</h2>
      <Form addTodo={addTodo} isLoggedIn={userContext.user} />

      <fieldset className="space-y-2 mt-2">
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
          />
        ))}
      </fieldset>
    </div>
  );
}
