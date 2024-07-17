const { pool } = require('../config/database');

// Create card
const createCardHandler = async (req, res) => {
  const { userId, accountId, cardNumber, expiryDate, cvv, creditLimit, balance } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cards (user_id, account_id, card_number, expiry_date, cvv, credit_limit, balance) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [userId, accountId, cardNumber, expiryDate, cvv, creditLimit, balance]
    );
    const card = result.rows[0];
    res.status(201).json({ success: true, card });
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get card
const getCardHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM cards WHERE id = $1', [id]);
    const card = result.rows[0];
    if (!card) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }
    res.status(200).json({ success: true, card });
  } catch (error) {
    console.error("Error fetching card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update card
const updateCardHandler = async (req, res) => {
  const { id } = req.params;
  const { cardNumber, expiryDate, cvv, creditLimit, balance } = req.body;
  try {
    const result = await pool.query(
      'UPDATE cards SET card_number = $1, expiry_date = $2, cvv = $3, credit_limit = $4, balance = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [cardNumber, expiryDate, cvv, creditLimit, balance, id]
    );
    const card = result.rows[0];
    if (!card) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }
    res.status(200).json({ success: true, card });
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete card
const deleteCardHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM cards WHERE id = $1', [id]);
    res.status(200).json({ success: true, message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createCardHandler,
  getCardHandler,
  updateCardHandler,
  deleteCardHandler,
};
