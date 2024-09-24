import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Login from "./pages/LoginPage/Login.jsx";
import Register from "./pages/RegisterPage/Register.jsx";
import AppLayout from "./AppLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import UserPage from "./User/UserPage.jsx";
import MyDashboards from "./User/MyDashboards/MyDashboards.jsx";
import LinkSecureProfile from "./User/LinkSecureProfile/LinkSecureProfile.jsx";
import ManageDetails from "./User/ManageDetails/ManageDetails.jsx";
import OverdraftLimit from "./User/OverdraftLimit/OverdraftLimit.jsx";
import ManageConsents from "./User/ManageConsents/ManageConsents.jsx";
import ManageThirdPartyAccess from "./User/ManageThirdPartyAccess/ManageThirdPartyAccess.jsx";
import StatementDeliveryAddress from "./User/StatementDeliveryAddress/StatementDeliveryAddress.jsx";
import ManageDevices from "./User/ManageDevices/ManageDevices.jsx";
import ViewPersonalDetails from "./User/ViewPersonalDetails/ViewPersonalDetails.jsx";
import ManageOtpPreference from "./User/ManageOtpPreference/ManageOtpPreference.jsx";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "user",
        element: <UserPage />,
        errorElement: <NotFoundPage />,
        children: [
          { path: "", element: <Navigate to="dashboards" replace /> },
          { path: "dashboards", element: <MyDashboards /> },
          { path: "link-secure", element: <LinkSecureProfile /> },
          { path: "manage-details", element: <ManageDetails /> },
          { path: "overdraft-limit", element: <OverdraftLimit /> },
          { path: "manage-consents", element: <ManageConsents /> },
          { path: "manage-third-party", element: <ManageThirdPartyAccess /> },
          { path: "statement-delivery", element: <StatementDeliveryAddress /> },
          { path: "manage-devices", element: <ManageDevices /> },
          { path: "view-personal-details", element: <ViewPersonalDetails /> },
          { path: "manage-otp", element: <ManageOtpPreference /> },
          { path: "*", element: <MyDashboards /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
