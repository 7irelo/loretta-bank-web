import { useState, useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Loading from "./Loading";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function AppLayout() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation(); // Get the current route location

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setLoading(false);
          return;
        }

        const userResponse = await fetch("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          localStorage.removeItem("jwtToken");
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        setUser(userData);

        const accountsResponse = await fetch(
          "http://localhost:3000/api/accounts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!accountsResponse.ok) {
          throw new Error("Failed to fetch accounts data");
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
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // If no user is authenticated, redirect to the login page
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Conditionally render the header only if not on login or register pages
  const showHeader =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      {showHeader && <Header user={user} />}
      <Outlet context={{ user, accounts }} />
      <Footer />
    </>
  );
}
