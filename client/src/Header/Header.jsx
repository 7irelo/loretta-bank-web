import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styles from "./Header.module.css";
import logo from "../assets/logo.jpg";
import dp from "../assets/dp2.png";
import lockIcon from "../assets/lockIcon.svg";

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
                    <img src={dp} alt="User Profile" className={styles.dp}/>
                    <li><Link to="/user">{props.user.firstName}</Link></li>
                    <div className={styles.signOutContainer}>
                        <a  className={styles.signOutButton}>
                        <li onClick={handleSignOut}><Link to="/login"><a>Sign Out</a></Link></li><img src={lockIcon} alt="Lock Icon" className={styles.lockIcon} />
                        </a>
                    </div>
                </div>
                <div className={styles.hamburger}><h1>≡</h1></div>
            </div>
            <nav>
                <ul>
                    <li className="home"><Link to="/"><p>Home</p></Link></li>
                    <li className={styles.transact}>
                        <p onClick={() => handleDropdownToggle('transact')}>Transact</p>
                        <div
                            className={`${styles.transactDropDown} ${dropdownVisible.transact ? styles.show : ''}`}
                            ref={dropdownRefs.transact}
                        >
                            <ul>
                                <h3>Pay</h3>
                                <li><a href="">Beneficiary</a></li>
                                <li><a href="#">Once-off payment</a></li>
                                <li><a href="#">Transfer between accounts</a></li>
                                <li><a href="#">Multiple beneficiaries</a></li>
                                <li><a href="#">Scheduled payments</a></li>
                                <li><a href="#">Beneficiary group</a></li>
                                <li><a href="#">Send Instant Money</a></li>
                                <li><a href="#">My Bills</a></li>
                                <li><a href="#">Traffic Fines</a></li>
                                <li><a href="#">Incoming international payment</a></li>
                                <li><a href="#">Outgoing international payment</a></li>
                            </ul>
                            <ul>
                                <h3>Manage</h3>
                                <li><a href="/borrow">Beneficiaries</a></li>
                                <li><a href="#">Cellphone beneficiaries</a></li>
                                <li><a href="#">Instant Money Vouchers</a></li>
                                <li><a href="#">Scheduled prepaid</a></li>
                                <li><a href="#">Overdraft Limit</a></li>
                                <li><a href="#">Debit orders</a></li>
                                <li><a href="#">Limits and card settings</a></li>
                                <li><a href="#">Email your transactions</a></li>
                                <li><a href="#">Add groups</a></li>
                            </ul>
                            <ul>
                                <h3>History</h3>
                                <li><a href="/borrow">Proof of payment</a></li>
                                <li><a href="#">Transactions</a></li>
                                <li><a href="#">Payment notifications</a></li>
                                <li><a href="#">Prepaid history</a></li>
                                <li><a href="#">Inter-account transfers</a></li>
                            </ul>
                            <ul>
                                <h3>Manage</h3>
                                <li><a href="/borrow">Statements</a></li>
                                <li><a href="#">Tax certificates</a></li>
                                <li><a href="#">Account confirmation letter</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className={styles.buy}>
                        <p onClick={() => handleDropdownToggle('buy')}>Buy</p>
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
                    <li className={styles.apply}>
                        <p onClick={() => handleDropdownToggle('apply')}>Apply</p>
                        <div
                            className={`${styles.applyDropDown} ${dropdownVisible.apply ? styles.show : ''}`}
                            ref={dropdownRefs.apply}
                        >
                            <ul>
                                <li><Link>Offshore banking</Link></li>
                                <li><a href="#">Online Share Trading</a></li>
                                <li><a href="#">Motor and household insurance</a></li>
                                <li><a href="#">AutoShare/Tax Free Invest</a></li>
                                <li><a href="#">BizFlex Accounts</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="borrow"><Link to="/borrow"><p>Borrow</p></Link></li>
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
