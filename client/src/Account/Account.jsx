import PropTypes from "prop-types"
import styles from "./Account.module.css"

function Service(props) {

        

    return(
            <div className={styles.card} id="card">
                <div className={styles.accountDetails}>
                    <img src={props.account.imageUrl} alt="account picture" className={styles.cardImage}></img>
                    <div className={styles.cardDescription}>
                        <p>{props.account.name}</p>
                        <p><small>Current Account {props.account.accountNumber.replaceAll(' ', '-')}</small></p>
                        <small>Name: {props.account.user.surname.toUpperCase()} {props.account.user.name.charAt(0)}</small>
                    </div>
                </div><hr/>
                <div className={styles.accountBalance}>
                    <div>
                        <p>Available balance</p>
                        <p>R{props.account.availableBalance}</p>
                    </div>
                    <div>
                        <p>Latest balance</p>
                        <p>R{props.account.latestBalance}</p>
                    </div>
                </div><hr/>
                <div className={styles.actionButtons}>
                    <a href=""><button className={styles.learnMore}>PAY ▿</button></a>
                    <a href=""><button className={styles.learnMore}>TRANSFER</button></a>
                    <a href=""><button className={styles.learnMore}>BUY ▿</button></a>
                    <a href=""><button className={styles.learnMore}>MANAGE ▿</button></a>
                </div>
                
            </div>
    );
}

Service.propTypes = {
    account: PropTypes.object
}
export default Service