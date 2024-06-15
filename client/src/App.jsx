import React, {useEffect, useState} from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    fetch("http://localhost:5000/accounts").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  return (
    <p>{backendData}</p>
  )
}

export default App