const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");

async function initDB() {
  const connection = await mysql.createConnection(dbConfig);
  console.log("✅ Connected to MySQL database");
  return connection;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if different
  password: "teju2004", // Change if you set a password
  database: "campus_connect",
});

db.connect((err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to MySQL database");
});

app.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;

  // Username validation: 8+ characters, only letters, numbers, and underscores
  const usernameRegex = /^[a-zA-Z0-9_]{8,}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message:
        "Username must be at least 8 characters long and can only contain letters, numbers, and underscores.",
    });
  }

  // Password validation: 8+ characters, 1 number, 1 uppercase, 1 lowercase, 1 special character
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, contain at least one number, one uppercase letter, one lowercase letter, and one special character.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "User already exists" });
          }
          return res.status(500).json({ message: "Database error" });
        }
        res.json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ message: "Username, password, and role required" });
  }

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = results[0];

      if (user.role !== role) {
        return res.status(400).json({ message: "Role Mismatch" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      res.json({ message: "Login successful" });
    }
  );
});

app.post("/events", async (req, res) => {
  const { name, description, date, time, venue, created_by } = req.body;

  if (!name || !date || !time || !venue || !created_by) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const eventDateTime = new Date(`${date}T${time}`);
  const now = new Date();

  if (eventDateTime <= now) {
    return res
      .status(400)
      .json({ message: "Event must be scheduled for a future date and time." });
  }

  try {
    await db.execute(
      `INSERT INTO events (name, description, event_date, venue, created_by)
       VALUES (?, ?, ?, ?, ?)`,
      [name, description, eventDateTime, venue, created_by]
    );

    res.status(200).json({ message: "Event created successfully!" });
  } catch (error) {
    console.error("Error inserting event:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/events/upcoming/:username", (req, res) => {
  const { username } = req.params;

  const sql = `
    SELECT * FROM events 
    WHERE created_by = ? AND event_date > NOW() 
    ORDER BY event_date ASC
  `;

  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

app.delete("/events/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute(`DELETE FROM events WHERE id = ?`, [id]);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/events/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, date, time, venue } = req.body;

  const eventDateTime = `${date} ${time}:00`;

  try {
    await db.execute(
      `UPDATE events SET name = ?, description = ?, event_date = ?, venue = ? WHERE id = ?`,
      [name, description, eventDateTime, venue, id]
    );
    res.json({ message: "Event updated successfully" });
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start Server
const PORT = 5020;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
