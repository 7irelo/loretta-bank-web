import { useOutletContext } from "react-router-dom";
import Account from "../../Account/Account";
import { Navigate } from "react-router-dom";

export default function HomePage() {
  const { user, accounts } = useOutletContext();

  const groupedAccounts = accounts.reduce((acc, account) => {
    const { accountType } = account;
    if (!acc[accountType]) {
      acc[accountType] = [];
    }
    acc[accountType].push(account);
    return acc;
  }, {});

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container home">
      <div className="text-center my-4">
        <h2 className="display-4">Your Accounts</h2>
        <hr />
      </div>
      {Object.keys(groupedAccounts).map((accountType) => (
        <div key={accountType} className="mb-4">
          <h3 className="bg-secondary text-white rounded p-2 text-center">
            {accountType}
          </h3>
          <div className="row">
            {groupedAccounts[accountType].map((account, index) => (
              <div key={index} className="col-md-4 mb-3">
                <Account account={account} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
