require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

require("./config/passportConfig");
const sessionMiddleware = require("./config/sessionConfig");

const passport = require("passport");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const priorityRoutes = require("./routes/priorityRoutes");

app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.user) {
    req.session.user = req.user;
  }
  next();
});

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, // Local frontend
      process.env.PRODUCTION_FRONTEND_URL, // Deployed frontend
    ],
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/priorities", priorityRoutes);

app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  return res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
