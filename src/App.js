import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    log(status);
  });

  let  device = null

  let status = {
    name: "device.name",
    id: "device.id",
    conn: "device.connected",
  };
  const log = (string) => {
    if (typeof string === "object") {
      string = JSON.stringify(string, null, "\t")
    }

    document.getElementById("status").textContent = string;
  };

  async function connect() {
    log('Connecting to Bluetooth Device...');
    await device.gatt.connect();
    log('> Bluetooth Device connected');
  }
  
  function disconnect() {
    if (!device) {
      return;
    }
    log('Disconnecting from Bluetooth Device...');
    if (device.gatt.connected) {
      device.gatt.disconnect();
    } else {
      log('> Bluetooth Device is already disconnected');
    }
  }

  async function request() {
    try {
      let options = {
        filters: [{ services: [0xdddd] }, { name: "blehr_sensor_1.0" }],
      };

      device = await navigator.bluetooth.requestDevice(options);

      status = {
        name: device.name,
        id: device.id,
        conn: device.connected,
      };


      log('Connecting to GATT Server...');

    } catch (error) {
      log("Argh! " + error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> commit 1530
        </p>
        <button onClick={request}>REQUEST</button>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disonnect</button>
        <span id="status"></span>
      </header>
    </div>
  );
}

export default App;
