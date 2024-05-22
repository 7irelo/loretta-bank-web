# Loretta Bank

Welcome to Loretta Bank, an online banking web application built using Node.js and Express. This application provides a secure and user-friendly platform for managing banking activities such as viewing account balances, transferring funds, and managing transactions.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Registration and Login)
- View Account Balance
- Transfer Funds between Accounts
- Transaction History
- Profile Management
- Secure Password Handling

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (v4.x or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/7irelo/Loretta_Bank.git
   cd Loretta_Bank
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/loretta-bank
   JWT_SECRET=your_jwt_secret_key
   ```

### Running the Application

1. **Start the MongoDB server:**
   ```bash
   mongod
   ```

2. **Start the Node server:**
   ```bash
   npm start
   ```

3. **Visit the application in your browser:**
   Open `http://localhost:5000`

## Usage

1. **Register a new account:**
   Go to the registration page and create a new user account.

2. **Login:**
   Use your credentials to log in to the application.

3. **View account balance:**
   After logging in, you can view your current account balance on the dashboard.

4. **Transfer funds:**
   Navigate to the transfer page to send money to another account.

5. **View transaction history:**
   Check your recent transactions in the transaction history section.

6. **Manage your profile:**
   Update your personal information and change your password in the profile settings.

## API Endpoints

Here are some of the main API endpoints available in Loretta Bank:

- **User Authentication:**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login with user credentials

- **Account Management:**
  - `GET /api/accounts` - Get account details
  - `POST /api/accounts/transfer` - Transfer funds

- **Transaction History:**
  - `GET /api/transactions` - Get transaction history

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for using Loretta Bank! If you have any questions or feedback, please open an issue or contact the project maintainers.
