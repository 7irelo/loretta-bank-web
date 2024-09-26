const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/database");
const { logResponse } = require("../middleware/logger");
const UserDTO = require("../dtos/UserDto");
const UserMapper = require("../mappers/UserMapper");
const redisClient = require("../config/redis.config");

const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Insert new user into the database
    const query = `
      INSERT INTO users (first_name, last_name, email, date_of_birth, address, occupation, phone, username, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.dateOfBirth,
      req.body.address,
      req.body.occupation,
      req.body.phone,
      req.body.username,
      hashedPassword,
    ];

    const { rows: userRows } = await pool.query(query, values);
    const user = userRows[0];

    // Check if user details are cached
    const cacheKey = `user:${user.id}`;
    const cachedUserData = await redisClient.get(cacheKey);

    if (cachedUserData) {
      console.log("Serving from cache");
      return res.status(200).json(JSON.parse(cachedUserData));
    }

    // Query to fetch the first 5 accounts, loans, and cards
    const detailsQuery = `
      SELECT 
        a.*, 
        c.id AS card_id, c.card_number, c.expiry_date, c.cvv, c.credit_limit, c.balance AS card_balance, 
        l.id AS loan_id, l.loan_type, l.amount AS loan_amount, l.interest_rate, l.term, l.start_date, l.end_date
      FROM accounts a
      LEFT JOIN cards c ON c.account_id = a.id
      LEFT JOIN loans l ON l.account_id = a.id
      WHERE a.user_id = $1
      LIMIT 5;
    `;
    const detailValues = [user.id];
    const { rows: detailsRows } = await pool.query(detailsQuery, detailValues);

    // Use UserMapper to structure the response
    const userData = UserMapper.mapUserData(detailsRows);

    // Cache the user data in Redis (1 hour expiration)
    await redisClient.set(cacheKey, JSON.stringify(userData), "EX", 60 * 60);

    const response = {
      success: true,
      message: "User registered successfully",
      user: userData, // Structured user data with accounts, loans, and cards
    };

    logResponse(201, "User registered successfully", response);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating user:", error);
    logResponse(500, "Server error", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const redisKey = `login:${username}`;

    // Check if JWT token and user data are cached in Redis
    const cachedToken = await redisClient.get(redisKey);

    if (cachedToken) {
      // Verify if the cached JWT token is still valid
      try {
        jwt.verify(cachedToken, process.env.JWT_TOKEN_SECRET);

        // Fetch cached user data
        const cachedUser = await redisClient.get(`user:${username}`);
        const user = JSON.parse(cachedUser);

        const response = { auth: true, token: cachedToken, user };
        logResponse(200, "Cached token and user retrieved successfully", response);

        return res.header("auth-token", cachedToken).status(200).json(response);
      } catch (err) {
        // Token has expired, proceed to generate a new one
        await redisClient.del(redisKey); // Remove the expired token from Redis
      }
    }

    // Proceed with DB query if no cached token
    const query = `SELECT * FROM users u 
                   LEFT JOIN accounts a ON u.id = a.user_id
                   LEFT JOIN cards c ON a.id = c.account_id
                   LEFT JOIN loans l ON a.id = l.account_id
                   WHERE u.username = $1`;
    const { rows } = await pool.query(query, [username]);

    if (rows.length === 0) {
      const response = { success: false, message: "Incorrect username" };
      logResponse(404, "User not found", response);
      return res.status(404).json(response);
    }

    const user = UserMapper.mapUserData(rows);

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsValid) {
      const response = { success: false, message: "Invalid password" };
      logResponse(401, "Invalid password", response);
      return res.status(401).json(response);
    }

    // Generate new JWT token
    const expiresIn = 86400; // 1 day in seconds
    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn, // Token expiration
    });

    // Store the new token in Redis
    await redisClient.set(redisKey, token, { EX: expiresIn });

    // Cache the user data in Redis
    await redisClient.set(`user:${username}`, JSON.stringify(user), { EX: expiresIn });

    const response = { auth: true, token, user };
    logResponse(200, "User logged in successfully", response);

    res.header("auth-token", token).status(200).json(response);
  } catch (error) {
    console.error("Error logging in user:", error);
    logResponse(500, "Server error", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const redisKey = `user:${req.user.id}`;

    // Check Redis for cached user data
    const cachedUser = await redisClient.get(redisKey);

    if (cachedUser) {
      const response = JSON.parse(cachedUser); // Deserialize the cached user data
      logResponse(200, "Cached user fetched successfully", response);

      return res.status(200).json(response);
    }

    // Query DB if no cached user data found
    const query = `
      SELECT u.*, a.*, c.*, l.* 
      FROM users u
      LEFT JOIN accounts a ON u.id = a.user_id
      LEFT JOIN cards c ON a.id = c.account_id
      LEFT JOIN loans l ON a.id = l.account_id
      WHERE u.id = $1
    `;
    const { rows } = await pool.query(query, [req.user.id]);

    if (rows.length === 0) {
      const response = { success: false, message: "User not found" };
      logResponse(404, "User not found", response);
      return res.status(404).json(response);
    }

    // Use UserMapper to map the rows into a user object
    const user = UserMapper.mapUserData(rows);

    if (!user) {
      const response = { success: false, message: "User not found" };
      logResponse(404, "User not found", response);
      return res.status(404).json(response);
    }

    // Cache the user data in Redis with a TTL (adjust TTL as needed)
    await redisClient.set(redisKey, JSON.stringify(user), { EX: 86400 });

    const response = user;
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
    const updates = Object.entries(req.body)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");

    const query = `UPDATE users SET ${updates}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;`;
    const { rows } = await pool.query(query, [req.body.id]);

    if (!rows.length) {
      const response = { success: false, message: "User not found" };
      logResponse(404, "User not found", response);
      return res.status(404).json(response);
    }

    // Invalidate cached user in Redis
    const redisKey = `user:${req.body.id}`;
    await redisClient.del(redisKey);

    // Use the UserMapper to map user data
    const user = UserMapper.mapUserData(rows);

    const response = {
      success: true,
      message: "User updated successfully",
      user,
    };

    logResponse(200, "User updated successfully", response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating user:", error);
    logResponse(500, "Server error", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const patchUser = async (req, res) => {
  try {
    const updates = Object.entries(req.body)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");
    const query = `UPDATE users SET ${updates}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;`;

    const { rows } = await pool.query(query, [req.user.id]);

    if (!rows.length) {
      const response = { success: false, message: "User not found" };
      logResponse(404, "User not found", response);
      return res.status(404).json(response);
    }

    // Invalidate cached user in Redis
    const redisKey = `user:${req.user.id}`;
    await redisClient.del(redisKey);

    const user = UserMapper.mapUserData(rows);

    const response = {
      success: true,
      message: "User updated successfully",
      user,
    };

    logResponse(200, "User updated successfully", response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating user:", error);
    logResponse(500, "Server error", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuery = `DELETE FROM users WHERE id = $1 RETURNING *;`;
    const { rows } = await pool.query(deleteQuery, [id]);

    if (!rows.length) {
      const response = { success: false, message: "User not found" };
      logResponse(404, "User not found", response);
      return res.status(404).json(response);
    }

    // Invalidate the cache for the deleted user
    const cacheKey = `user:${id}`;
    await redisClient.del(cacheKey);

    const response = { success: true, message: "User deleted successfully" };
    logResponse(200, "User deleted successfully", response);
    return res.status(200).json(response);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    logResponse(500, "Server error", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  patchUser,
  deleteUser
};
