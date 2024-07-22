const UserDTO = require('../dtos/UserDto');
const AccountDTO = require('../dtos/AccountDto');

class AccountSerializer {
  static serialize(accountDTO) {
    return {
      id: accountDTO.id,
      name: accountDTO.name,
      user: {
        id: accountDTO.user.id,
        firstName: accountDTO.user.firstName,
        lastName: accountDTO.user.lastName,
        email: accountDTO.user.email,
        dateOfBirth: accountDTO.user.dateOfBirth,
        address: accountDTO.user.address,
        occupation: accountDTO.user.occupation,
        phone: accountDTO.user.phone,
        username: accountDTO.user.username,
      },
      accountType: accountDTO.accountType,
      availableBalance: accountDTO.availableBalance,
      latestBalance: accountDTO.latestBalance,
      accountStatus: accountDTO.accountStatus,
      imageUrl: accountDTO.imageUrl,
      createdAt: accountDTO.createdAt,
      updatedAt: accountDTO.updatedAt,
      accountNumber: accountDTO.accountNumber,
      transactions: accountDTO.transactions,
      cards: accountDTO.cards,
      loans: accountDTO.loans,
    };
  }
}

module.exports = AccountSerializer;
