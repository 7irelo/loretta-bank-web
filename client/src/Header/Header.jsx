import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import styles from "./Header.module.css";
import logo from "../assets/logo.jpg";
import dp from "../assets/dp2.png";

function Header(props) {
    const dropMenu = () => {
        const dropDown = document.getElementById("quickLinksDropDown");
        dropDown.style.display = dropDown.style.display === "none" ? "block" : "none";
    };

    const navigation = [
        { id: "home", name: "Home" },
        { id: "transact", name: "Transact" },
        { id: "schedule", name: "Buy" },
        { id: "location", name: "Apply" },
        { id: "about", name: "Borrow" },
    ];

    const navItems = navigation.map(navItem => (
        <li key={navItem.id} className={navItem.id}><a href={`#${navItem.id}`}>{navItem.name}</a></li>
    ));

    return (
        <header>
            <div className={styles.head}>
                <div className={styles.logo}>
                    <a href="/"><img src={logo} alt="Loretta Bank Logo" /><h1>Loretta Bank</h1></a>
                </div>
                <div className={styles.auth}>
                    <img src={dp} alt="User Profile" />
                    <li><Link to="/user">{props.user.firstName}</Link></li>
                    <li><a href="/">Sign out</a></li>
                </div>
                <div className={styles.hamburger}><h1>≡</h1></div>
            </div>
            <nav>
                <ul>{navItems}</ul>
                <button className={styles.quickLinks} id="quickLinks" onClick={dropMenu}>QuickLinks</button>
                <div className={styles.quickLinksDropDown} id="quickLinksDropDown">
                    <ul>
                        <li><a href="#">Offshore banking</a></li>
                        <li><a href="#">Online Share Trading</a></li>
                        <li><a href="#">Motor and household insurance</a></li>
                        <li><a href="#">AutoShare/Tax Free Invest</a></li>
                        <li><a href="#">BizFlex Accounts</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

Header.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Header;
