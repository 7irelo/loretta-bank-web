const { pool } = require('../config/database');

// Create card
const createCard = async (req, res) => {
  try {
    const query = `
      INSERT INTO cards (user_id, card_type, card_number, expiry_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [req.user.id, req.body.card_type, req.body.card_number, req.body.expiry_date];

    const { rows } = await pool.query(query, values);
    const card = rows[0];

    res.status(201).json({
      success: true,
      message: "Card created successfully",
      card,
    });
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get card
const getCard = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT c.*, u.id as user_id, u.first_name, u.last_name, u.email, u.date_of_birth, u.address, u.occupation, u.phone, u.username
      FROM cards c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = $1 AND c.user_id = $2;
    `;
    const { rows } = await pool.query(query, [id, req.user.id]);
    const cardRow = rows[0];

    if (!cardRow) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }

    const card = {
      id: cardRow.id,
      user_id: cardRow.user_id,
      card_type: cardRow.card_type,
      card_number: cardRow.card_number,
      expiry_date: cardRow.expiry_date,
      created_at: cardRow.created_at,
      updated_at: cardRow.updated_at,
      user: {
        id: cardRow.user_id,
        first_name: cardRow.first_name,
        last_name: cardRow.last_name,
        email: cardRow.email,
        date_of_birth: cardRow.date_of_birth,
        address: cardRow.address,
        occupation: cardRow.occupation,
        phone: cardRow.phone,
        username: cardRow.username
      }
    };

    res.status(200).json(card);
  } catch (error) {
    console.error(`Error fetching card with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update card
const updateCard = async (req, res) => {
  const { id } = req.params;
  const { card_type, card_number, expiry_date } = req.body;
  try {
    const query = `
      UPDATE cards
      SET card_type = $1, card_number = $2, expiry_date = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 AND user_id = $5
      RETURNING *;
    `;
    const values = [card_type, card_number, expiry_date, id, req.user.id];
    const { rows } = await pool.query(query, values);
    const cardRow = rows[0];

    if (!cardRow) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }

    const card = {
      id: cardRow.id,
      user_id: cardRow.user_id,
      card_type: cardRow.card_type,
      card_number: cardRow.card_number,
      expiry_date: cardRow.expiry_date,
      created_at: cardRow.created_at,
      updated_at: cardRow.updated_at,
      user: {
        id: cardRow.user_id,
        first_name: cardRow.first_name,
        last_name: cardRow.last_name,
        email: cardRow.email,
        date_of_birth: cardRow.date_of_birth,
        address: cardRow.address,
        occupation: cardRow.occupation,
        phone: cardRow.phone,
        username: cardRow.username
      }
    };

    res.status(200).json({ success: true, message: "Card updated successfully", card });
  } catch (error) {
    console.error(`Error updating card with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete card
const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      DELETE FROM cards
      WHERE id = $1 AND user_id = $2
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
  createCard,
  getCard,
  updateCard,
  deleteCard,
};
