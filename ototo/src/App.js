import React from "react";
import Chart from "./components/Chart";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <h1>비트코인 실시간 차트</h1>
      <Chart />
    </div>
  );
}

export default App;