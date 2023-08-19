import {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
  
  
  async function onButtonClick() {
    
    document.getElementById("status").textContent = `choose some device`
    navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [0xDDDD] // Required to access service later. 
      
      })
    .then(device => {
      device.gatt.connect()
      
      document.getElementById("status").textContent = ` connected to ${device.name}`
    })
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
      document.getElementById("status").textContent = `Characteristic ${value.getUint8(0)}`
      console.log(`Battery percentage is ${value.getUint8(0)}`);
    })
    .catch(error => { 
      document.getElementById("status").textContent = `Error ${error}`
      console.error(error); 
    });

  }

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> commit 11:07
        </p>
        <button onClick={onButtonClick}>BLE</button>
        <span id="status">nothing</span>
      </header>
      
    </div>
  );
}

export default App;
