import {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {


  const [data, setData] = useState({"init data": "nada"});



  async function onButtonClick() {

    navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [0xDDDD] // Required to access service later. 
      
      })
    .then(device => {
      setData({"status":"connecting to GATT :"+device.name})
      device.gatt.connect()})
    .then(server => {
      // Getting Battery Service…
      return server.getPrimaryService(0xDDDD);
    })
    .then(service => {
      // Getting Battery Level Characteristic…
      return service.getCharacteristic(0xFFFF);
    })
    .then(characteristic => {
      // Reading Battery Level…
      return characteristic.readValue();
    })
    .then(value => {
      setData(value);
      console.log(`Battery percentage is ${value.getUint8(0)}`);
    })
    .catch(error => { 
      setData(error)  
      console.error(error); 
    });

  }

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> commit 10:38
        </p>
        <button onClick={onButtonClick}>BLE</button>
        <span>{JSON.stringify(data)}</span>
      </header>
      
    </div>
  );
}

export default App;
