const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("", async (req, res) => {
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ error: "User not logged in" });
  }

  try {
    const q = "SELECT * FROM priority WHERE user_id=?";
    const [results] = await pool.execute(q, [user_id]);
    res.json(results);
  } catch (e) {
    console.error("failed to fetch priorities", e);
    res.status(500).json({ error: e.message });
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
    const q =
      "INSERT INTO priority (text, completed, user_id) VALUES (?, ?, ?)";
    const [result] = await pool.execute(q, [text, 0, user_id]);

    const newP = {
      id: result.insertId,
      text: text,
      completed: 0,
      user_id: user_id,
    };

    res.status(201).json(newP);
  } catch (e) {
    console.error("Error inserting priority:", e);
    return res.status(500).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const user_id = req.user?.id;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "text is empty" });
  }

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "text is empty" });
  }

  try {
    const priority_status_q = "SELECT * FROM priority WHERE id=? AND user_id=?";
    const [existingP] = await pool.execute(priority_status_q, [id, user_id]);

    if (existingP.length === 0) {
      return res
        .status(404)
        .json({ error: "Priority is not found or unauthorized" });
    }

    const q = "UPDATE priority SET text=? WHERE id=?";
    await pool.execute(q, [text.trim(), id]);
    res.status(200).json({ id, text: text.trim() }); //
  } catch (e) {
    console.error("Error updating priority:", e);
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
      "SELECT completed FROM priority WHERE id=? AND user_id=?";
    const [status] = await pool.execute(completedStatus, [id, user_id]);

    if (!status.length) {
      return res.status(404).json({ error: "priority not found" });
    }

    const currentCompleted = status[0].completed;
    const newCompleted = currentCompleted === 1 ? 0 : 1;

    const q = "UPDATE priority SET completed=? WHERE id=? ";
    await pool.execute(q, [newCompleted, id]);
    res.status(200).json({ id, completed: newCompleted });
  } catch (e) {
    console.error("Error toggling priority:", e);
    res.status(500).json({ error: e.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const priority_status_q = "SELECT * FROM priority WHERE id=? AND user_id=?";
    const [existingP] = await pool.execute(priority_status_q, [id, user_id]);

    if (existingP.length === 0) {
      return res
        .status(404)
        .json({ error: "Priority is not found or unauthorized" });
    }

    const q = "DELETE FROM priority WHERE id=? AND user_id=?";
    await pool.execute(q, [id, user_id]);
    res.status(200).json({ message: "successfully deleted priority", id });
  } catch (e) {
    console.error("Error deleting priority:", e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
