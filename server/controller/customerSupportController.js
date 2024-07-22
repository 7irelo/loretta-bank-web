const { pool } = require('../config/database');

// Create customer support query
const createSupport = async (req, res) => {
  try {
    const query = `
      INSERT INTO customer_support (user_id, query, response, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [req.user.id, req.body.query, req.body.response, req.body.status];

    const { rows } = await pool.query(query, values);
    const support = rows[0];

    res.status(201).json({
      success: true,
      message: "Support query created successfully",
      support,
    });
  } catch (error) {
    console.error("Error creating support query:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get customer support query
const getSupport = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT cs.*, u.id as user_id, u.first_name, u.last_name, u.email, u.date_of_birth, u.address, u.occupation, u.phone, u.username
      FROM customer_support cs
      JOIN users u ON cs.user_id = u.id
      WHERE cs.id = $1 AND cs.user_id = $2;
    `;
    const { rows } = await pool.query(query, [id, req.user.id]);
    const supportRow = rows[0];

    if (!supportRow) {
      return res.status(404).json({ success: false, message: "Support query not found" });
    }

    const support = {
      id: supportRow.id,
      user_id: supportRow.user_id,
      query: supportRow.query,
      response: supportRow.response,
      status: supportRow.status,
      created_at: supportRow.created_at,
      updated_at: supportRow.updated_at,
      user: {
        id: supportRow.user_id,
        first_name: supportRow.first_name,
        last_name: supportRow.last_name,
        email: supportRow.email,
        date_of_birth: supportRow.date_of_birth,
        address: supportRow.address,
        occupation: supportRow.occupation,
        phone: supportRow.phone,
        username: supportRow.username
      }
    };

    res.status(200).json(support);
  } catch (error) {
    console.error(`Error fetching support query with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update customer support query
const updateSupport = async (req, res) => {
  const { id } = req.params;
  const { query, response, status } = req.body;
  try {
    const queryStr = `
      UPDATE customer_support
      SET query = $1, response = $2, status = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 AND user_id = $5
      RETURNING *;
    `;
    const values = [query, response, status, id, req.user.id];
    const { rows } = await pool.query(queryStr, values);
    const supportRow = rows[0];

    if (!supportRow) {
      return res.status(404).json({ success: false, message: "Support query not found" });
    }

    const support = {
      id: supportRow.id,
      user_id: supportRow.user_id,
      query: supportRow.query,
      response: supportRow.response,
      status: supportRow.status,
      created_at: supportRow.created_at,
      updated_at: supportRow.updated_at,
      user: {
        id: supportRow.user_id,
        first_name: supportRow.first_name,
        last_name: supportRow.last_name,
        email: supportRow.email,
        date_of_birth: supportRow.date_of_birth,
        address: supportRow.address,
        occupation: supportRow.occupation,
        phone: supportRow.phone,
        username: supportRow.username
      }
    };

    res.status(200).json({ success: true, message: "Support query updated successfully", support });
  } catch (error) {
    console.error(`Error updating support query with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete customer support query
const deleteSupport = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      DELETE FROM customer_support
      WHERE id = $1 AND user_id = $2
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id, req.user.id]);
    const support = rows[0];

    if (!support) {
      return res.status(404).json({ success: false, message: "Support query not found" });
    }

    res.status(200).json({ success: true, message: "Support query deleted successfully" });
  } catch (error) {
    console.error(`Error deleting support query with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createSupport,
  getSupport,
  updateSupport,
  deleteSupport,
};
