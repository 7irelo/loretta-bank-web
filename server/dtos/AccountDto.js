// dtos/AccountDTO.js
const UserDTO = require('./UserDto');

class AccountDTO {
  constructor({
    id,
    name,
    user_id,
    account_type,
    available_balance,
    latest_balance,
    account_status,
    image_url,
    created_at,
    updated_at,
    account_number,
    transactions,
    cards,
    loans,
    user, // Include user as a property
  }) {
    this.id = id;
    this.name = name;
    this.userId = user_id;
    this.accountType = account_type;
    this.availableBalance = available_balance;
    this.latestBalance = latest_balance;
    this.accountStatus = account_status;
    this.imageUrl = image_url;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
    this.accountNumber = account_number;
    this.transactions = transactions;
    this.cards = cards;
    this.loans = loans;
    this.user = new UserDTO(user); // Initialize user as a UserDTO
  }
}

module.exports = AccountDTO;
