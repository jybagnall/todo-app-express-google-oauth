// # Express-session & MySQL session setup

const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
require("dotenv").config();

// MySQL Session Store. connect to database.
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  clearExpired: true, // clear expired sessions
  checkExpirationInterval: 900000, // Check expired sessions every 15 min.
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "play him off, keyboard cat!",
  resave: false,
  saveUninitialized: false,
  store: sessionStore, // store session in MySQL
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
});

module.exports = sessionMiddleware;
