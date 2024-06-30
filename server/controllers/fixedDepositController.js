const { FixedDeposit } = require('../models/associations');

// Fetch all fixed deposits
const getFixedDeposits = async (req, res) => {
  try {
    const fixedDeposits = await FixedDeposit.findAll();
    res.status(200).json(fixedDeposits);
  } catch (error) {
    console.error("Error fetching fixed deposits:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Fetch a single fixed deposit by ID
const getFixedDeposit = async (req, res) => {
  const { depositID } = req.params;
  try {
    const fixedDeposit = await FixedDeposit.findByPk(depositID);
    if (!fixedDeposit) {
      return res.status(404).json({ success: false, message: "Fixed deposit not found" });
    }
    res.status(200).json(fixedDeposit);
  } catch (error) {
    console.error(`Error fetching fixed deposit with ID ${depositID}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Create a new fixed deposit
const createFixedDeposit = async (req, res) => {
  const { userId, amount, interestRate, maturityDate } = req.body;
  try {
    const fixedDeposit = await FixedDeposit.create({ userId, amount, interestRate, maturityDate });
    res.status(201).json({ success: true, message: "Fixed deposit created successfully", fixedDeposit });
  } catch (error) {
    console.error("Error creating fixed deposit:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Update a fixed deposit
const updateFixedDeposit = async (req, res) => {
  const { depositID } = req.params;
  const { amount, interestRate, maturityDate } = req.body;
  try {
    const fixedDeposit = await FixedDeposit.findByPk(depositID);
    if (!fixedDeposit) {
      return res.status(404).json({ success: false, message: "Fixed deposit not found" });
    }
    fixedDeposit.amount = amount;
    fixedDeposit.interestRate = interestRate;
    fixedDeposit.maturityDate = maturityDate;
    await fixedDeposit.save();
    res.status(200).json({ success: true, message: "Fixed deposit updated successfully", fixedDeposit });
  } catch (error) {
    console.error(`Error updating fixed deposit with ID ${depositID}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete a fixed deposit
const deleteFixedDeposit = async (req, res) => {
  const { depositID } = req.params;
  try {
    const fixedDeposit = await FixedDeposit.findByPk(depositID);
    if (!fixedDeposit) {
      return res.status(404).json({ success: false, message: "Fixed deposit not found" });
    }
    await fixedDeposit.destroy();
    res.status(200).json({ success: true, message: "Fixed deposit deleted successfully" });
  } catch (error) {
    console.error(`Error deleting fixed deposit with ID ${depositID}:`, error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  getFixedDeposits,
  getFixedDeposit,
  createFixedDeposit,
  updateFixedDeposit,
  deleteFixedDeposit,
};
