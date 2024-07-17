const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("./middlewares/logger");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const cardRoutes = require("./routes/cardRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const loanRoutes = require("./routes/loanRoutes");
const pool = require("./config/database")

// Config
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger);

// Routes
app.use('/auth', authRoutes);
app.use('/accounts', accountRoutes);
app.use('/cards', cardRoutes);
app.use('/transactions', transactionRoutes);
app.use('/loans', loanRoutes);

app.get("/test", async (req, res) => {
  res.send({message: "hello"})
});

// Initialize Sequelize and start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
