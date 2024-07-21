CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(13) NOT NULL,
    name VARCHAR NOT NULL,
    user_id VARCHAR REFERENCES users(id) NOT NULL,
    account_type VARCHAR NOT NULL CHECK (account_type IN ('Savings', 'Cheque', 'Credit')),
    available_balance DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    latest_balance DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    account_status VARCHAR NOT NULL DEFAULT 'Active' CHECK (account_status IN ('Active', 'Inactive', 'Closed')),
    image_url VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO accounts (account_number, name, user_id, account_type, available_balance, latest_balance, account_status, image_url, created_at, updated_at)
VALUES
    ('1001234567890', 'MyMo Account', '0107096245082', 'Cheque', 7858.69, 7795.68, 'Active', './src/assets/cheque.png', '2024-01-15 08:23:45', '2024-06-10 14:45:30'),
    ('1009876543210', 'PureSave Account', '0107096245082', 'Savings', 1565450.55, 1565900.55, 'Active', './src/assets/savings.png', '2023-11-05 09:34:20', '2024-01-20 11:10:55'),
    ('1001112223334', 'Access Account', '0107096245082', 'Cheque', 8335.34, 8503.45, 'Active', './src/assets/cheque.png', '2024-03-25 16:07:13', '2024-07-01 12:23:45'),
    ('1004445556667', 'Elite Account', '0107096245082', 'Cheque', 150440.43, 205006.75, 'Active', './src/assets/cheque.png', '2024-02-10 13:12:30', '2024-07-15 17:54:20'),
    ('1008889990001', 'Student Achiever Account', '0107096245082', 'Cheque', 18766.48, 18744.58, 'Active', './src/assets/cheque.png', '2024-04-07 10:05:00', '2024-07-20 09:15:10'),
    ('1005554443332', 'Prestige Banking Account', '0107096245082', 'Cheque', 234567.89, 234589.32, 'Active', './src/assets/cheque.png', '2024-05-12 14:21:35', '2024-07-17 11:40:20'),
    ('1006667778889', 'Private Banking Account', '0107096245082', 'Cheque', 500123.45, 500567.89, 'Active', './src/assets/cheque.png', '2024-06-18 16:32:50', '2024-07-22 15:25:30');


CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id) NOT NULL,
    account_id INTEGER REFERENCES accounts(id) NOT NULL,
    card_number VARCHAR(16) NOT NULL,
    expiry_date DATE NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    credit_limit DOUBLE PRECISION NOT NULL,
    balance DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cards (user_id, account_id, card_number, expiry_date, cvv, credit_limit, balance, created_at, updated_at)
VALUES
    ('0107096245082', 1, '1234567812345678', '2026-05-31', '123', 10000.00, 7858.69, '2024-01-16 08:23:45', '2024-06-11 14:45:30'),
    ('0107096245082', 2, '2345678923456789', '2025-12-31', '456', 20000.00, 1565450.55, '2023-11-06 09:34:20', '2024-01-21 11:10:55'),
    ('0107096245082', 3, '3456789034567890', '2026-03-31', '789', 15000.00, 8335.34, '2024-03-26 16:07:13', '2024-07-02 12:23:45'),
    ('0107096245082', 4, '4567890145678901', '2026-07-31', '012', 25000.00, 150440.43, '2024-02-11 13:12:30', '2024-07-16 17:54:20'),
    ('0107096245082', 5, '5678901256789012', '2024-11-30', '345', 5000.00, 18766.48, '2024-04-08 10:05:00', '2024-07-21 09:15:10'),
    ('0107096245082', 6, '6789012367890123', '2025-08-31', '678', 30000.00, 234567.89, '2024-05-13 14:21:35', '2024-07-18 11:40:20'),
    ('0107096245082', 7, '7890123478901234', '2027-02-28', '901', 40000.00, 500123.45, '2024-06-19 16:32:50', '2024-07-23 15:25:30');

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    account_id INTEGER REFERENCES accounts(id),
    type VARCHAR NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR,
    journal_type VARCHAR
);

INSERT INTO transactions (account_id, type, amount, date, description, journal_type)
VALUES
    -- Transactions for MyMo Account
    (1, 'Debit', 63.01, '2024-06-01 10:15:30', 'Purchase at retail store', 'CPJ'),
    (1, 'Credit', 200.00, '2024-06-05 14:22:00', 'Salary deposit', 'CRJ'),
    (1, 'Debit', 115.00, '2024-06-10 11:30:00', 'Utility bill payment', 'CPJ'),

    -- Transactions for PureSave Account
    (2, 'Credit', 15000.00, '2024-01-10 09:45:00', 'Monthly interest', 'CRJ'),
    (2, 'Debit', 2000.00, '2024-01-15 15:20:00', 'Transfer to savings account', 'CPJ'),
    (2, 'Debit', 500.00, '2024-01-18 12:10:00', 'Charity donation', 'CPJ'),

    -- Transactions for Access Account
    (3, 'Debit', 168.11, '2024-07-01 16:00:00', 'ATM withdrawal', 'CPJ'),
    (3, 'Credit', 300.00, '2024-07-02 13:00:00', 'Refund from merchant', 'CRJ'),
    (3, 'Debit', 55.00, '2024-07-05 09:45:00', 'Online purchase', 'CPJ'),

    -- Transactions for Elite Account
    (4, 'Debit', 5000.00, '2024-07-01 14:20:00', 'Investment in stocks', 'CPJ'),
    (4, 'Credit', 10000.00, '2024-07-05 11:30:00', 'Monthly salary', 'CRJ'),
    (4, 'Debit', 2000.00, '2024-07-10 16:00:00', 'Payment for services', 'CPJ'),

    -- Transactions for Student Achiever Account
    (5, 'Debit', 22.90, '2024-07-01 08:15:00', 'Coffee shop', 'CPJ'),
    (5, 'Debit', 60.00, '2024-07-02 17:00:00', 'Grocery shopping', 'CPJ'),
    (5, 'Credit', 100.00, '2024-07-03 12:00:00', 'Allowance deposit', 'CRJ'),

    -- Transactions for Prestige Banking Account
    (6, 'Credit', 15000.00, '2024-07-01 10:00:00', 'Investment return', 'CRJ'),
    (6, 'Debit', 7000.00, '2024-07-02 15:45:00', 'Purchase of electronics', 'CPJ'),
    (6, 'Debit', 2500.00, '2024-07-05 11:30:00', 'Transfer to other account', 'CPJ'),

    -- Transactions for Private Banking Account
    (7, 'Debit', 20000.00, '2024-07-01 13:20:00', 'Real estate investment', 'CPJ'),
    (7, 'Credit', 50000.00, '2024-07-03 14:30:00', 'Large deposit', 'CRJ'),
    (7, 'Debit', 5000.00, '2024-07-10 10:15:00', 'Luxury purchase', 'CPJ');
