class AccountSerializer {
    static serialize(account) {
      return {
        id: account.id,
        name: account.name,
        user_id: account.user_id,
        account_type: account.account_type,
        available_balance: account.available_balance,
        latest_balance: account.latest_balance,
        account_status: account.account_status,
        image_url: account.image_url,
        created_at: account.created_at,
        updated_at: account.updated_at,
        account_number: account.account_number,
        user: {
          id: account.user_id,
          first_name: account.first_name,
          last_name: account.last_name,
          email: account.email,
          date_of_birth: account.date_of_birth,
          address: account.address,
          occupation: account.occupation,
          phone: account.phone,
          username: account.username
        },
        transactions: account.transactions,
        cards: account.cards,
        loans: account.loans
      };
    }
  }
  
module.exports = AccountSerializer;
  