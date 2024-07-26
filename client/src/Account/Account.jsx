import PropTypes from 'prop-types';
import styles from './Account.module.css';

function Account({ account }) {
  if (!account) {
    return <div>Account data is not available</div>;
  }
  console.log(account)
  const accountNumber = account.accountNumber ? account.accountNumber.replaceAll(' ', '-') : 'N/A';
  const userName = account.user ? `${account.user.lastName.toUpperCase()} ${account.user.firstName.charAt(0)}` : 'N/A';

  return (
    <div className={styles.card} id="card">
      <div className={styles.accountDetails}>
        <img src={`./src/assets/${account.accountType.toLowerCase()}.png`} alt="account picture" className={styles.cardImage} />
        <div className={styles.cardDescription}>
          <p>{account.name}</p>
          <p><small>Current Account {`${accountNumber.slice(0, 2)}-${accountNumber.slice(2, 4)}-${accountNumber.slice(4, 7)}-${accountNumber.slice(7, 11)}`}</small></p>
          <small>Name: {userName}</small>
        </div>
      </div>
      <hr />
      <div className={styles.accountBalance}>
        <div>
          <p>Available balance</p>
          <p>R{account.availableBalance}</p>
        </div>
        <div>
          <p>Latest balance</p>
          <p>R{account.latestBalance}</p>
        </div>
      </div>
      <hr />
      <div className={styles.actionButtons}>
        <a href=""><button className={styles.accountBtn}>PAY ▿</button></a>
        <a href=""><button className={styles.accountBtn}>TRANSFER</button></a>
        <a href=""><button className={styles.accountBtn}>BUY ▿</button></a>
        <a href=""><button className={styles.accountBtn}>MANAGE ▿</button></a>
      </div>
    </div>
  );
}

Account.propTypes = {
  account: PropTypes.object.isRequired
};

export default Account;
