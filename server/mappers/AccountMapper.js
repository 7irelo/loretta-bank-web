class AccountMapper {
  static mapAccountData(rows) {
    if (!rows || rows.length === 0) return null;

    // Extract user info (assuming it's consistent across rows)
    const user = {
      id: rows[0].user_id,
      firstName: rows[0].first_name,
      lastName: rows[0].last_name,
      email: rows[0].email,
      dateOfBirth: rows[0].date_of_birth,
      address: rows[0].address,
      occupation: rows[0].occupation,
      phone: rows[0].phone,
      username: rows[0].username,
    };

    // Extract account info (also consistent across rows)
    const account = {
      id: rows[0].id,
      accountNumber: rows[0].account_number,
      name: rows[0].name,
      accountType: rows[0].account_type,
      availableBalance: rows[0].available_balance,
      latestBalance: rows[0].latest_balance,
      accountStatus: rows[0].account_status,
      imageUrl: rows[0].image_url,
      createdAt: rows[0].created_at,
      updatedAt: rows[0].updated_at,
      transactions: [],
      cards: [],
      loans: [],
      user, // Attach user information
    };

    // Aggregate transactions, cards, and loans
    rows.forEach(row => {
      if (row.transaction_id) {
        account.transactions.push({
          id: row.transaction_id,
          type: row.transaction_type,
          amount: row.amount,
          date: row.date,
          description: row.description,
          journalType: row.journal_type,
        });
      }

      if (row.card_number) {
        account.cards.push({
          id: row.card_id, // card id
          cardNumber: row.card_number,
          expiryDate: row.expiry_date,
          cvv: row.cvv,
          creditLimit: row.credit_limit,
          balance: row.card_balance,
          createdAt: row.card_created_at,
          updatedAt: row.card_updated_at,
        });
      }

      if (row.loan_id) {
        account.loans.push({
          id: row.loan_id,
          loanType: row.loan_type,
          amount: row.loan_amount,
          interestRate: row.interest_rate,
          term: row.term,
          startDate: row.start_date,
          endDate: row.end_date,
          createdAt: row.loan_created_at,
          updatedAt: row.loan_updated_at,
        });
      }
    });

    // Remove duplicate cards and loans
    account.cards = [...new Map(account.cards.map(card => [card.id, card])).values()];
    account.loans = [...new Map(account.loans.map(loan => [loan.id, loan])).values()];

    return account;
  }
}

module.exports = AccountMapper;
