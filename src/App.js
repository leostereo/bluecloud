import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    log(status);
  });

  let device = null;

  let status = {
    name: "device.name",
    id: "device.id",
    conn: "device.connected",
  };

  const log = (string) => {
    if (typeof string === "object") {
      string = JSON.stringify(string, null, "\t");
    }

    document.getElementById("status").textContent = string;
  };

  async function connect() {
    log("Connecting to Bluetooth Device...");
    await device.gatt.connect();
    device.addEventListener("gattserverdisconnected", onDisconnected);

    log("> Bluetooth Device connected");
  }

  function disconnect() {
    if (!device) {
      return;
    }
    log("Disconnecting from Bluetooth Device...");
    if (device.gatt.connected) {
      device.gatt.disconnect();
    } else {
      log("> Bluetooth Device is already disconnected");
    }
  }

  function onDisconnected(event) {
    // Object event.target is Bluetooth Device getting disconnected.
    log("> Bluetooth Device disconnected");
  }

  function reconnect() {
    if (!device) {
      return;
    }
    if (device.gatt.connected) {
      log("> Bluetooth Device is already connected");
      return;
    }
    try {
      connect();
    } catch (error) {
      log("Argh! " + error);
    }
  }

  async function logdevice() {
    log(device.gatt);
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

      log("Connecting to GATT Server...");
    } catch (error) {
      log("Argh! " + error);
    }
  }
  async function read() {
    try {
      let options = {
        filters: [{ services: [0xdddd] }, { name: "blehr_sensor_1.0" }],
      };

      device = await navigator.bluetooth.requestDevice(options);
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(0xdddd);
      const characteristic = await service.getCharacteristic(0xffff);
      let val = await characteristic.value
      log('> Read:' + val);

    } catch (error) {
      log("Argh! " + error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> commit 1708
        </p>
        <button onClick={request}>REQUEST</button>
        <br></br>
        <button onClick={connect}>Connect</button>
        <br></br>
        <button onClick={reconnect}>Reconnect</button>
        <br></br>
        <button onClick={disconnect}>Disonnect</button>
        <br></br>
        <button onClick={read}>Read</button>
        <br></br>
        <button onClick={logdevice}>device</button>
        <br></br>
        <span id="status"></span>
      </header>
    </div>
  );
}

export default App;
