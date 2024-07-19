import { useEffect, useState } from 'react';
import styles from './User.module.css';

function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.userProfile}>
      <img src="/path/to/default-profile-pic.png" alt="User Profile" className={styles.profilePic} />
      <h1>{user.first_name} {user.last_name}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Occupation: {user.occupation}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>
    </div>
  );
}

export default User;
