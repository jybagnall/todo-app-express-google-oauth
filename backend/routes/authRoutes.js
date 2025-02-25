// # Google OAuth routes

const express = require("express");
const passport = require("passport");
const router = express.Router();

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_FRONTEND_URL
    : process.env.FRONTEND_URL;

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
  if (!req.user) {
    return res.json({ user: null });
  }

  res.json({ user: req.user });
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
