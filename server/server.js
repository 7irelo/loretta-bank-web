const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("./middlewares/logger");
const baseRoutes = require("./routes/base");
const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/accounts");
const sequelize = require("./config/database");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger);

// Routes
app.use("/", baseRoutes);
app.use("/accounts", accountRoutes);
app.use("/auth", authRoutes);

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 - Not Found" });
});

const PORT = process.env.PORT || 3000;

// Initialize Sequelize and start server
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
