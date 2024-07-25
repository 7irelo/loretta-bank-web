Here's the updated README with PostgreSQL instructions and improved code structure. I've also included a folder structure for better organization.

---

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
    cd loretta-bank-web
    ```

2. Install dependencies:

    ```bash
    cd server
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `server` directory and add the following:

    ```env
    PORT=3000
    DATABASE_URL=postgres://username:password@localhost:5432/lorettabank
    JWT_SECRET=your_jwt_secret
    ```

4. Initialize the database schema:

    Create the database and apply migrations using `node-postgres` or `pg-promise`:

    ```bash
    npm run migrate
    ```

5. Start the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `client` directory and add the following:

    ```env
    REACT_APP_API_URL=http://localhost:3000/api
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

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user
- `GET /api/auth/me` - Fetch logged in user
- `PUT /api/auth/logout` - Update logged in user
- `PATCH /api/auth/logout` - Update logged in user

### Accounts

- `GET /api/accounts` - Get all accounts for the authenticated user
- `POST /api/accounts` - Create a new account
- `GET /api/accounts/:id` - Get a specific account
- `PUT /api/accounts/:id` - Update a specific account
- `DELETE /api/accounts/:id` - Delete a specific account

### Transactions

- `GET /api/transactions` - Get all transactions for the specific account
- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions/:id` - Get a specific transaction
- `PUT /api/transactions/:id` - Update a specific transaction
- `DELETE /api/transactions/:id` - Delete a specific transaction

### Cards

- `GET /api/cards` - Get all cards for the specific account
- `POST /api/cards` - Create a new card
- `GET /api/cards/:id` - Get a specific card
- `PUT /api/cards/:id` - Update a specific card
- `DELETE /api/cards/:id` - Delete a specific card

### Loans

- `GET /api/loans` - Get all loans for the specific account
- `POST /api/loans` - Create a new loan
- `GET /api/loans/:id` - Get a specific loan
- `PUT /api/loans/:id` - Update a specific loan
- `DELETE /api/loans/:id` - Delete a specific loan

### Customer Support Ticket

- `GET /api/support` - Get all support tickets for the specific user
- `POST /api/support` - Create a new support ticket
- `GET /api/support/:id` - Get a specific support ticket
- `PUT /api/support/:id` - Update a specific support ticket
- `DELETE /api/support/:id` - Delete a specific support ticket

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

For any inquiries or issues, please contact us at [support@lorettabank.com](mailto:support@lorettabank.com).

## Folder Structure

```
loretta-bank-web/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   ├── .env
│   └── package.json
├── server/                    # Node.js backend
│   ├── config/                # Database and app configuration
│   ├── controllers/           # Route controllers
│   ├── middlewares/           # Middleware functions
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   ├── services/              # Business logic
│   ├── utils/                 # Utility functions
│   ├── .env
│   └── package.json
└── README.md
```
