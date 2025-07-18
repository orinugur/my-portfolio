import React from "react";
import StockList from "./components/StockList";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <h1>주식 정보 사이트</h1>
      <StockList />
    </div>
  );
}

export default App;