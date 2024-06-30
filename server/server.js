const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("./middlewares/logger");
const authRoutes = require("./routes/authRoutes");
const rootRoutes = require("./routes/rootRoutes");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accounts");
const creditCardRoutes = require("./routes/creditCardRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const loansRoutes = require("./routes/loansRoutes");

const sequelize = require("./config/database");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger);

// Routes
appl.use('/auth', authRoutes);
app.use('/', rootRoutes);
app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
app.use('/credit-cards', creditCardRoutes);
app.use('/transactions', transactionRoutes);
app.use('/loans', loanRoutes);

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
