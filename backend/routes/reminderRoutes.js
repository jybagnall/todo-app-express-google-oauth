const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  const user_id = req.session.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: "User not logged in" });
  }

  try {
    const q = "SELECT * FROM reminder WHERE user_id=?";
    const [results] = await pool.execute(q, [user_id]);

    if (results.length === 0) {
      return res.status(200).json({});
    }

    res.status(200).json(results[0]);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  const { text } = req.body;
  const user_id = req.session.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: "User not logged in" });
  }

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is empty" });
  }

  try {
    const existingReminder_q = "SELECT * FROM reminder WHERE user_id=?";
    const [currentReminder] = await pool.execute(existingReminder_q, [user_id]);

    if (currentReminder.length > 0) {
      const updateReminder_q = "UPDATE reminder SET text=? WHERE user_id=?";
      await pool.execute(updateReminder_q, [text.trim(), user_id]);
      res.status(200).json({ text: text.trim() });
    } else {
      const insert_q = "INSERT INTO reminder (text, user_id) VALUES(?, ?)";
      const [result] = await pool.execute(insert_q, [text, user_id]);

      res.status(201).json({ id: result.insertId, text: text.trim() });
    }
  } catch (e) {
    console.error("Error inserting reminder:", e);
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;
