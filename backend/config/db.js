// backend/db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: true },
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Successfully connected to MySQL database!");

    // Fetch tables to verify connection
    const [rows] = await connection.query("SHOW TABLES;");
    console.log("📌 Tables in database:", rows);

    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

module.exports = pool;
