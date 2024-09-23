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

-- Insert 100 transactions across 7 accounts
INSERT INTO transactions (account_id, type, amount, date, description, journal_type) VALUES
    -- Transactions for MyMo Account (15 transactions)
    (1, 'Debit', 63.01, '2024-06-01 10:15:30', 'Purchase at retail store', 'CPJ'),
    (1, 'Credit', 200.00, '2024-06-05 14:22:00', 'Salary deposit', 'CRJ'),
    (1, 'Debit', 115.00, '2024-06-10 11:30:00', 'Utility bill payment', 'CPJ'),
    (1, 'Credit', 150.00, '2024-06-15 09:00:00', 'Gift received', 'CRJ'),
    (1, 'Debit', 70.00, '2024-06-18 12:00:00', 'Grocery shopping', 'CPJ'),
    (1, 'Debit', 80.00, '2024-06-20 17:45:00', 'Public transport', 'CPJ'),
    (1, 'Credit', 250.00, '2024-06-22 11:15:00', 'Bonus from work', 'CRJ'),
    (1, 'Debit', 90.00, '2024-06-25 13:30:00', 'Books purchased', 'CPJ'),
    (1, 'Credit', 100.00, '2024-06-28 15:45:00', 'Interest income', 'CRJ'),
    (1, 'Debit', 45.00, '2024-07-01 10:15:00', 'Dinner at restaurant', 'CPJ'),
    (1, 'Credit', 300.00, '2024-07-04 12:30:00', 'Freelance payment', 'CRJ'),
    (1, 'Debit', 75.00, '2024-07-07 14:00:00', 'Gift purchase', 'CPJ'),
    (1, 'Credit', 400.00, '2024-07-10 16:15:00', 'Refund from merchant', 'CRJ'),
    (1, 'Debit', 85.00, '2024-07-13 09:30:00', 'Coffee shop', 'CPJ'),
    (1, 'Credit', 500.00, '2024-07-16 11:45:00', 'Project payment received', 'CRJ'),

    -- Transactions for PureSave Account (10 transactions)
    (2, 'Credit', 15000.00, '2024-01-10 09:45:00', 'Monthly interest', 'CRJ'),
    (2, 'Debit', 2000.00, '2024-01-15 15:20:00', 'Transfer to savings account', 'CPJ'),
    (2, 'Debit', 500.00, '2024-01-18 12:10:00', 'Charity donation', 'CPJ'),
    (2, 'Credit', 1000.00, '2024-02-01 09:00:00', 'Interest income', 'CRJ'),
    (2, 'Debit', 750.00, '2024-02-10 13:00:00', 'Online purchase', 'CPJ'),
    (2, 'Credit', 2000.00, '2024-02-15 16:00:00', 'Investment return', 'CRJ'),
    (2, 'Debit', 300.00, '2024-02-20 11:00:00', 'Charity event donation', 'CPJ'),
    (2, 'Credit', 500.00, '2024-02-25 14:00:00', 'Rental income', 'CRJ'),
    (2, 'Debit', 400.00, '2024-03-01 09:15:00', 'Luxury dinner', 'CPJ'),
    (2, 'Credit', 3000.00, '2024-03-05 10:30:00', 'Bonus from employer', 'CRJ'),

    -- Transactions for Access Account (15 transactions)
    (3, 'Debit', 168.11, '2024-07-01 16:00:00', 'ATM withdrawal', 'CPJ'),
    (3, 'Credit', 300.00, '2024-07-02 13:00:00', 'Refund from merchant', 'CRJ'),
    (3, 'Debit', 55.00, '2024-07-05 09:45:00', 'Online purchase', 'CPJ'),
    (3, 'Credit', 400.00, '2024-07-07 10:00:00', 'Freelance work payment', 'CRJ'),
    (3, 'Debit', 100.00, '2024-07-09 14:00:00', 'Groceries', 'CPJ'),
    (3, 'Credit', 250.00, '2024-07-12 16:00:00', 'Gift from friend', 'CRJ'),
    (3, 'Debit', 75.00, '2024-07-15 18:00:00', 'Gas station', 'CPJ'),
    (3, 'Credit', 150.00, '2024-07-18 09:00:00', 'Refund from service', 'CRJ'),
    (3, 'Debit', 120.00, '2024-07-21 11:00:00', 'Movie tickets', 'CPJ'),
    (3, 'Credit', 500.00, '2024-07-24 13:00:00', 'Freelance project', 'CRJ'),
    (3, 'Debit', 200.00, '2024-07-26 15:00:00', 'Restaurant bill', 'CPJ'),
    (3, 'Credit', 600.00, '2024-07-29 17:00:00', 'Bonus from work', 'CRJ'),
    (3, 'Debit', 90.00, '2024-07-31 19:00:00', 'Coffee shop', 'CPJ'),
    (3, 'Credit', 400.00, '2024-08-02 09:00:00', 'Project completion payment', 'CRJ'),
    (3, 'Debit', 120.00, '2024-08-05 10:00:00', 'Utility bill payment', 'CPJ'),

    -- Transactions for Elite Account (15 transactions)
    (4, 'Debit', 5000.00, '2024-07-01 14:20:00', 'Investment in stocks', 'CPJ'),
    (4, 'Credit', 10000.00, '2024-07-05 11:30:00', 'Monthly salary', 'CRJ'),
    (4, 'Debit', 2000.00, '2024-07-10 16:00:00', 'Payment for services', 'CPJ'),
    (4, 'Credit', 3000.00, '2024-07-15 09:00:00', 'Consulting fee', 'CRJ'),
    (4, 'Debit', 1200.00, '2024-07-18 11:45:00', 'Travel expenses', 'CPJ'),
    (4, 'Credit', 4000.00, '2024-07-20 14:00:00', 'Investment return', 'CRJ'),
    (4, 'Debit', 800.00, '2024-07-22 16:30:00', 'Luxury dining', 'CPJ'),
    (4, 'Credit', 5000.00, '2024-07-25 10:00:00', 'Bonus from employer', 'CRJ'),
    (4, 'Debit', 1000.00, '2024-07-28 12:15:00', 'Gourmet shopping', 'CPJ'),
    (4, 'Credit', 2000.00, '2024-07-30 15:00:00', 'Rental income', 'CRJ'),
    (4, 'Debit', 700.00, '2024-08-01 17:45:00', 'Spa treatment', 'CPJ'),
    (4, 'Credit', 3000.00, '2024-08-05 09:30:00', 'Stock sale', 'CRJ'),
    (4, 'Debit', 2500.00, '2024-08-08 12:00:00', 'Luxury hotel stay', 'CPJ'),
    (4, 'Credit', 3500.00, '2024-08-10 14:45:00', 'Consulting fee', 'CRJ'),
    (4, 'Debit', 1500.00, '2024-08-12 17:30:00', 'Fine dining', 'CPJ'),

    -- Transactions for Student Achiever Account (15 transactions)
    (5, 'Debit', 22.90, '2024-07-01 08:30:00', 'Campus bookstore purchase', 'CPJ'),
    (5, 'Credit', 100.00, '2024-07-03 12:15:00', 'Allowance deposit', 'CRJ'),
    (5, 'Debit', 15.00, '2024-07-05 10:00:00', 'Coffee shop', 'CPJ'),
    (5, 'Credit', 200.00, '2024-07-07 14:00:00', 'Scholarship deposit', 'CRJ'),
    (5, 'Debit', 30.00, '2024-07-09 16:30:00', 'Grocery shopping', 'CPJ'),
    (5, 'Credit', 50.00, '2024-07-11 09:00:00', 'Gift from friend', 'CRJ'),
    (5, 'Debit', 10.00, '2024-07-13 11:45:00', 'Snack purchase', 'CPJ'),
    (5, 'Credit', 150.00, '2024-07-15 13:30:00', 'Allowance deposit', 'CRJ'),
    (5, 'Debit', 25.00, '2024-07-17 15:00:00', 'Public transport fare', 'CPJ'),
    (5, 'Credit', 80.00, '2024-07-19 17:30:00', 'Part-time job payment', 'CRJ'),
    (5, 'Debit', 50.00, '2024-07-21 19:00:00', 'Dinner at cafeteria', 'CPJ'),
    (5, 'Credit', 120.00, '2024-07-23 08:30:00', 'Scholarship deposit', 'CRJ'),
    (5, 'Debit', 40.00, '2024-07-25 10:15:00', 'Bookstore purchase', 'CPJ'),
    (5, 'Credit', 130.00, '2024-07-27 12:00:00', 'Freelance gig payment', 'CRJ'),
    (5, 'Debit', 20.00, '2024-07-29 14:45:00', 'Sports club fee', 'CPJ'),

    -- Transactions for Prestige Account (15 transactions)
    (6, 'Debit', 800.00, '2024-07-01 09:00:00', 'Luxury clothing purchase', 'CPJ'),
    (6, 'Credit', 5000.00, '2024-07-03 12:00:00', 'Salary deposit', 'CRJ'),
    (6, 'Debit', 1200.00, '2024-07-05 10:00:00', 'Fine dining', 'CPJ'),
    (6, 'Credit', 3000.00, '2024-07-07 14:00:00', 'Bonus payment', 'CRJ'),
    (6, 'Debit', 500.00, '2024-07-09 16:00:00', 'Gift purchase', 'CPJ'),
    (6, 'Credit', 2000.00, '2024-07-11 09:00:00', 'Consulting income', 'CRJ'),
    (6, 'Debit', 750.00, '2024-07-13 11:30:00', 'Luxury spa treatment', 'CPJ'),
    (6, 'Credit', 4000.00, '2024-07-15 13:00:00', 'Investment return', 'CRJ'),
    (6, 'Debit', 1500.00, '2024-07-17 15:00:00', 'Vacation expenses', 'CPJ'),
    (6, 'Credit', 6000.00, '2024-07-19 17:00:00', 'Monthly salary', 'CRJ'),
    (6, 'Debit', 250.00, '2024-07-21 19:00:00', 'Restaurant bill', 'CPJ'),
    (6, 'Credit', 3500.00, '2024-07-23 09:00:00', 'Freelance project payment', 'CRJ'),
    (6, 'Debit', 1800.00, '2024-07-25 11:00:00', 'Luxury watch purchase', 'CPJ'),
    (6, 'Credit', 7000.00, '2024-07-27 13:00:00', 'Bonus from employer', 'CRJ'),
    (6, 'Debit', 900.00, '2024-07-29 15:00:00', 'Gourmet dinner', 'CPJ'),

    -- Transactions for Professional Account (15 transactions)
    (7, 'Debit', 1500.00, '2024-07-01 09:30:00', 'Conference registration fee', 'CPJ'),
    (7, 'Credit', 4000.00, '2024-07-03 11:45:00', 'Salary deposit', 'CRJ'),
    (7, 'Debit', 800.00, '2024-07-05 13:00:00', 'Flight booking', 'CPJ'),
    (7, 'Credit', 2000.00, '2024-07-07 15:30:00', 'Consulting fee', 'CRJ'),
    (7, 'Debit', 600.00, '2024-07-09 17:00:00', 'Hotel reservation', 'CPJ'),
    (7, 'Credit', 3000.00, '2024-07-11 09:00:00', 'Bonus payment', 'CRJ'),
    (7, 'Debit', 1200.00, '2024-07-13 11:30:00', 'Business dinner', 'CPJ'),
    (7, 'Credit', 5000.00, '2024-07-15 13:15:00', 'Project payment', 'CRJ'),
    (7, 'Debit', 700.00, '2024-07-17 15:45:00', 'Travel expenses', 'CPJ'),
    (7, 'Credit', 6000.00, '2024-07-19 17:00:00', 'Monthly salary', 'CRJ'),
    (7, 'Debit', 400.00, '2024-07-21 19:30:00', 'Client gift', 'CPJ'),
    (7, 'Credit', 4500.00, '2024-07-23 09:00:00', 'Freelance work payment', 'CRJ'),
    (7, 'Debit', 1100.00, '2024-07-25 11:00:00', 'Event sponsorship', 'CPJ'),
    (7, 'Credit', 8000.00, '2024-07-27 13:30:00', 'Bonus from employer', 'CRJ'),
    (7, 'Debit', 600.00, '2024-07-29 15:00:00', 'Dinner with client', 'CPJ');
