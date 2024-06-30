const { User } = require('../models/associations');

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getUser = async (req, res) => {
  const { idNumber } = req.params;
  try {
    const user = await User.findByPk(idNumber);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const updateUser = async (req, res) => {
  const { idNumber } = req.params;
  try {
    const user = await User.findByPk(idNumber);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    await user.update(req.body);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const deleteUser = async (req, res) => {
  const { idNumber } = req.params;
  try {
    const user = await User.findByPk(idNumber);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
