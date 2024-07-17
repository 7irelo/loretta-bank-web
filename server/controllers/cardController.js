const { Card, User } = require('../models/associations');

const createCard = async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(201).json({ success: true, card });
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByPk(id, { include: [User] });
    if (!card) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }
    res.status(200).json({ success: true, card });
  } catch (error) {
    console.error("Error fetching card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const updateCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByPk(id);
    if (!card) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }
    await card.update(req.body);
    res.status(200).json({ success: true, card });
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByPk(id);
    if (!card) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }
    await card.destroy();
    res.status(200).json({ success: true, message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createCard,
  getCard,
  updateCard,
  deleteCard,
};
