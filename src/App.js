import logo from './logo.svg';
import './App.css';

function App() {


  function onButtonClick() {


  
    let options = {};
    options.acceptAllDevices = true;

  
    console.log('Requesting Bluetooth Device...');
    console.log('with ' + JSON.stringify(options));
    navigator.bluetooth.requestDevice(options)
    .then(device => {
      console.log('> Name:             ' + device.name);
      console.log('> Id:               ' + device.id);
      console.log('> Connected:        ' + device.gatt.connected);
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
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
    </div>
  );
}

export default App;
