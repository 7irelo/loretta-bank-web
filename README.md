# Loretta Bank

**Loretta Bank** is an online banking web application built with Node.js and Express, utilizing MySQL for data storage. This application provides basic banking functionalities such as account creation, balance checking, money transfer, and transaction history.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication
- Account management (view balance, transaction history)
- Fund transfer between accounts
- Secure password storage with hashing
- Input validation and error handling

## Installation

To run this project locally, you will need to have Node.js, npm, and MySQL installed.

1. Clone the repository:

    ```bash
    git clone https://github.com/7irelo/Loretta_Bank.git
    cd Loretta_Bank
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the MySQL database:

    - Create a new MySQL database.
    - Import the database schema from `db/schema.sql`.

4. Configure the environment variables (see [Configuration](#configuration)).

5. Start the application:

    ```bash
    npm start
    ```

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=loretta_bank
JWT_SECRET=your_jwt_secret
```

- `PORT`: The port on which the server will run.
- `DB_HOST`: The MySQL database host.
- `DB_USER`: The MySQL database user.
- `DB_PASSWORD`: The MySQL database password.
- `DB_NAME`: The MySQL database name.
- `JWT_SECRET`: The secret key for JSON Web Token (JWT) generation.

## Usage

Once the application is running, you can access it at `http://localhost:3000`.

## API Endpoints

Here are some of the key API endpoints available:

### User Authentication

- **POST /api/register**
  - Registers a new user.
  - Request body: `{ "username": "string", "password": "string" }`

- **POST /api/login**
  - Authenticates a user.
  - Request body: `{ "username": "string", "password": "string" }`

### Account Management

- **GET /api/account**
  - Retrieves account details of the authenticated user.
  - Headers: `{ "Authorization": "Bearer <token>" }`

- **POST /api/account/transfer**
  - Transfers funds between accounts.
  - Request body: `{ "toAccountId": "number", "amount": "number" }`
  - Headers: `{ "Authorization": "Bearer <token>" }`

### Transactions

- **GET /api/transactions**
  - Retrieves transaction history of the authenticated user.
  - Headers: `{ "Authorization": "Bearer <token>" }`

## Database Schema

The MySQL database schema includes the following tables:

- **Users**
  - `id`: Primary key
  - `username`: Unique username
  - `password`: Hashed password

- **Accounts**
  - `id`: Primary key
  - `userId`: Foreign key to Users table
  - `balance`: Account balance

- **Transactions**
  - `id`: Primary key
  - `fromAccountId`: Foreign key to Accounts table
  - `toAccountId`: Foreign key to Accounts table
  - `amount`: Transaction amount
  - `timestamp`: Transaction timestamp

For detailed schema information, refer to the `db/schema.sql` file.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.