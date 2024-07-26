import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./Header/Header.jsx";
import Account from "./Account/Account.jsx";
import Footer from "./Footer/Footer.jsx";
import User from './User/User.jsx';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import Borrow from './Borrow/Borrow.jsx';
import Loading from './Loading';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
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

  const groupedAccounts = accounts.reduce((acc, account) => {
    const { accountType } = account;
    if (!acc[accountType]) {
      acc[accountType] = [];
    }
    acc[accountType].push(account);
    return acc;
  }, {});

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <div className="app">
        {user && <Header user={user} />}
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={user ? (
                <div className="home">
                  <h2>Accounts</h2><hr/>
                  {Object.keys(groupedAccounts).map((accountType) => (
                    <div key={accountType}>
                      <h3>{accountType}</h3>
                      {groupedAccounts[accountType].map((account, index) => (
                        <Account key={index} account={account} />
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <Navigate to="/login" />
              )}
            />
            <Route path="/borrow" element={<Borrow />} />
            <Route path="/user/*" element={<User />} />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
