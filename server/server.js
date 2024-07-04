const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("./middlewares/logger");
const sequelize = require('./config/database');
const authRoutes = require("./routes/authRoutes");
const rootRoutes = require("./routes/rootRoutes");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const creditCardRoutes = require("./routes/creditCardRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const loansRoutes = require("./routes/loansRoutes");
const savingsAccountRoutes = require("./routes/savingsAccountRoutes");
const fixedDepositRoutes = require("./routes/fixedDepositRoutes");
const supportTicketRoutes = require("./routes/supportTicketRoutes");
const paypalRoutes = require('./routes/paypalRoutes');
const payfastRoutes = require('./routes/payfastRoutes');

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
app.use('/', rootRoutes);
app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
app.use('/credit-cards', creditCardRoutes);
app.use('/transactions', transactionRoutes);
app.use('/loans', loansRoutes);
app.use('/savings-accounts', savingsAccountRoutes);
app.use('/fixed-deposits', fixedDepositRoutes);
app.use('/support-tickets', supportTicketRoutes);
app.use('/api/paypal', paypalRoutes);
app.use('/api/payfast', payfastRoutes);

// Initialize Sequelize and start server
const PORT = process.env.PORT || 3000;
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
