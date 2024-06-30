const { Transaction, Account } = require('../models/associations');

const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({ success: true, transaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id, { include: [Account] });
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }
    res.status(200).json({ success: true, transaction });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }
    await transaction.update(req.body);
    res.status(200).json({ success: true, transaction });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }
    await transaction.destroy();
    res.status(200).json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
