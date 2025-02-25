require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

require("./config/passportConfig");

const sessionMiddleware = require("./config/sessionConfig");
const passport = require("passport");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const priorityRoutes = require("./routes/priorityRoutes");

const allowedOrigins = [
  process.env.PRODUCTION_FRONTEND_URL || process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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

app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

app.use("/auth", authRoutes);

app.use("/todos", todoRoutes);
app.use("/reminders", reminderRoutes);
app.use("/priorities", priorityRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
