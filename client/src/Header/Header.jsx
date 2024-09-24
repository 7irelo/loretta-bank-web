import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCog,
  faLock,
  faMoneyBills,
  faNewspaper,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import logo from "../assets/logo.png";

function Header(props) {
  const [dropdownVisible, setDropdownVisible] = useState({
    quickLinks: false,
    transact: false,
    buy: false,
    apply: false,
  });
  const dropdownRefs = {
    quickLinks: useRef(null),
    transact: useRef(null),
    buy: useRef(null),
    apply: useRef(null),
  };
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  const handleDropdownToggle = (key) => {
    setDropdownVisible((prevState) => {
      const newState = {
        quickLinks: false,
        transact: false,
        buy: false,
        apply: false,
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
        setDropdownVisible((prevState) => ({
          ...prevState,
          [key]: false,
        }));
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.head}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="Loretta Bank Logo" />
            <h1>Loretta Bank</h1>
          </Link>
        </div>
        <div className={styles.auth}>
          <Link to={"/user"}>
            <li className={styles.user}>
              <FontAwesomeIcon icon={faUserCircle} className={styles.dp} />
              <a className={styles.firstName}>{props.user.firstName}</a>
            </li>
          </Link>
          <Link to={"/login"}>
            <li className={styles.signOutButton} onClick={handleSignOut}>
              <a>
                Sign Out{" "}
                <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
              </a>
            </li>
          </Link>
        </div>
        <div className={styles.hamburger}>
          <h1>≡</h1>
        </div>
      </div>
      <nav className={styles.navbar}>
        <ul>
          <li className={styles.home}>
            <Link to={"/"}>
              <p>Home</p>
            </Link>
          </li>
          <li className={styles.transact}>
            <p onClick={() => handleDropdownToggle("transact")}>Transact</p>
            <div
              className={`${styles.transactDropDown} ${
                dropdownVisible.transact ? styles.show : ""
              }`}
              ref={dropdownRefs.transact}
            >
              <ul>
                <h3>
                  Pay <FontAwesomeIcon icon={faMoneyBills} />
                </h3>
                <li>
                  <Link to={"/user"}>Beneficiary</Link>
                </li>
                <li>
                  <Link to={"/user"}>Once-off payment</Link>
                </li>
                <li>
                  <Link to={"/user"}>Transfer between accounts</Link>
                </li>
                <li>
                  <Link to={"/user"}>Multiple beneficiaries</Link>
                </li>
                <li>
                  <Link to={"/user"}>Scheduled payments</Link>
                </li>
                <li>
                  <Link to={"/user"}>Beneficiary group</Link>
                </li>
                <li>
                  <Link to={"/user"}>Send Instant Money</Link>
                </li>
                <li>
                  <Link to={"/user"}>My Bills</Link>
                </li>
                <li>
                  <Link to={"/user"}>Traffic Fines</Link>
                </li>
                <li>
                  <Link to={"/user"}>Incoming international payment</Link>
                </li>
                <li>
                  <Link to={"/user"}>Outgoing international payment</Link>
                </li>
              </ul>
              <ul>
                <h3>
                  Manage <FontAwesomeIcon icon={faCog} />
                </h3>
                <li>
                  <Link href="/borrow">Beneficiaries</Link>
                </li>
                <li>
                  <Link href="#">Cellphone beneficiaries</Link>
                </li>
                <li>
                  <Link href="#">Instant Money Vouchers</Link>
                </li>
                <li>
                  <Link href="#">Scheduled prepaid</Link>
                </li>
                <li>
                  <Link href="#">Overdraft Limit</Link>
                </li>
                <li>
                  <Link href="#">Debit orders</Link>
                </li>
                <li>
                  <Link href="#">Limits and card settings</Link>
                </li>
                <li>
                  <Link href="#">Email your transactions</Link>
                </li>
                <li>
                  <Link href="#">Add groups</Link>
                </li>
              </ul>
              <ul>
                <h3>
                  History <FontAwesomeIcon icon={faClock} />
                </h3>
                <li>
                  <Link href="/borrow">Proof of payment</Link>
                </li>
                <li>
                  <Link href="#">Transactions</Link>
                </li>
                <li>
                  <Link href="#">Payment notifications</Link>
                </li>
                <li>
                  <Link href="#">Prepaid history</Link>
                </li>
                <li>
                  <Link href="#">Inter-account transfers</Link>
                </li>
              </ul>
              <ul>
                <h3>
                  Documents <FontAwesomeIcon icon={faNewspaper} />
                </h3>
                <li>
                  <Link href="/borrow">Statements</Link>
                </li>
                <li>
                  <Link href="#">Tax certificates</Link>
                </li>
                <li>
                  <Link href="#">Account confirmation letter</Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={styles.buy}>
            <p onClick={() => handleDropdownToggle("buy")}>Buy</p>
            <div
              className={`${styles.buyDropDown} ${
                dropdownVisible.buy ? styles.show : ""
              }`}
              ref={dropdownRefs.buy}
            >
              <ul>
                <li>
                  <Link to={"/user"}><h3>Airtime</h3></Link>
                </li>
                <li>
                  <Link to={"/user"}><h3>Data</h3></Link>
                </li>
                <li>
                  <Link to={"/user"}><h3>SMS</h3></Link>
                </li>
                <li>
                  <Link to={"/user"}><h3>Electricity</h3></Link>
                </li>
                <li>
                  <Link to={"/user"}><h3>Lotto</h3></Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={styles.apply}>
            <p onClick={() => handleDropdownToggle("apply")}>Apply</p>
            <div
              className={`${styles.applyDropDown} ${
                dropdownVisible.apply ? styles.show : ""
              }`}
              ref={dropdownRefs.apply}
            >
              <ul>
                <li className={styles.hoverEffect}>
                  <Link to={"/user"}>
                    <div>
                      <h1>Insure</h1>
                      <small>Cover just you or extended family</small>
                    </div>
                  </Link>
                </li>

                <li className={styles.hoverEffect}>
                  <Link to={"/user"}>
                    <div>
                      <h1>Save & Invest</h1>
                      <small>
                        Make savings part of your language with a savings and
                        investment account
                      </small>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="borrow">
            <Link to="/borrow">
              <p>Borrow</p>
            </Link>
          </li>
        </ul>
        <a
          href="#"
          className={styles.quickLinks}
          onClick={() => handleDropdownToggle("quickLinks")}
        >
          <span>QuickLinks</span>
        </a>
        <div
          className={`${styles.quickLinksDropDown} ${
            dropdownVisible.quickLinks ? styles.show : ""
          }`}
          ref={dropdownRefs.quickLinks}
        >
          <ul>
            <li>
              <a href="#">Offshore banking</a>
            </li>
            <li>
              <a href="#">Online Share Trading</a>
            </li>
            <li>
              <a href="#">Motor and household insurance</a>
            </li>
            <li>
              <a href="#">AutoShare/Tax Free Invest</a>
            </li>
            <li>
              <a href="#">BizFlex Accounts</a>
            </li>
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
