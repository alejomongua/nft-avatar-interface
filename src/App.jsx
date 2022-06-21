import MainLayout from './layouts/main/MainLayout'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Web3 from "web3/dist/web3.min";

const App = () => {
  /*
  useEffect(() => {
    console.count('Se volvera a ejecutar');
    if (!window.ethereum) {
      alert('No se encontró proveedor de Web3, por favor instale metamask');
      return
    }
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      if (accounts.length === 0) {
        alert('Conecte su cuenta por favor');
        return
      }
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then(console.log);
    })
  }, [])
  // Este bloque se elimina porque lo vamos a hacer de otra manera, con web3-react
  */

  return (<MainLayout>
    <Routes>
      <Route path="/" exact element={<Home />} />
    </Routes>
  </MainLayout>)
}

export default App
