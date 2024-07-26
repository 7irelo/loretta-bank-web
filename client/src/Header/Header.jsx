import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styles from "./Header.module.css";
import logo from "../assets/logo.jpg";
import dp from "../assets/dp2.png";
import lockIcon from "../assets/lock.svg";

function Header(props) {
    const [dropdownVisible, setDropdownVisible] = useState({
        quickLinks: false,
        transact: false,
        buy: false,
        apply: false
    });
    const dropdownRefs = {
        quickLinks: useRef(null),
        transact: useRef(null),
        buy: useRef(null),
        apply: useRef(null)
    };
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login');
    };

    const handleDropdownToggle = (key) => {
        setDropdownVisible(prevState => {
            const newState = {
                quickLinks: false,
                transact: false,
                buy: false,
                apply: false
            };
            newState[key] = !prevState[key];
            return newState;
        });
    };

    const handleClickOutside = (event) => {
        for (const key in dropdownRefs) {
            if (
                dropdownRefs[key].current &&
                !dropdownRefs[key].current.contains(event.target) &&
                !event.target.closest(`.${styles[key]}`)
            ) {
                setDropdownVisible(prevState => ({
                    ...prevState,
                    [key]: false
                }));
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header>
            <div className={styles.head}>
                <div className={styles.logo}>
                    <Link to="/"><img src={logo} alt="Loretta Bank Logo" /><h1>Loretta Bank</h1></Link>
                </div>
                <div className={styles.auth}>
                    <img src={dp} alt="User Profile" />
                    <li><Link to="/user">{props.user.firstName}</Link></li>
                    <div className={styles.signOutContainer}>
                        <a onClick={handleSignOut} className={styles.signOutButton}>
                            <li>Sign out</li><img src={lockIcon} alt="Lock Icon" className={styles.lockIcon} />
                        </a>
                    </div>
                </div>
                <div className={styles.hamburger}><h1>≡</h1></div>
            </div>
            <nav>
                <ul>
                    <li className="home"><Link to="/">Home</Link></li>
                    <li className="transact">
                        <a href="#" onClick={() => handleDropdownToggle('transact')}>Transact ▿</a>
                        <div
                            className={`${styles.transactDropDown} ${dropdownVisible.transact ? styles.show : ''}`}
                            ref={dropdownRefs.transact}
                        >
                            <ul>
                                <li><a href="#">Offshore banking</a></li>
                                <li><a href="#">Online Share Trading</a></li>
                                <li><a href="#">Motor and household insurance</a></li>
                                <li><a href="#">AutoShare/Tax Free Invest</a></li>
                                <li><a href="#">BizFlex Accounts</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="buy">
                        <a href="#" onClick={() => handleDropdownToggle('buy')}>Buy ▿</a>
                        <div
                            className={`${styles.buyDropDown} ${dropdownVisible.buy ? styles.show : ''}`}
                            ref={dropdownRefs.buy}
                        >
                            <ul>
                                <li><a href="#">Offshore banking</a></li>
                                <li><a href="#">Online Share Trading</a></li>
                                <li><a href="#">Motor and household insurance</a></li>
                                <li><a href="#">AutoShare/Tax Free Invest</a></li>
                                <li><a href="#">BizFlex Accounts</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="apply">
                        <a href="#" onClick={() => handleDropdownToggle('apply')}>Apply ▿</a>
                        <div
                            className={`${styles.applyDropDown} ${dropdownVisible.apply ? styles.show : ''}`}
                            ref={dropdownRefs.apply}
                        >
                            <ul>
                                <li><a href="#">Offshore banking</a></li>
                                <li><a href="#">Online Share Trading</a></li>
                                <li><a href="#">Motor and household insurance</a></li>
                                <li><a href="#">AutoShare/Tax Free Invest</a></li>
                                <li><a href="#">BizFlex Accounts</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="borrow"><Link to="/borrow">Borrow</Link></li>
                </ul>
                <a href="#" className={styles.quickLinks} onClick={() => handleDropdownToggle('quickLinks')}>
                    <span>QuickLinks</span>
                </a>
                <div
                    className={`${styles.quickLinksDropDown} ${dropdownVisible.quickLinks ? styles.show : ''}`}
                    ref={dropdownRefs.quickLinks}
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
