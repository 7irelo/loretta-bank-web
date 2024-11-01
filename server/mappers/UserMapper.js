class UserMapper {
  static mapUserData(rows) {
    if (!rows || rows.length === 0) return null;

    // Extract user info
    const user = {
      id: rows[0].user_id,  // User ID should be correctly populated
      firstName: rows[0].first_name,
      lastName: rows[0].last_name,
      email: rows[0].email,
      dateOfBirth: rows[0].date_of_birth,
      address: rows[0].address,
      occupation: rows[0].occupation,
      phone: rows[0].phone,
      username: rows[0].username,
      password: rows[0].password,
      createdAt: rows[0].user_created_at,
      updatedAt: rows[0].user_updated_at,
      accounts: [],
    };

    // Aggregate accounts, cards, and loans
    rows.forEach(row => {
      if (row.account_id) {
        // Account data
        const account = {
          id: row.account_id,
          accountNumber: row.account_number,  // Including account number
          accountType: row.account_type,
          availableBalance: row.available_balance,
          latestBalance: row.latest_balance,
          accountStatus: row.account_status,
          createdAt: row.account_created_at,
          updatedAt: row.account_updated_at,
          cards: [],
          loans: [],
        };

        // Cards
        if (row.card_id) {
          account.cards.push({
            id: row.card_id,
            cardNumber: row.card_number,
            expiryDate: row.expiry_date,
            cvv: row.cvv,
            creditLimit: row.credit_limit,
            balance: row.card_balance,
          });
        }

        // Loans
        if (row.loan_id) {
          account.loans.push({
            id: row.loan_id,
            loanType: row.loan_type,
            amount: row.loan_amount,
            interestRate: row.interest_rate,
            term: row.term,
            startDate: row.start_date,
            endDate: row.end_date,
          });
        }

        // Add account to user data
        user.accounts.push(account);
      }
    });

    // Remove duplicate accounts, cards, and loans
    user.accounts = [...new Map(user.accounts.map(acc => [acc.id, acc])).values()];
    user.accounts.forEach(acc => {
      acc.cards = [...new Map(acc.cards.map(card => [card.id, card])).values()];
      acc.loans = [...new Map(acc.loans.map(loan => [loan.id, loan])).values()];
    });

    return user;
  }
}

module.exports = UserMapper;
