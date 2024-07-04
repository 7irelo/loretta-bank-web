# Loretta Bank

Welcome to Loretta Bank, an online banking application built with Node.js, Express, PostgreSQL, and React. Loretta Bank offers a secure, user-friendly platform for managing your banking needs online.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User Authentication (Sign Up, Log In, Log Out)
- Account Management (Create, View, Update, Delete Accounts)
- Fund Transfers (Internal and External)
- Transaction History
- Balance Inquiries
- Responsive Design

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Frontend**: React
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS, Bootstrap

## Installation

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- Git installed

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/7irelo/loretta-bank-web.git
    cd loretta-bank
    ```

2. Install dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    PORT=5000
    DATABASE_URL=postgres://username:password@localhost:5432/loretta_bank
    JWT_SECRET=your_jwt_secret
    ```

4. Initialize the database:

    ```bash
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    ```

5. Start the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `frontend` directory and add the following:

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4. Start the frontend server:

    ```bash
    npm start
    ```

## Usage

- Open your web browser and navigate to `http://localhost:3000`
- Sign up for a new account or log in with your existing credentials
- Manage your accounts, transfer funds, and view transaction history

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Sign up a new user
- `POST /api/auth/login` - Log in a user
- `POST /api/auth/logout` - Log out a user

### Accounts

- `GET /api/accounts` - Get all accounts for the authenticated user
- `POST /api/accounts` - Create a new account
- `GET /api/accounts/:id` - Get a specific account
- `PUT /api/accounts/:id` - Update a specific account
- `DELETE /api/accounts/:id` - Delete a specific account

### Transactions

- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions` - Get all transactions for the authenticated user

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, please contact us at [support@lorettabank.com](mailto:tirelo.eric@gmail.com).
