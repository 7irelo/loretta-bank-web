import { NavLink, Outlet } from "react-router-dom";
import styles from "./UserPage.module.css";

function UserPage() {
  return (
    <>
      <div className={styles.userContainer}>
        <nav className={styles.sidebar}>
          <ul>
            <li>
              <h3>My Profile and Settings</h3>
            </li>
            <li>
              <NavLink
                to="/user/dashboards"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                My Dashboards
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/link-secure"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                Link & Secure Your Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/manage-details"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                Manage Your Details
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/overdraft-limit"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                Overdraft Limit
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/manage-consents"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                Manage Your Consents
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/manage-third-party"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                Manage Third-Party Access
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/statement-delivery"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                Statement Delivery Address
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/manage-devices"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                Manage Devices
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/view-personal-details"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                View Personal Details
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/manage-otp"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                Manage OTP Preference
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserPage;
