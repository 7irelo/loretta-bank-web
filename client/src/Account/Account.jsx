import PropTypes from 'prop-types';
import styles from './Account.module.css';

function Account({ account }) {
  if (!account) {
    return <div>Account data is not available</div>;
  }

  const accountNumber = account.account_number ? account.account_number.replaceAll(' ', '-') : 'N/A';
  const userName = account.user ? `${account.user.last_name.toUpperCase()} ${account.user.first_name.charAt(0)}` : 'N/A';

  return (
    <div className={styles.card} id="card">
      <div className={styles.accountDetails}>
        <img src={account.image_url} alt="account picture" className={styles.cardImage} />
        <div className={styles.cardDescription}>
          <p>{account.name}</p>
          <p><small>Current Account {accountNumber}</small></p>
          <small>Name: {userName}</small>
        </div>
      </div>
      <hr />
      <div className={styles.accountBalance}>
        <div>
          <p>Available balance</p>
          <p>R{account.available_balance}</p>
        </div>
        <div>
          <p>Latest balance</p>
          <p>R{account.latest_balance}</p>
        </div>
      </div>
      <hr />
      <div className={styles.actionButtons}>
        <a href=""><button className={styles.learnMore}>PAY ▿</button></a>
        <a href=""><button className={styles.learnMore}>TRANSFER</button></a>
        <a href=""><button className={styles.learnMore}>BUY ▿</button></a>
        <a href=""><button className={styles.learnMore}>MANAGE ▿</button></a>
      </div>
    </div>
  );
}

Account.propTypes = {
  account: PropTypes.object.isRequired
};

export default Account;
