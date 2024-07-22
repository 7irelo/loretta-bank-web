class AccountDTO {
    constructor({ account_type, available_balance, account_status }) {
      this.accountType = account_type;
      this.availableBalance = available_balance;
      this.accountStatus = account_status;
    }
  }
  
module.exports = AccountDTO;
  