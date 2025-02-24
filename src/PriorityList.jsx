import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PriorityItem from "./PriorityItem";
import PriorityForm from "./PriorityForm";
import { useUser } from "./UserContext";

export default function PriorityList() {
  const [priorities, setPriorities] = useState([]);
  const { user } = useUser();

  const fetchPriorities = useCallback(async () => {
    if (!user) return;

    try {
      const res = await axios.get("http://localhost:5000/priorities", {
        withCredentials: true,
      });

      setPriorities(res.data);
    } catch (e) {
      console.error("failed to fetch priorities in front", e);
    }
  }, [user]);

  useEffect(() => {
    fetchPriorities();
  }, [fetchPriorities]);

  const addNewPriority = async (text) => {
    if (!user) {
      alert("Please log in to add");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/priorities",
        { text: text.trim() },
        { withCredentials: true }
      );

      fetchPriorities(); // ✅ Fetch updated list
      // const data = await res.data;
      // setPriorities((priorities) => [...priorities, data]);
    } catch (e) {
      console.error("failed to fetch priorities in front", e);
    }
  };

  const removePriority = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/priorities/delete/${id}`, {
        withCredentials: true,
      });

      setPriorities((priorities) => priorities.filter((p) => p.id !== id));
    } catch (e) {
      console.error("failed to delete priority", e);
    }
  };

  const togglePriority = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/priorities/toggle/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (!res.data || res.status !== 200) {
        throw new Error("Invalid response from server");
      }

      setPriorities((priorities) =>
        priorities.map((p) =>
          p.id === id ? { ...p, completed: res.data.completed } : p
        )
      );
    } catch (e) {
      console.error("failed to toggle priority", e);
    }
  };

  const editPriority = async (id, text) => {
    if (!text.trim()) {
      alert("Priority text cannot be empty.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/priorities/${id}`,
        { text: text.trim() },
        {
          withCredentials: true,
        }
      );

      setPriorities((priorities) =>
        priorities.map((p) => (p.id === id ? { ...p, text: res.data.text } : p))
      );
    } catch (e) {
      console.error("failed to edit priority", e);
    }
  };

  return (
    <div className="flex flex-col flex-[2] p-4 border border-gray-300 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Priorities</h2>

      <PriorityForm addNewPriority={addNewPriority} isLoggedIn={user} />

      <fieldset className="space-y-2 mt-2">
        {priorities.map((p) => (
          <PriorityItem
            key={p.id}
            {...p}
            removePriority={removePriority}
            togglePriority={togglePriority}
            editPriority={editPriority}
          />
        ))}
      </fieldset>
    </div>
  );
}
