import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./MyDashboards.module.css";

function MyDashboards() {
  return (
    <div className={styles.card}>
      <div className={styles.dashboardsHead}>
        <h2 className={styles.dashboardsHeader}>My Dashboards</h2>
        <button className={styles.addDashboardBtn}>ADD DASHBOARD</button>
      </div>
      <table className={styles.dashboardTable}>
        <thead>
          <tr>
            <th>Dashboard name</th>
            <th>Card number</th>
            <th>Card status</th>
            <th>Current Dashboard</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>My personal dashboard</td>
            <td>5678 9012 5678 9012</td>
            <td className={styles.active}>Active</td>
            <td>
              <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
            </td>
          </tr>
          <tr>
            <td>Savings dashboard</td>
            <td>6789 0123 6789 0123</td>
            <td className={styles.inactive}>Inactive</td>
            <td>
              <FontAwesomeIcon icon={faTimes} className={styles.timesIcon} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MyDashboards;
