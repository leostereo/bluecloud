import {useState} from 'react';
import logo from './logo.svg';
import './App.css';

class GenericDevice {

  constructor() {
    this.device = null;
    this.onDisconnected = this.onDisconnected.bind(this);
  }
  
  async request() {

    let options = {
      "filters": [{
        "name": "blehr_sensor_1.0"
      }],
      "optionalServices": [0xDDDD]
    };
    this.device = await navigator.bluetooth.requestDevice(options);
    if (!this.device) {
      throw "No device selected";
    }
    this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
  }
  
  async connect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    await this.device.gatt.connect();
  }
  
  async readManufacturername() {
    const service = await this.device.gatt.getPrimaryService(0xDDDD);
    const characteristic = await service.getCharacteristic(0xFFFF);
    await characteristic.readValue();
    alert(characteristic)
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.disconnect();
  }

  onDisconnected() {
    console.log('Device is disconnected.');
  }
}
function App() {

  const [data, setData] = useState({});

  
  var genericDevice = new GenericDevice();
  
 


  async function onButtonClick() {

    try {
      await genericDevice.request();
      await genericDevice.connect();
      /* Do something with genericDevice... */
      await genericDevice.readManufacturername()

    } catch(error) {
      console.log(error);
    }

  }

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reloadddds
        </p>
        <button onClick={onButtonClick}>BLE</button>
      </header>
      <body>
        <span>{JSON.stringify(data)}</span>
      </body>
    </div>
  );
}

export default App;
