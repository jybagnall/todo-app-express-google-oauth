// # Google OAuth routes

const crypto = require("crypto");
const express = require("express");
const passport = require("passport");
const router = express.Router();
const pool = require("../config/db");

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_FRONTEND_URL
    : process.env.FRONTEND_URL;

router.post("/register", async (req, res) => {
  const salt = crypto.randomBytes(128).toString("base64");
  crypto.pbkdf2(req.body.password, salt, 310000, 32, "sha256", async (err, hashedPassword) => {
    if (err) {
      return res.status(500);
    }

    // TODO: Check if user with this email already exists; if so, we should send back an error, not insert a record into the DB

    const q = "INSERT INTO users (name, email, salt, hashed_password) VALUES (?, ?, ?, ?)";
    const [result] = await pool.execute(q, [req.body.name, req.body.email, salt, hashedPassword.toString("base64")]);

    const newUser = {
      id: result.insertId,
      name: req.body.name,
      email: req.body.email
    };

    // set the user on the session, which is what establishes the session cookie
    req.session.user = newUser;

    res.status(201).json(newUser);
  });
});

router.post("/login", passport.authenticate("local", { failWithError: true, failureMessage: true }), (req, res) => {
  // if there is an authentication error, it's stored in req.session.messages
  if (req.session.messages) {
    res.sendStatus(401);
  } else {
    res.sendStatus(201);
  }
});

// ✅ Google Login & Register Route,
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Google OAuth Callback
// after user logs in, redirect back to the backend.
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${FRONTEND_URL}`,
    failureRedirect: `${FRONTEND_URL}`,
  })
);

// ✅ fetch logged-in user data
router.get("/user", (req, res) => {
  if (!req.session.user) {
    return res.json({ user: null });
  }

  res.json({ user: req.session.user });
});

// ✅ Logout Route
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }

      res.clearCookie("connect.sid");
      res.json({ message: "Successfully logged out!" });
    });
  });
});

module.exports = router;
