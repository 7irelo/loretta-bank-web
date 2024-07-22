const { pool } = require('../config/database');

// Create loan
const createLoan = async (req, res) => {
  try {
    const query = `
      INSERT INTO loans (user_id, loan_type, amount, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [req.user.id, req.body.loan_type, req.body.amount, req.body.status];

    const { rows } = await pool.query(query, values);
    const loan = rows[0];

    res.status(201).json({
      success: true,
      message: "Loan created successfully",
      loan,
    });
  } catch (error) {
    console.error("Error creating loan:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get loan
const getLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT l.*, u.id as user_id, u.first_name, u.last_name, u.email, u.date_of_birth, u.address, u.occupation, u.phone, u.username
      FROM loans l
      JOIN users u ON l.user_id = u.id
      WHERE l.id = $1 AND l.user_id = $2;
    `;
    const { rows } = await pool.query(query, [id, req.user.id]);
    const loanRow = rows[0];

    if (!loanRow) {
      return res.status(404).json({ success: false, message: "Loan not found" });
    }

    const loan = {
      id: loanRow.id,
      user_id: loanRow.user_id,
      loan_type: loanRow.loan_type,
      amount: loanRow.amount,
      status: loanRow.status,
      created_at: loanRow.created_at,
      updated_at: loanRow.updated_at,
      user: {
        id: loanRow.user_id,
        first_name: loanRow.first_name,
        last_name: loanRow.last_name,
        email: loanRow.email,
        date_of_birth: loanRow.date_of_birth,
        address: loanRow.address,
        occupation: loanRow.occupation,
        phone: loanRow.phone,
        username: loanRow.username
      }
    };

    res.status(200).json(loan);
  } catch (error) {
    console.error(`Error fetching loan with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update loan
const updateLoan = async (req, res) => {
  const { id } = req.params;
  const { loan_type, amount, status } = req.body;
  try {
    const query = `
      UPDATE loans
      SET loan_type = $1, amount = $2, status = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 AND user_id = $5
      RETURNING *;
    `;
    const values = [loan_type, amount, status, id, req.user.id];
    const { rows } = await pool.query(query, values);
    const loanRow = rows[0];

    if (!loanRow) {
      return res.status(404).json({ success: false, message: "Loan not found" });
    }

    const loan = {
      id: loanRow.id,
      user_id: loanRow.user_id,
      loan_type: loanRow.loan_type,
      amount: loanRow.amount,
      status: loanRow.status,
      created_at: loanRow.created_at,
      updated_at: loanRow.updated_at,
      user: {
        id: loanRow.user_id,
        first_name: loanRow.first_name,
        last_name: loanRow.last_name,
        email: loanRow.email,
        date_of_birth: loanRow.date_of_birth,
        address: loanRow.address,
        occupation: loanRow.occupation,
        phone: loanRow.phone,
        username: loanRow.username
      }
    };

    res.status(200).json({ success: true, message: "Loan updated successfully", loan });
  } catch (error) {
    console.error(`Error updating loan with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete loan
const deleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      DELETE FROM loans
      WHERE id = $1 AND user_id = $2
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id, req.user.id]);
    const loan = rows[0];

    if (!loan) {
      return res.status(404).json({ success: false, message: "Loan not found" });
    }

    res.status(200).json({ success: true, message: "Loan deleted successfully" });
  } catch (error) {
    console.error(`Error deleting loan with ID ${id}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createLoan,
  getLoan,
  updateLoan,
  deleteLoan,
};
