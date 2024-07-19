const { pool } = require('../config/database');

// Create customer support
const createSupport = async (req, res) => {
  const { query, response, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO customer_support (user_id, query, response, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, query, response, status]
    );
    const support = result.rows[0];
    res.status(201).json({ success: true, support });
  } catch (error) {
    console.error("Error creating customer support:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get customer support
const getSupport = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM customer_support WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    const support = result.rows[0];
    if (!support) {
      return res.status(404).json({ success: false, message: "Support not found" });
    }
    res.status(200).json({ success: true, support });
  } catch (error) {
    console.error("Error fetching support:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update customer support
const updateSupport = async (req, res) => {
  const { id } = req.params;
  const { query, response, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE customer_support SET query = $1, response = $2, status = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 AND user_id = $5 RETURNING *',
      [query, response, status, id, req.user.id]
    );
    const support = result.rows[0];
    if (!support) {
      return res.status(404).json({ success: false, message: "Support not found" });
    }
    res.status(200).json({ success: true, support });
  } catch (error) {
    console.error("Error updating support:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete customer support
const deleteSupport = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM customer_support WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.id]);
    const support = result.rows[0];
    if (!support) {
      return res.status(404).json({ success: false, message: "Support not found" });
    }
    res.status(200).json({ success: true, message: "Support deleted successfully" });
  } catch (error) {
    console.error("Error deleting support:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createSupport,
  getSupport,
  updateSupport,
  deleteSupport,
};
