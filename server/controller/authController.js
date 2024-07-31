const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const { logResponse } = require('../middleware/logger');
const UserDTO = require('../dtos/UserDto');
const UserSerializer = require('../serializers/UserSerializer');

const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a DTO from the request body
    const userDto = UserDTO.fromRequestBody({
      ...req.body,
      password: hashedPassword
    });

    const query = `
      INSERT INTO users (id, first_name, last_name, email, date_of_birth, address, occupation, phone, username, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const values = [userDto.id, userDto.firstName, userDto.lastName, userDto.email, userDto.dateOfBirth, userDto.address, userDto.occupation, userDto.phone, userDto.username, userDto.password];

    const { rows } = await pool.query(query, values);
    const user = rows[0];

    const response = {
      success: true,
      message: "User registered successfully",
      user: UserSerializer.serialize(user),
    };

    logResponse(201, "User registered successfully", response); // Log response
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating user:", error);
    logResponse(500, "Server error", error); // Log error response
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


const loginUser = async (req, res) => {
  console.log(req)
  try {
    const query = `SELECT * FROM users WHERE username = $1`;
    const { rows } = await pool.query(query, [req.body.username]);
    const user = rows[0];

    if (!user) {
      const response = { success: false, message: "Incorrect username" };
      
      console.log(response)
      logResponse(404, "User not found", response);
      return res.status(404).json(response);
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      const response = { success: false, message: "Invalid password" };
      logResponse(401, "Invalid password", response);
      return res.status(401).json(response);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 86400, // seconds
    });

    const response = { auth: true, token };
    logResponse(200, "User logged in successfully", response);
    console.log(response)

    res.header("auth-token", token).status(200).json(response);
  } catch (error) {
    console.error("Error logging in user:", error);
    logResponse(500, "Server error", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const query = `SELECT * FROM users WHERE id = $1`;
    const { rows } = await pool.query(query, [req.user.id]);
    const user = rows[0];

    if (!user) {
      const response = { success: false, message: "User not found" };
      logResponse(404, "User not found", response);
      return res.status(404).json(response);
    }

    const response = UserSerializer.serialize(user);
    logResponse(200, "Current user fetched successfully", response);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching current user:", error);
    logResponse(500, "Server error", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const userDto = UserDTO.fromRequestBody(req.body);
    const updates = Object.entries(userDto).map(([key, value]) => `${key} = '${value}'`).join(", ");

    const query = `UPDATE users SET ${updates}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;`;
    const { rows } = await pool.query(query, [userDto.id]);
    const user = rows[0];

    if (!user) {
      const response = { success: false, message: "User not found" };
      logResponse(404, "User not found", response); // Log response
      return res.status(404).json(response);
    }

    const response = {
      success: true,
      message: "User updated successfully",
      user: UserSerializer.serialize(user),
    };

    logResponse(200, "User updated successfully", response); // Log response

    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating user:", error);
    logResponse(500, "Server error", error); // Log error response
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const patchUser = async (req, res) => {
  try {
    const updates = Object.entries(req.body).map(([key, value]) => `${key} = '${value}'`).join(", ");
    const query = `UPDATE users SET ${updates}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;`;

    const { rows } = await pool.query(query, [req.user.id]);
    const user = rows[0];

    if (!user) {
      const response = { success: false, message: "User not found" };
      logResponse(404, "User not found", response); // Log response
      return res.status(404).json(response);
    }

    const response = {
      success: true,
      message: "User updated successfully",
      user: UserSerializer.serialize(user),
    };

    logResponse(200, "User updated successfully", response); // Log response

    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating user:", error);
    logResponse(500, "Server error", error); // Log error response
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  patchUser
};
