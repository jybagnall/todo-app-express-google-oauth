// # Google OAuth routes

const express = require("express");
const passport = require("passport");
const router = express.Router();

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_FRONTEND_URL
    : process.env.FRONTEND_URL;

// ✅ Google Login & Register Route, access profie & email.
// what I can get from profile = id, name, displayName, emails
// users visit '/google', triggering Google OAuth via Passport.
// consent screen requests to access ["profile", "email"].
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

// // ✅ Manual register Route
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   const checkExistingUser_q = "SELECT * FROM users WHERE email=?";
//   const insertNewUser_q =
//     "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
//   const newUserInfo_q = "SELECT id, name, email FROM users WHERE id=?";

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const [existingUser] = await pool.execute(checkExistingUser_q, [email]);

//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = hashPassword(password);

//     const [result] = await pool.execute(insertNewUser_q, [
//       name,
//       email,
//       hashedPassword,
//     ]);

//     const [newUser] = await pool.execute(newUserInfo_q, [result.insertId]);

//     req.session.user = newUser[0];
//     console.log("newUser: ", newUser[0]);

//     req.session.save((err) => {
//       if (err) {
//         console.error("Session save error:", err);
//         return res.status(500).json({ message: "Session save error" });
//       }

//       console.log("User saved in session:", req.session.user);
//       res.status(201).json({ user: req.session.user });
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: "Server error" });
//   }
// });
