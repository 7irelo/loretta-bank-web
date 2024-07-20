import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./Header/Header.jsx";
import Account from "./Account/Account.jsx";
import Footer from "./Footer/Footer.jsx";
import User from './User/User.jsx';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // localStorage.clear();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        console.log(token);
        if (!token) {
          setLoading(false);
          return;
        }

        const userResponse = await fetch('http://localhost:3000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!userResponse.ok) {
          localStorage.removeItem('jwtToken');
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        setUser(userData);

        const accountsResponse = await fetch('http://localhost:3000/api/accounts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!accountsResponse.ok) {
          throw new Error('Failed to fetch accounts data');
        }

        const accountsData = await accountsResponse.json();
        setAccounts(accountsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <div>
        {user && <Header user={user} />}
        <Routes>
          <Route
            path="/"
            element={user ? (
              <div className="home">
                <h2>Transacting</h2>
                {accounts.length > 0 && <Account account={accounts[0]} />}
                <h2>Saving and Investing</h2>
                {accounts.length > 1 && <Account account={accounts[1]} />}
                <Footer />
              </div>
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route path="/user" element={<User />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
