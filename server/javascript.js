accounts = [
    {
        name: "MYMOC",
        accountType: "cheque"
    },
    {
        name: "FLEXI",
        accountType: "cheque"
    },
    {
        name: "SAVER",
        accountType: "savings"
    },
]


const groupedAccounts = accounts.reduce((acc, account) => {
    const { accountType } = account;
    if (!acc[accountType])
    {
        acc[accountType] = []
    }
    acc[accountType].push(account)
    console.log(acc)
    console.log("--------------")
    return acc;
  }, {});

console.log(groupedAccounts)