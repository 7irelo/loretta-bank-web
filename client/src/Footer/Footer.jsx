import styles from "./Footer.module.css"
import logo from "../assets/logo.jpg"

function Footer() {

    return(
        <footer>
            <img src={logo}></img>
            <ul className={styles.footerLinks}>
                <a>Report fraud</a>
                <a>Report a problem</a>
            </ul>
        </footer>
    );
}

export default Footer