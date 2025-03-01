const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("", async (req, res) => {
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ error: "User not logged in" });
  }

  try {
    const q = "SELECT * FROM todo WHERE user_id=?";
    const [results] = await pool.execute(q, [user_id]);
    res.status(200).json(results);
  } catch (e) {
    console.error("failed to fetch todo data", e);
    return res.status(500).json({ error: e.message });
  }
});

router.post("", async (req, res) => {
  const { text } = req.body;
  const user_id = req.user?.id; 

  if (!user_id) {
    return res.status(401).json({ error: "User not logged in" });
  }

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is empty" });
  }

  try {
    const q = "INSERT INTO todo (text, completed, user_id) VALUES (?, ?, ?)";
    const [result] = await pool.execute(q, [text.trim(), 0, user_id]);

    const newTodo = {
      id: result.insertId,
      text: text,
      completed: 0,
      user_id: user_id,
    };

    console.log("Session Data:", req.session);

    res.status(201).json(newTodo);
  } catch (e) {
    console.error("Error inserting todo:", e);
    return res.status(500).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "text is empty" });
  }

  try {
    const todo_status_q = "SELECT * FROM todo WHERE id=? AND user_id=?";
    const [existingTodo] = await pool.execute(todo_status_q, [id, user_id]);

    if (existingTodo.length === 0) {
      return res
        .status(404)
        .json({ error: "Todo is not found or unauthorized" });
    }

    const q = "UPDATE todo SET text=? WHERE id=?";
    await pool.execute(q, [text.trim(), id]);
    res.status(200).json({ id, text: text.trim() });
  } catch (e) {
    console.error("Error updating todo:", e);
    return res.status(500).json({ error: e.message });
  }
});

router.put("/toggle/:id", async (req, res) => {
  const { id } = req.params;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const completedStatus =
      "SELECT completed FROM todo WHERE id=? AND user_id=?";
    const [todo] = await pool.execute(completedStatus, [id, user_id]);
   

    if (!todo.length) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const currentCompleted = todo[0].completed; // 0 or 1
    const newCompleted = currentCompleted === 1 ? 0 : 1;

    if (currentCompleted === newCompleted) {
      return res.status(400).json({ error: "No changes detected" });
    }

    const q = "UPDATE todo SET completed=? WHERE id=?";
    await pool.execute(q, [newCompleted, id]);
    res.status(200).json({ id, completed: newCompleted });
  } catch (e) {
    console.error("Error toggling todo:", e);
    return res.status(500).json({ error: e.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const todo_exists_q = "SELECT id FROM todo WHERE id=? AND user_id=?";
    const [existingTodo] = await pool.execute(todo_exists_q, [id, user_id]);

    if (!existingTodo.length === 0) {
      return res.status(404).json({ error: "Todo not found or unauthorized" });
    }

    const q = "DELETE FROM todo WHERE id=? AND user_id=?";
    await pool.execute(q, [id, user_id]);
    res.status(200).json({ message: "deleted todo successfully", id });
  } catch (e) {
    console.error("Error deleting todo:", e);
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;
