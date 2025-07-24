import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import logger from "../utils/logger.js";

export const registerHandler = async (req, res) => {
  console.log("req.body:", req.body);
  const { username, email, password } = req.body;
  const isAdmin = false;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (isAdmin) {
      const result = await pool.query(
        "INSERT INTO users (username, email, password_hash, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, username, email",
        [username, email, hashedPassword, isAdmin]
      );
      logger.log(`User registered: ${username} (${email})`);
      res.status(201).json(result.rows[0]);
    } else {
      const result = await pool.query(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
        [username, email, hashedPassword]
      );
      logger.log(`User registered: ${username} (${email})`);
      res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    logger.error("Register error:", err.message);

    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginHandler = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      logger.warn(`Login failed: No user with email ${email}`);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      logger.warn(`Login failed: Invalid password for email ${email}`);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    logger.log(`User logged in: (${email})`);
    res.json({ token });
  } catch (err) {
    logger.error("Login error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const validateHandler = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true, userId: decoded.id });
  } catch (err) {
    return res.status(403).json({ valid: false });
  }
};
