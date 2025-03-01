//  📍Passport + Google OAuth setup
// retrieve user data from Google,
// check if the user exists in the DB,
// create a new record in the DB (if not existing yet)
// store the user in the session

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local");
const pool = require("./db");
require("dotenv").config();
const { verifyPassword } = require("../utils/hash-utils");

// ✅ Setup Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id: google_id, displayName: name, emails } = profile;
        const email = emails[0].value;

        // ✅ Check if user exists in DB
        const [existingUser] = await pool.execute(
          "SELECT * FROM users WHERE google_id = ?",
          [google_id]
        );

        // ✅ 'done': from passport, the completion of authentication
        if (existingUser.length > 0) {
          return done(null, existingUser[0]); // (no error, user obj.)
        }

        // ✅ Create new user into DB
        const [result] = await pool.execute(
          "INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)",
          [google_id, name, email]
        );

        // ✅ Retrieve newly created user
        const [newUser] = await pool.execute(
          "SELECT * FROM users WHERE id = ?",
          [result.insertId]
        );
        return done(null, newUser[0]);
      } catch (error) {
        return done(error, null);
      } // (error occured, no user is returned)
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const [result] = await pool.execute("SELECT * FROM users WHERE email=?", [
        username,
      ]);

      if (result.length === 0) {
        return done(null, false, { message: "Incorrect email or password" });
      }

      const user = result[0];

      if (!verifyPassword(password, user.salt, user.hashed_password)) {
        return done(null, false, { message: "Incorrect email or password" });
      }

      return done(null, user);
    } catch (e) {
      return done(e, null);
    }
  })
);

// ✅ store user ID in session, {"passport": { "user": user.id }}
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// browser sent session id, express-session retrieves session obj with it
// Passport gets user id from session obj, then ✅ retrieve user with id.
passport.deserializeUser(async (id, done) => {
  try {
    const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);

    if (user.length > 0) {
      done(null, user[0]); // Passport sent user obj to req.user.
      return;
    } else {
      done(null, false); // false: authentication failure. user not found.
    }
  } catch (error) {
    console.error("❌ Error in deserializeUser:", error);
    done(error, null);
  }
});

module.exports = passport;
