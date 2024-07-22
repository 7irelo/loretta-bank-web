DROP TABLE IF EXISTS customer_support, cards, loans, transactions, accounts, users CASCADE;

DROP SEQUENCE IF EXISTS accounts_id_seq, transactions_id_seq, cards_id_seq, loans_id_seq, customer_support_id_seq CASCADE;

DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT typname FROM pg_type WHERE typname IN ('users', 'accounts', 'transactions', 'cards', 'loans', 'customer_support')) LOOP
        EXECUTE 'DROP TYPE ' || quote_ident(r.typname) || ' CASCADE';
      END LOOP;
    END $$;

CREATE TABLE IF NOT EXISTS users (
      id VARCHAR PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      address VARCHAR NOT NULL,
      date_of_birth DATE NOT NULL,
      occupation VARCHAR,
      phone VARCHAR NOT NULL,
      email VARCHAR UNIQUE NOT NULL,
      username VARCHAR UNIQUE NOT NULL,
      password VARCHAR NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

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

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    account_id INTEGER REFERENCES accounts(id),
    type VARCHAR NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR,
    journal_type VARCHAR
);

CREATE TABLE IF NOT EXISTS loans (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR REFERENCES users(id) NOT NULL,
      account_id INTEGER REFERENCES accounts(id) NOT NULL,
      loan_type VARCHAR NOT NULL CHECK (loan_type IN ('Personal', 'Mortgage', 'Auto', 'Student')),
      amount DOUBLE PRECISION NOT NULL,
      interest_rate DOUBLE PRECISION NOT NULL,
      term INTEGER NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

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

CREATE TABLE IF NOT EXISTS customer_support (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR REFERENCES users(id) NOT NULL,
      query TEXT NOT NULL,
      response TEXT,
      status VARCHAR NOT NULL CHECK (status IN ('Open', 'Pending', 'Resolved', 'Closed')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );