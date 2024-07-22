class UserDTO {
    constructor(id, firstName, lastName, email, dateOfBirth, address, occupation, phone, username, password) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.dateOfBirth = dateOfBirth;
      this.address = address;
      this.occupation = occupation;
      this.phone = phone;
      this.username = username;
      this.password = password;
    }
  
    static fromRequestBody(body) {
      return new UserDTO(
        body.id,
        body.firstName,
        body.lastName,
        body.email,
        body.dateOfBirth,
        body.address,
        body.occupation,
        body.phone,
        body.username,
        body.password
      );
    }
  }
  
  module.exports = UserDTO;
  