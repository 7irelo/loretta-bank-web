const { pool } = require('../config/database');

// Create loan
const createLoanHandler = async (req, res) => {
  const { accountId, loanType, amount, interestRate, term, startDate, endDate } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO loans (user_id, account_id, loan_type, amount, interest_rate, term, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [req.user.id, accountId, loanType, amount, interestRate, term, startDate, endDate]
    );
    const loan = result.rows[0];
    res.status(201).json({ success: true, loan });
  } catch (error) {
    console.error("Error creating loan:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get loan
const getLoanHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM loans WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    const loan = result.rows[0];
    if (!loan) {
      return res.status(404).json({ success: false, message: "Loan not found" });
    }
    res.status(200).json({ success: true, loan });
  } catch (error) {
    console.error("Error fetching loan:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update loan
const updateLoanHandler = async (req, res) => {
  const { id } = req.params;
  const { loanType, amount, interestRate, term, startDate, endDate } = req.body;
  try {
    const result = await pool.query(
      'UPDATE loans SET loan_type = $1, amount = $2, interest_rate = $3, term = $4, start_date = $5, end_date = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 AND user_id = $8 RETURNING *',
      [loanType, amount, interestRate, term, startDate, endDate, id, req.user.id]
    );
    const loan = result.rows[0];
    if (!loan) {
      return res.status(404).json({ success: false, message: "Loan not found" });
    }
    res.status(200).json({ success: true, loan });
  } catch (error) {
    console.error("Error updating loan:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete loan
const deleteLoanHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM loans WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.id]);
    const loan = result.rows[0];
    if (!loan) {
      return res.status(404).json({ success: false, message: "Loan not found" });
    }
    res.status(200).json({ success: true, message: "Loan deleted successfully" });
  } catch (error) {
    console.error("Error deleting loan:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createLoanHandler,
  getLoanHandler,
  updateLoanHandler,
  deleteLoanHandler,
};
