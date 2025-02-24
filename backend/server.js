require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

require("./config/passportConfig");

const sessionMiddleware = require("./config/sessionConfig");
const passport = require("passport");

const authRoutes = require("./routes/authRoutes");

const todoRoutes = require("./routes/todoRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const priorityRoutes = require("./routes/priorityRoutes");

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // ✅ Allow credentials (cookies, sessions)
  })
); // Allow frontend to talk to backend

app.use(express.json()); // Parse JSON body
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use((req, res, next) => {
  if (req.user) {
    req.session.user = req.user; // ✅ Ensure the user is stored
  }
  next();
});

// ✅ Use Routes
app.use("/auth", authRoutes);

app.use("/todos", todoRoutes);
app.use("/reminders", reminderRoutes);
app.use("/priorities", priorityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port $${PORT}`));
