const { pool } = require('../config/database');

const dropTablesAndSequences = async () => {
  const dropTablesQuery = `
    DROP TABLE IF EXISTS customer_support, cards, loans, transactions, accounts, users CASCADE;
  `;
  await pool.query(dropTablesQuery);

  // Drop sequences if they exist
  const dropSequencesQuery = `
    DROP SEQUENCE IF EXISTS accounts_id_seq, transactions_id_seq, cards_id_seq, loans_id_seq, customer_support_id_seq CASCADE;
  `;
  await pool.query(dropSequencesQuery);

  // Drop types if they exist
  const dropTypesQuery = `
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT typname FROM pg_type WHERE typname IN ('users', 'accounts', 'transactions', 'cards', 'loans', 'customer_support')) LOOP
        EXECUTE 'DROP TYPE ' || quote_ident(r.typname) || ' CASCADE';
      END LOOP;
    END $$;
  `;
  await pool.query(dropTypesQuery);
};

module.exports = { dropTablesAndSequences };
