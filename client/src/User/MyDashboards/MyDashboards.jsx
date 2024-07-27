import styles from "./MyDashboards.module.css";

function MyDashboards() {
  return (
    <div className={styles.card}>
      <div className={styles.dashboardsHead}>
        <h2 className={styles.dashboardsHeader}>My Dashboards</h2>
        <button className={styles.addDashboardBtn}>ADD DASHBOARD</button>
      </div>
      <div className={styles.dashboardRows}>
          <ul className={styles.dashboardRow}>
            <li><b>Dashboard name</b></li>
            <li><b>Card number</b></li>
            <li><b>Card status</b></li>
            <li><b>Current Dashboard</b></li>
          </ul>
          <ul>
            <li>My personal dashboard</li>
            <li>5678901256789012</li>
            <li>Active</li>
            <li>tick</li>
          </ul>
        </div>
    </div>
  );
}

export default MyDashboards;
