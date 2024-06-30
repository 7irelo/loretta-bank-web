const { Loan, User } = require('../models/associations');

const createLoan = async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    res.status(201).json({ success: true, loan });
  } catch (error) {
    console.error("Error creating loan:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await Loan.findByPk(id, { include: [User] });
    if (!loan) {
      return res.status(404).json({ success: false, message: "Loan not found" });
    }
    res.status(200).json({ success: true, loan });
  } catch (error) {
    console.error("Error fetching loan:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const updateLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await Loan.findByPk(id);
    if (!loan) {
      return res.status(404).json({ success: false, message: "Loan not found" });
    }
    await loan.update(req.body);
    res.status(200).json({ success: true, loan });
  } catch (error) {
    console.error("Error updating loan:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const deleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await Loan.findByPk(id);
    if (!loan) {
      return res.status(404).json({ success: false, message: "Loan not found" });
    }
    await loan.destroy();
    res.status(200).json({ success: true, message: "Loan deleted successfully" });
  } catch (error) {
    console.error("Error deleting loan:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createLoan,
  getLoan,
  updateLoan,
  deleteLoan,
};
