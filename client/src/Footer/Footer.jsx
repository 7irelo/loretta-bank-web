import styles from "./Footer.module.css";
import logo from "../assets/logo.jpg";

function Footer() {
  return (
    <footer>
      <img src={logo} alt="Loretta Bank Logo" />
      <ul className={styles.footerLinks}>
        <li><a href="#">Report fraud</a></li>
        <li><a href="#">Report a problem</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
