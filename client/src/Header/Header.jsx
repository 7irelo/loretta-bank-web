import PropTypes from "prop-types"
import styles from "./Header.module.css"
import logo from "../assets/logo.jpg"
import dp from "../assets/dp2.png"

function Header(props) {

    const dropMenu = () => {
        if (document.getElementById("quickLinksDropDown").style.display == "none")
            {
                document.getElementById("quickLinksDropDown").style.display = "block"
            }
            else
            {
                document.getElementById("quickLinksDropDown").style.display = "none"
            }
    }

    const navigation = [{id: "home", name: "Home"},
                        {id: "transact", name: "Transact ▿"}, 
                        {id: "schedule", name: "Buy ▿"}, 
                        {id: "location", name: "Apply ▿"}, 
                        {id: "about", name: "Borrow"}];
    

    const navItems = navigation.map(navItem => <li key={navItem.id}><a key={navItem.id} href={navItem.id}>{navItem.name}</a></li>)
    return (
        <header>
            <div className={styles.head}>
                <div className={styles.logo}>
                    <a href="/"><h1><img src={logo}></img> Loretta Bank</h1></a>
                </div><hr/>
                <div>
                <ul className={styles.auth}>
                    <div className={styles.authLinks}>
                        <img src={dp}/>
                        <li><a href="/">{props.service.user.name}</a></li>
                        <li><a href="/">Sign out</a></li> 
                    </div>
                </ul>
                </div>
                <div className={styles.hamburger}><h1>≡</h1></div>
            </div>
            <nav>
                <ul>{navItems}</ul>
                <a><button className={styles.quickLinks} id="quickLinks" onClick={dropMenu}>QuickLinks ▿</button></a>
                <div className={styles.quickLinksDropDown} id="quickLinksDropDown">
                    <ul>
                        <a>Offshore banking</a>
                        <a>Online Share Trading</a>
                        <a>Motor and household insurance</a>
                        <a>AutoShare/Tax Free Invest</a>
                        <a>BizFlex Accounts</a>
                    </ul>
                    
                </div>
            </nav>
        </header>
    );
}

Header.propTypes = {
    service: PropTypes.object
}

export default Header