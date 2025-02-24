import { useState, useEffect, useContext, useCallback } from "react";
import TodoItem from "./TodoItem";
import Form from "./Form";
import { useUser } from "./UserContext";
import axios from "axios";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const { user } = useUser();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchPriorityList = useCallback(async () => {
    if (!user) return;

    try {
      const res = await axios.get(`${API_URL}/todos`, {
        withCredentials: true,
      });
      const data = await res.data; // parsed by axios
      setTodos(data);
    } catch (e) {
      console.error("failed to fetch todos", e);
    }
  }, [user]);

  useEffect(() => {
    fetchPriorityList();
  }, [fetchPriorityList]);

  const addTodo = async (newText) => {
    if (!user) {
      alert("Please log in to add");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/todos`,
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
      await axios.delete(`${API_URL}/todos/delete/${id}`, {
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
        `${API_URL}/todos/toggle/${id}`,
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
        `${API_URL}/todos/${id}`,
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
      <Form addTodo={addTodo} isLoggedIn={user} />

      {/* ✅ Apply fieldset for accessibility & grouping */}
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
