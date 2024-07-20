const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

// Register user
const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const query = `
      INSERT INTO users (id, first_name, last_name, email, date_of_birth, address, occupation, phone, username, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const values = [req.body.id, req.body.firstName, req.body.lastName, req.body.email, req.body.dateOfBirth, req.body.address, req.body.occupation, req.body.phone, req.body.username, hashedPassword];

    const { rows } = await pool.query(query, values);
    const user = rows[0];

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const query = `SELECT * FROM users WHERE username = $1`;
    const { rows } = await pool.query(query, [req.body.username]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.header("auth-token", token).status(200).json({ auth: true, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const query = `SELECT * FROM users WHERE id = $1`;
    const { rows } = await pool.query(query, [req.user.id]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
};
