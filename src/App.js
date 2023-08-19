import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    log(status);
  });

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

  async function onButtonClick() {
    try {
      let options = {
        filters: [{ services: [0xdddd] }, { name: "blehr_sensor_1.0" }],
      };

      const device = await navigator.bluetooth.requestDevice(options);

      status = {
        name: device.name,
        id: device.id,
        conn: device.connected,
      };

      log(status);
    } catch (error) {
      log("Argh! " + error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> commit 1321
        </p>
        <button onClick={onButtonClick}>BLE</button>
        <span id="status"></span>
      </header>
    </div>
  );
}

export default App;
