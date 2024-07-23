import { Link, Route, Routes, Navigate } from 'react-router-dom';
import MyDashboards from './MyDashboards';
import LinkSecureProfile from './LinkSecureProfile';
import ManageDetails from './ManageDetails';
import OverdraftLimit from './OverdraftLimit';
import ManageConsents from './ManageConsents';
import ManageThirdPartyAccess from './ManageThirdPartyAccess';
import StatementDeliveryAddress from './StatementDeliveryAddress';
import ManageDevices from './ManageDevices';
import ViewPersonalDetails from './ViewPersonalDetails';
import ManageOtpPreference from './ManageOtpPreference';
import styles from './User.module.css';

function User() {
  const menuItems = [
    { name: 'My Dashboards', path: '/user/dashboards' },
    { name: 'Link & Secure Your Profile', path: '/user/link-secure' },
    { name: 'Manage Your Details', path: '/user/manage-details' },
    { name: 'Overdraft Limit', path: '/user/overdraft-limit' },
    { name: 'Manage Your Consents', path: '/user/manage-consents' },
    { name: 'Manage Third-Party Access', path: '/user/manage-third-party' },
    { name: 'Statement Delivery Address', path: '/user/statement-delivery' },
    { name: 'Manage Devices', path: '/user/manage-devices' },
    { name: 'View Personal Details', path: '/user/view-personal-details' },
    { name: 'Manage OTP Preference', path: '/user/manage-otp' },
  ];

  return (
    <div className={styles.userContainer}>
      <nav className={styles.sidebar}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.content}>
        <Routes>
          <Route path="/dashboards" element={<MyDashboards />} />
          <Route path="/link-secure" element={<LinkSecureProfile />} />
          <Route path="/manage-details" element={<ManageDetails />} />
          <Route path="/overdraft-limit" element={<OverdraftLimit />} />
          <Route path="/manage-consents" element={<ManageConsents />} />
          <Route path="/manage-third-party" element={<ManageThirdPartyAccess />} />
          <Route path="/statement-delivery" element={<StatementDeliveryAddress />} />
          <Route path="/manage-devices" element={<ManageDevices />} />
          <Route path="/view-personal-details" element={<ViewPersonalDetails />} />
          <Route path="/manage-otp" element={<ManageOtpPreference />} />
          <Route path="*" element={<Navigate to="/user/dashboards" />} />
        </Routes>
      </div>
    </div>
  );
}

export default User;
