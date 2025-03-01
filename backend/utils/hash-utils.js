const crypto = require("crypto");

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return { salt, hashedPassword };
};

const verifyPassword = (password, salt, storedHash) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return hash === storedHash;
};

module.exports = { hashPassword, verifyPassword };
