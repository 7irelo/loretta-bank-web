class UserDTO {
  constructor({ id, first_name, last_name, email, date_of_birth, address, occupation, phone, username }) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.dateOfBirth = date_of_birth;
    this.address = address;
    this.occupation = occupation;
    this.phone = phone;
    this.username = username;
  }

  static fromRequestBody(body) {
    return new UserDTO(body);
  }
}

module.exports = UserDTO;
