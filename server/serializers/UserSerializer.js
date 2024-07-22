class UserSerializer {
    static serialize(user) {
      return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        dateOfBirth: user.date_of_birth,
        address: user.address,
        occupation: user.occupation,
        phone: user.phone,
        username: user.username,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      };
    }
  }
  
  module.exports = UserSerializer;
  