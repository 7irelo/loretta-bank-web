import Header from "./Header/Header.jsx"
import Account from "./Account/Account.jsx"
import Footer from "./Footer/Footer.jsx"

function App() {

  const accounts = [
    {
      id: 5432,
      user: {
        name: "Eric",
        surname: "Ncube",
        initials: "Ncube E",
      },
      name: "MYMOACC",
      accountNumber: "10 12 843 624 5",
      availableBalance: 7858.19,
      latestBalance: 7960.69,
      imageUrl: "src/assets/cheque.png"
    },
    {
      id: 3302,
      user: {
        name: "Eric",
        surname: "Ncube",
      },
      name: "PURESAVE",
      accountNumber: "10 22 111 183 0",
      availableBalance: 150450.95,
      latestBalance: 150150.95,
      imageUrl: "src/assets/savings.png"
    },
  ]

  return (
    <div>
        <Header service={accounts[0]}/>
        <div className="home">
          <h2>Transacting</h2>
          <Account account={accounts[0]}/>
          <h2>Saving and Investing</h2>
          <Account account={accounts[1]}/>
          <Footer/>
        </div>
        
    </div>
    
  )
}

export default App