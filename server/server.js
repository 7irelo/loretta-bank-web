const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { swaggerUi, specs } = require('./swagger');
const { createDatabase } = require("./config/db.config");
const { logRequest } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./route/authRoutes");
const accountRoutes = require("./route/accountRoutes");
const cardRoutes = require("./route/cardRoutes");
const transactionRoutes = require("./route/transactionRoutes");
const loanRoutes = require("./route/loanRoutes");
const customerSupportRoutes = require('./route/customerSupportRoutes');

// Config
dotenv.config();
const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, please try again later." }
});

// Database Initialization
// createDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/', apiLimiter);
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(logRequest);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/support', customerSupportRoutes);

app.get("/test", async (req, res) => {
  res.send({ message: "Hello, World" });
});

// Error Handling Middleware
app.use(errorHandler);

// Initialize Sequelize and start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
