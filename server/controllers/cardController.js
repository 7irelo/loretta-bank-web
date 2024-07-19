const { pool } = require('../config/database');

const createCardHandler = async (req, res) => {
  const { accountId, cardNumber, expiryDate, cvv, cardType } = req.body;

  try {
    const query = `
      INSERT INTO cards (account_id, card_number, expiry_date, cvv, card_type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [accountId, cardNumber, expiryDate, cvv, cardType];
    const { rows } = await pool.query(query, values);
    const card = rows[0];

    res.status(201).json({ success: true, card });
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getCardHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT * FROM cards
      WHERE id = $1 AND account_id IN (SELECT id FROM accounts WHERE user_id = $2)
    `;
    const { rows } = await pool.query(query, [id, req.user.id]);
    const card = rows[0];

    if (!card) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }

    res.status(200).json({ success: true, card });
  } catch (error) {
    console.error(`Error fetching card with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const updateCardHandler = async (req, res) => {
  const { id } = req.params;
  const { cardNumber, expiryDate, cvv, cardType } = req.body;

  try {
    const query = `
      UPDATE cards
      SET card_number = $1, expiry_date = $2, cvv = $3, card_type = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5 AND account_id IN (SELECT id FROM accounts WHERE user_id = $6)
      RETURNING *;
    `;
    const values = [cardNumber, expiryDate, cvv, cardType, id, req.user.id];
    const { rows } = await pool.query(query, values);
    const card = rows[0];

    if (!card) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }

    res.status(200).json({ success: true, message: "Card updated successfully", card });
  } catch (error) {
    console.error(`Error updating card with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const deleteCardHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM cards
      WHERE id = $1 AND account_id IN (SELECT id FROM accounts WHERE user_id = $2)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id, req.user.id]);
    const card = rows[0];

    if (!card) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }

    res.status(200).json({ success: true, message: "Card deleted successfully" });
  } catch (error) {
    console.error(`Error deleting card with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createCardHandler,
  getCardHandler,
  updateCardHandler,
  deleteCardHandler,
};
