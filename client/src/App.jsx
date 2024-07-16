import React, { useEffect, useState } from 'react';
import Header from "./Header/Header.jsx";
import Account from "./Account/Account.jsx";
import Footer from "./Footer/Footer.jsx";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('https://localhost:3000/accounts', {
          headers: {
            'Authorization': `Bearer YOUR_JWT_TOKEN_HERE`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {accounts.length > 0 && <Header service={accounts[0]} />}
      <div className="home">
        <h2>Transacting</h2>
        {accounts.length > 0 && <Account account={accounts[0]} />}
        <h2>Saving and Investing</h2>
        {accounts.length > 1 && <Account account={accounts[1]} />}
        <Footer />
      </div>
    </div>
  );
}

export default App;
