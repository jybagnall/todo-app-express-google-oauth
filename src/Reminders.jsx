import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export default function Reminders() {
  const [reminder, setReminder] = useState("");
  const { user } = useUser();

  const fetchReminders = useCallback(async () => {
    if (!user) return;

    try {
      const res = await axios.get("/api/reminders", {
        withCredentials: true,
      });

      if (res.data.text) {
        setReminder(res.data.text);
      } else {
        setReminder("");
      }
    } catch (e) {
      console.error("failed to fetch reminders", e);
      setReminder("");
    }
  }, [user]);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  const saveReminder = async () => {
    if (!user) {
      alert("Please log in to add");
      return;
    }

    if (!reminder.trim()) {
      alert("Reminder text cannot be empty");
      return;
    }

    try {
      await axios.post(
        "/api/reminders",
        { text: reminder },
        { withCredentials: true }
      );

      fetchReminders();
    } catch (e) {
      console.error("failed to add reminder", e);
    }
  };

  return (
    <div className="flex flex-col flex-[1] p-4 border border-gray-300 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Reminders</h2>
      <textarea
        className="w-full h-full border border-gray-300 p-2 rounded-md flex-grow"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
      />
      <button
        onClick={saveReminder}
        className="mt-2 w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-500"
      >
        Save
      </button>
    </div>
  );
}
