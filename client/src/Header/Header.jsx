import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";
import logo from "../assets/logo.jpg";
import dp from "../assets/dp2.png";
import lockIcon from "../assets/lock.svg";

function Header(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('auth-token');
        navigate('/login');
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

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setIsDropdownOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('.quickLinks')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header>
            <div className={styles.head}>
                <div className={styles.logo}>
                    <a href="/"><img src={logo} alt="Loretta Bank Logo" /><h1>Loretta Bank</h1></a>
                </div>
                <div className={styles.auth}>
                    <img src={dp} alt="User Profile" />
                    <li><Link to="/user">{props.user.first_name}</Link></li>
                    <div className={styles.signOutContainer}>
                        <button onClick={handleSignOut} className={styles.signOutButton}>Sign out</button>
                        <img src={lockIcon} alt="Lock Icon" className={styles.lockIcon} />
                    </div>
                </div>
                <div className={styles.hamburger}><h1>≡</h1></div>
            </div>
            <nav>
                <ul>{navItems}</ul>
                <button className={styles.quickLinks} onClick={toggleDropdown}>QuickLinks</button>
                <div
                    className={`${styles.quickLinksDropDown} ${isDropdownOpen ? styles.show : ''}`}
                    ref={dropdownRef}
                >
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
