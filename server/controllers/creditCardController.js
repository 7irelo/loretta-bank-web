const { CreditCard, User } = require('../models/associations');

const createCreditCard = async (req, res) => {
  try {
    const creditCard = await CreditCard.create(req.body);
    res.status(201).json({ success: true, creditCard });
  } catch (error) {
    console.error("Error creating credit card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getCreditCard = async (req, res) => {
  const { id } = req.params;
  try {
    const creditCard = await CreditCard.findByPk(id, { include: [User] });
    if (!creditCard) {
      return res.status(404).json({ success: false, message: "Credit card not found" });
    }
    res.status(200).json({ success: true, creditCard });
  } catch (error) {
    console.error("Error fetching credit card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const updateCreditCard = async (req, res) => {
  const { id } = req.params;
  try {
    const creditCard = await CreditCard.findByPk(id);
    if (!creditCard) {
      return res.status(404).json({ success: false, message: "Credit card not found" });
    }
    await creditCard.update(req.body);
    res.status(200).json({ success: true, creditCard });
  } catch (error) {
    console.error("Error updating credit card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const deleteCreditCard = async (req, res) => {
  const { id } = req.params;
  try {
    const creditCard = await CreditCard.findByPk(id);
    if (!creditCard) {
      return res.status(404).json({ success: false, message: "Credit card not found" });
    }
    await creditCard.destroy();
    res.status(200).json({ success: true, message: "Credit card deleted successfully" });
  } catch (error) {
    console.error("Error deleting credit card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createCreditCard,
  getCreditCard,
  updateCreditCard,
  deleteCreditCard,
};
